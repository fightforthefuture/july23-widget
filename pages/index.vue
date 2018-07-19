<style lang="scss">
.index-page {
  .body p {
    margin: 0;
  }

  .letter {
    position: relative;
    margin-bottom: 0.8rem;

    textarea {
      min-width: 100%;
      max-width: 100%;
      min-height: 5rem;
      height: 5rem;
      padding-right: 12rem;
    }

    a.clear {
      position: absolute;
      right: 2rem;
      bottom: 1.6rem;
      background-color: #ebe7f4;
      color: #89819d;
      font-size: 1.2rem;
      margin: 0;
      letter-spacing: 0;
      display: inline-block;
      padding: .7rem 1.4rem;
      width: auto;
      border: none;

      &:hover {
        background-color: darken(#ebe7f4, 5%);
      }
    }
  }

  .disclaimer-wrapper {
    min-height: 3.2rem;
    margin: 0.5rem 1rem;

    p {
      animation: fade-in .3s;
    }
  }

  // .counter {
  //   width: 50.8rem;
  //   margin: auto;
  //   text-align: left;
  // }
}
</style>

<template>
  <div class="index-page page">
    <NavHeader />
    <h1 class="headline">
      <small>{{ $lt('top_headline') }}</small>
<!--       <countTo :startVal="100000000" :endVal="amount" :duration="3000" prefix="$" :autoplay="false" class="counter" ref="counter"></countTo> -->
      <div class="counter pulse">${{ amount | formatNumber }}</div>
      {{ $lt('bottom_headline') }}
    </h1>
    <div class="body" v-html="$lt('body_html')"></div>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <form method="post" @submit.prevent="submitForm()">
      <div class="row">
        <input type="text" v-model="name" :placeholder="$lt('name_placeholder')" required data-autofocus>
        <input type="email" v-model="email" :placeholder="$lt('email_placeholder')" required>
      </div>
      <div class="row">
        <input type="address" v-model="address" :placeholder="$lt('address_placeholder')" class="address" required>
        <input type="tel" v-model="zipCode" :placeholder="$lt('zip_placeholder')" class="zip" required>
        <input type="tel" v-model="phone" :placeholder="$lt('phone_placeholder')" class="phone">
      </div>
      <div class="letter">
        <textarea v-model="comments" ref="comments"></textarea>
        <a href="#" class="clear btn" @click="clearComments()">{{ $lt('clear_button') }}</a>
      </div>
      <button class="btn btn-block btn-large btn-cta pulse" :disabled="isSending">
        <span v-if="isSending">{{ $lt('loading_button') }}</span>
        <span v-else>{{ $lt('cta_button') }}</span>
      </button>
      <div class="disclaimer-wrapper">
        <no-ssr>
          <div class="disclaimer" v-html="disclaimer"></div>
        </no-ssr>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatNumber, pingCounter, sendToMothership } from '~/assets/js/helpers'
import axios from 'axios'
// import countTo from 'vue-count-to'
import NavHeader from '~/components/NavHeader'

// https://actionnetwork.org/petitions/july-23rd
const petitionId = '1c27cd93-46e6-4d1b-b706-9e3de6ed4ecb'

export default {
  components: {
    // countTo,
    NavHeader
  },

  data() {
    return {
      isSending: false,
      errorMessage: null
    }
  },

  computed: {
    ...mapState([ 'org' ]),

    amount() {
      return parseInt(this.$lt('amount'))
    },

    actionComment() {
      return `${this.comments}\n\n(The sender of this message generated it using tools available at BattleForTheNet.com on ${new Date()}.)`
    },

    name: {
      get() {
        return this.$store.state.name
      },

      set(value) {
        this.$store.commit('setName', value)
      }
    },

    email: {
      get() {
        return this.$store.state.email
      },

      set(value) {
        this.$store.commit('setEmail', value)
      }
    },

    address: {
      get() {
        return this.$store.state.streetAddress
      },

      set(value) {
        this.$store.commit('setStreetAddress', value)
      }
    },

    zipCode: {
      get() {
        return this.$store.state.zipCode
      },

      set(value) {
        this.$store.commit('setZipCode', value)
      }
    },

    phone: {
      get() {
        return this.$store.state.phone
      },

      set(value) {
        this.$store.commit('setPhone', value)
      }
    },

    comments: {
      get() {
        return this.$store.state.comments
      },

      set(value) {
        this.$store.commit('setComments', value)
      }
    },

    disclaimer() {
      return this.$lt('disclaimer_html', { orgLink: this.org.link, orgName: this.org.name })
    }
  },

  created() {
    if (!this.comments) {
      this.comments = this.$lt('default_comment')
    }
  },

  // mounted() {
  //   setTimeout(() => {
  //     this.$refs.counter.start()
  //   }, 600)
  // },

  methods: {
    $lt(key, vars={}) {
      return this.$t(`pages.index.${key}`, vars)
    },

    clearComments() {
      this.comments = null
      this.$refs.comments.focus()
    },

    async submitForm() {
      this.isSending = true

      try {
        const response = await sendToMothership({
          subject: "Protect Net Neutrality!",
          member: {
            first_name: this.name,
            email: this.email,
            postcode: this.zipCode,
            phone_number: this.phone,
            street_address: this.address,
            country: 'US'
          },
          hp_enabled: 'true',
          guard: '',
          contact_congress: 1,
          fcc_ecfs_docket: "17-108",
          org: this.org.id,
          an_tags: "[\"net-neutrality\"]",
          an_petition_id: petitionId,
          action_comment: this.comments
        })

        this.$trackEvent('email_form', 'submit')
        pingCounter('email')

        const rep = await this.fetchRep()

        if (rep) {
          this.$store.commit('setRep', rep)
          this.$router.push(`/rep?id=${rep.bioguide_id}`)
        }
        else {
          this.$router.push('/call')
        }
      }
      catch (err) {
        self.isSending = false
        self.errorMessage = "That didn't work for some reason :("
      }
    },

    async fetchRep() {
      try {
        const address = `${this.address} ${this.zipCode}`
        const { data } = await axios.get(`https://07myr1bkfa.execute-api.us-east-1.amazonaws.com/v1/reps?address=${encodeURIComponent(address)}`)

        if (!data.rep || !data.rep.bioguide_id) {
          throw new Error("Missing rep data!")
        }

        const response = await axios.get(`https://data.battleforthenet.com/scoreboard/${data.rep.bioguide_id}.json`)
        return response.data
      }
      catch (error) {
        return {}
      }
    }
  }
}
</script>
