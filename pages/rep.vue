<style lang="scss">
.rep-page {
  img.check {
    width: 6rem;
  }

  h2 {
    margin: 1rem 0 2rem;
  }

  .supports {
    h2 strong {
      color: #2fffa0;
    }
  }

  .against {
    h2 strong {
      color: #ff2525;
    }
  }

  .scoreboard-photo {
    width: 16.2rem;
    height: 19.7rem;

    h5 {
      font-size: 1.8rem;
    }

    &.long-name h5 {
      font-size: 1.3rem;
    }
  }

  .buttons {
    .btn {
      margin: 1rem;
    }
  }
}
</style>

<template>
  <div class="rep-page page">
    <NavHeader />
    <img src="~/assets/images/check.svg" alt="" class="check">
    <div v-if="rep.supports_cra" class="supports">
      <h2 v-html="$lt('supports_headline_html')"></h2>
      <div class="flex-center">
        <ScoreboardPhoto :rep="rep" />
        <div class="buttons">
          <a href="https://act.demandprogress.org/sign/sign-up-text-team-internet/" target="_blank" class="btn" @click="$trackClick('volunteer_button', 'supports')">{{ $lt('volunteer_button') }}</a>
          <a href="https://www.battleforthenet.com/map/" target="_blank" class="btn" @click="$trackClick('events_button', 'supports')">{{ $lt('events_button') }}</a>
          <a :href="org.donateLink" target="_blank" class="btn" @click="$trackClick('donate_button')" v-if="donationsEnabled">{{ $lt('donate_button', 'supports') }}</a>
        </div>
      </div>
    </div>
    <div v-else class="against">
      <h2 v-html="$lt('against_headline_html')"></h2>
      <div class="flex-center">
        <ScoreboardPhoto :rep="rep" />
        <div class="buttons">
          <nuxt-link to="/call" class="btn btn-cta" @click="$trackClick('call_button')">{{ $lt('call_button', 'against') }}</nuxt-link>
          <a href="https://www.battleforthenet.com/map/" target="_blank" class="btn" @click="$trackClick('events_button', 'against')">{{ $lt('events_button') }}</a>
          <a :href="org.donateLink" target="_blank" class="btn" @click="$trackClick('donate_button', 'against')" v-if="donationsEnabled">{{ $lt('donate_button') }}</a>
        </div>
      </div>
    </div>
    <ShareFooter />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ScoreboardPhoto from '~/components/ScoreboardPhoto'
import ShareFooter from '~/components/ShareFooter'
import NavHeader from '~/components/NavHeader'

async function fetchRep(bioguideId) {
  try {
    const { data } = await axios.get(`https://data.battleforthenet.com/scoreboard/${bioguideId}.json`)
    return data
  }
  catch (error) {
    return {}
  }
}

export default {
  components: {
    NavHeader,
    ScoreboardPhoto,
    ShareFooter
  },

  async created() {
    if ((!this.rep || !this.rep.bioguide_id) && this.$route.query.id) {
      this.rep = await fetchRep(this.$route.query.id)
    }
  },

  computed: {
    ...mapState([ 'org', 'donationsEnabled' ]),

    rep: {
      get() {
        return this.$store.state.rep
      },

      set(value) {
        this.$store.commit('setRep', value)
      }
    }
  },

  methods: {
    $lt(key, vars={}) {
      return this.$t(`pages.rep.${key}`, vars)
    }
  }
}
</script>
