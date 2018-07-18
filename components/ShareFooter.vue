<style lang="scss">
.share-footer {
  background-color: #2a1f4e;
  padding: 1.5rem;
  margin: 3rem -3rem -3rem;
  border-radius: 0 0 $border-radius $border-radius;

  label {
    text-transform: uppercase;
    color: #846fc8;
    font-family: $title-font;
    font-weight: 700;
    margin-right: 0.5rem;
  }

  img {
    width: 3.5rem;
    margin-left: 0.5rem;
  }
}
</style>

<template>
  <footer class="share-footer">
    <div class="flex-center">
      <label>Share on:</label>
      <a href="#" @click.prevent="shareOnFacebook()"><img src="~/assets/images/facebook-icon.png" alt="Facebook"></a>
      <a href="#" @click.prevent="shareOnTwitter()"><img src="~/assets/images/twitter-icon.png" alt="Twitter"></a>
    </div>
  </footer>
</template>

<script>
import { openPopup } from '~/assets/js/helpers'

export default {
  methods: {
    shareOnFacebook() {
      this.$trackClick('facebook_button')
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.$t('social.share_url'))}`
      openPopup(url, 'facebook')
    },

    shareOnTwitter() {
      this.$trackClick('twitter_button')
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.$t('social.tweet_text').trim())}`
      openPopup(url, 'twitter')
    }
  }
}
</script>
