<template>
  <div class="call-page page">
    <NavHeader />
    <h2>{{ $lt('headline') }}</h2>
    <div class="body" v-html="$lt('body_html')"></div>
    <form @submit.prevent="submitForm()">
      <div class="flex-row">
        <input type="tel" v-model="phone" :placeholder="$lt('phone_placeholder')" required class="longer">
        <input type="tel" v-model="zipCode" :placeholder="$lt('zip_placeholder')" required>
      </div>
      <div class="flex-row">
        <button class="btn btn-cta" :disabled="isSending">
          <span v-if="isSending">{{ $lt('loading_button') }}</span>
          <span v-else>{{ $lt('cta_button') }}</span>
        </button>
      </div>
      <div class="disclaimer" v-html="$lt('disclaimer_html')"></div>
    </form>
    <ShareFooter />
  </div>
</template>

<script>
import { pingCounter, postFormData } from '~/assets/js/helpers'
import ShareFooter from '~/components/ShareFooter'
import NavHeader from '~/components/NavHeader'

const campaignId = 'RED_ALERT_widget_House_2Sens'

export default {
  components: {
    NavHeader,
    ShareFooter
  },

  data() {
    return {
      isSending: false
    }
  },

  computed: {
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
    }
  },

  methods: {
    $lt(key, vars={}) {
      return this.$t(`pages.call.${key}`, vars)
    },

    async submitForm() {
      this.isSending = true

      try {
        const { data } = await postFormData('https://call-congress.fightforthefuture.org/create', {
          campaignId: campaignId,
          userPhone: this.phone,
          userLocation: this.zipCode
        })

        this.$trackEvent('call_form', 'submit')
        pingCounter('call')

        this.$router.push('/script')
      }
      catch (err) {
        this.isSending = false
        this.errorMessage = "That didn't work for some reason :("
      }
    },
  }
}
</script>
