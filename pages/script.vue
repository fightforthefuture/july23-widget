<style lang="scss">
.script-page {
  h2 {
    img {
      width: 4.5rem;
      height: 4.5rem;
      background: #32255d;
      padding: 1rem;
      border-radius: 100%;
      margin-right: 1.5rem;
    }
  }
  blockquote {
    color: #bdaeef;
    font-size: 2rem;
    margin: 2rem 0 4rem;
    display: block;
  }
}
</style>

<template>
  <div class="script-page page">
    <NavHeader/>
    <h2 class="flex-center">
      <img src="~/assets/images/phone.svg" alt="">
      {{ $lt('headline') }}
    </h2>
    <div class="body" v-html="$lt('body_html')"></div>
    <blockquote>{{ $lt('call_script') }}</blockquote>
    <ShareFooter/>
  </div>
</template>

<script>
import ShareFooter from '~/components/ShareFooter'
import NavHeader from '~/components/NavHeader'

export default {
  components: {
    NavHeader,
    ShareFooter
  },

  methods: {
    $lt(key, vars={}) {
      return this.$t(`pages.script.${key}`, vars)
    }
  }
}
</script>
