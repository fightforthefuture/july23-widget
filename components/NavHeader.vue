<style lang="scss">
.nav-header {
  background-color: #2a1f4f;
  margin: -3rem -3rem 2rem -3rem;
  border-radius: $border-radius $border-radius 0 0;
  height: 5rem;
  position: relative;

  button {
    background: #32265d;
    color: #fff;
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &:hover {
      cursor: pointer;
      background-color: lighten(#32265d, 5%);
      transition: background-color .5s;
    }

    &.back {
      border-radius: $border-radius 0 0 0;
      left: 0;

      img {
        width: 2.2rem;
      }
    }

    &.close {
      right: 0;
      border-radius: 0 $border-radius 0 0;
      font-size: 3rem;
      line-height: 1;
    }
  }
}
</style>

<template>
  <header class="nav-header">
    <button v-if="$route.name != 'index'" class="back" @click.prevent="goBack()"><img src="~/assets/images/back-arrow.svg" alt="Back"></button>
    <button class="close" @click.prevent="close()">&times;</button>
  </header>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$trackClick('back_button')
      this.$router.back()
    },

    close() {
      this.$trackClick('close_button')

      document.querySelector('body').classList.add('closing-time')

      if (window.parent) {
        setTimeout(() => {
          window.parent.postMessage({
            action: 'closeWindow',
            BFTN_WIDGET: true
          }, '*')
        }, 300)
      }
    }
  }
}
</script>
