<style lang="scss">
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1 }
  to { opacity: 0 }
}

@keyframes pulse {
  0% { transform: scale(1); }
  30% { transform: scale(1); }
  40% { transform: scale(1.08); }
  50% { transform: scale(1); }
  60% { transform: scale(1); }
  70% { transform: scale(1.05); }
  80% { transform: scale(1); }
  100% { transform: scale(1); }
}

@keyframes slide-down {
  from {
    transform: translate3d(0, -500%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slide-up {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -500%, 0);
  }
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

html {
  font-size: 62.5%;

  @include mobile {
    font-size: 52.5%;
  }
}


#app {
  height: 100vh;
}

*, *:before, *:after {
  box-sizing: border-box;
}

.hidden {
  display: none;
}

.invisible {
  visibility: hidden;
}

.fade-out {
  animation: fade-out .2s ease-out;
  animation-fill-mode: forwards;
}

.clearfix:after {
  content:"";
  display:block;
  clear:both;
}

.text-center {
  text-align: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.error {
  color: red;
}

h1, h2, h3, h4, h5, .btn {
  font-family: $title-font;
  font-weight: 700;

  > p {
    margin: 0;
  }
}

body {
  font-family: $body-font;
  font-size: 1.7rem;
  font-weight: 300;
  line-height: 1.5;
  color: #fff;
  // background-color: rgba(#0d0628, 0.5);
  text-align: center;
}

.container {
  width: 600px;
  margin: auto;
  background: #241a46;
  border-radius: $border-radius;
  padding: 3rem;
  position: relative;
  box-shadow: 0 .3rem 2rem rgba(0, 0, 0, .6);
  animation: slide-down .6s ease-out;
  animation-delay: .5s;
  transform: translate3d(0, -500%, 0);
  animation-fill-mode: forwards;

  @media only screen and (max-width: 600px) {
    width: 96vw;
  }
}

h1 {
  // text-transform: uppercase;
  font-size: 5rem;
  line-height: 1.2;
  margin: 0 0 1rem;
}

h2 {
  font-size: 3rem;
  line-height: 1.2;
  margin: 0;
}

h3 {
  font-size: 2.8rem;
  line-height: 1;
  margin: 1rem 0;
}

p {
  margin: 1.5rem 0;
}

a {
  color: inherit;
  text-decoration: underline;
  font-weight: bolder;
}

input, textarea {
  font-family: $body-font;
  border: none;
  font-size: 1.7rem;
  font-weight: 300;
  padding: 1rem 1.5rem;
  border-radius: $border-radius;
  width: 100%;
  color: #0f0728;
}

textarea {
  font-size: 1.4rem;
}

.btn {
  text-align: center;
  padding: 1.4rem 2.8rem;
  display: block;
  width: 100%;
  text-decoration: none;
  text-transform: uppercase;
  background-color: transparent;
  color: #e4dcff;
  border: 1px solid #7956f0;
  border-radius: $border-radius * 1.5;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.33;
  letter-spacing: 0.2rem;
  transition: all .2s ease-in;

  &:hover {
    color: #fff;
    cursor: pointer;
    border-color: lighten(#7956f0, 12%);
  }
}

$light-blue: rgba(58,255,227,1);
$blue: rgba(62,147,218,1);
$purple: rgba(148,53,224,1);
$light-orange: rgba(241,99,90,1);
$orange: rgba(254,91,47,1);
$step: 6%;

@keyframes cta-hover {
  @for $i from 0 through 10 {
    #{$i*10%} {
      background: linear-gradient(#{106 - ($i*6)}deg, #{$light-blue} 0%, #{$blue} #{$i*$step}, #{$purple} #{$i*$step + 29%}, #{$light-orange} #{$i*$step + 79%}, #{$orange} 100%);
    }
  }
}

.btn-cta {
  border: none;
  color: #fff;
  font-size: 2.4rem;
  padding: 1.4rem 2.8rem;
  background: rgb(62,147,218);
  background: linear-gradient(106deg, rgba(62,147,218,1) 0%, rgba(148,53,224,1) 29%, rgba(241,99,90,1) 79%, rgba(254,91,47,1) 100%);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    animation: cta-hover .2s;
    animation-fill-mode: forwards;
    animation-delay: .1s;
  }
}

// .page {
//   animation: fade-in .2s;
// }

.headline {
  text-transform: uppercase;
  line-height: 1.1;
  font-size: 4.25rem;

  small {
    display: block;
    font-size: 2.5rem;
  }

  .counter {
    display: block;
    font-size: 8rem;
  }

  > p {
    margin: 0;
  }

  @include mobile {
    font-size: 3rem;

    small {
      font-size: 2.2rem;
    }

    .counter {
      font-size: 6rem;
    }
  }
}

hr {
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin: 3.5rem 0;

  @include mobile {
    margin: 2.5rem 0;
  }
}

form {
  margin: 3rem 0;

  .flex-row {
    display: flex;

    > * {
      margin: 0.5rem;
      flex: 1;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.longer {
        flex: 2;
      }
    }
  }

  .row {
    @extend .clearfix;
    margin-bottom: 0.75rem;

    input, .btn {
      float: left;
      width: 49.25%;
    }

    input {
      margin-right: 1.5%;

      &:last-child {
        margin-right: 0;
      }

      &.address {
        width: 38%;
      }

      &.zip {
        width: 19%;
      }

      &.phone {
        width: 40%;
      }
    }
  }
}

.disclaimer p {
  margin: 0;
  font-size: 1.1rem;
  color: lighten(#504865, 15%);

  a {
    color: #9387b4;
    text-decoration: none;

    &:hover {
      color: darken(#9387b4, 10%);
    }
  }
}

@keyframes cta-hover {
  @for $i from 0 through 10 {
    #{$i*10%} {
      background: linear-gradient(#{106 - ($i*6)}deg, #{$light-blue} 0%, #{$blue} #{$i*$step}, #{$purple} #{$i*$step + 29%}, #{$light-orange} #{$i*$step + 79%}, #{$orange} 100%);
    }
  }
}

.dollar-dollar-bills {
  position: absolute;
  overflow: hidden;
  height: 100%;
  width: 100%;

  img {
    box-shadow: .3rem .3rem 2rem rgba(0, 0, 0, .4);
    opacity: 0;
  }

  @for $i from 1 through 20 {
    img:nth-child(#{$i}) {
      animation: fade-in 1s;
      animation-fill-mode: forwards;
      animation-delay: #{1s + (.2 * $i)};
      margin-top: #{$i * -5%};
      transform: rotate(#{-55deg + $i*25}) translate3d(#{$i * 10%}, #{$i - 10%}, 0);
    }
  }

  @include mobile {
    display: none;
  }
}

.background-overlay {
  background-color: rgba(#0d0628, 0.85);
  position: absolute;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.closing-time {
  .container {
    animation: slide-up .6s ease-out;
  }

  .dollar-dollar-bills {
    transform: scale(5);
    opacity: 0;
    transition: all .6s ease-out .3s;
    transition-delay: .3s;
  }
}
</style>

<template>
  <div id="app">
    <div class="dollar-dollar-bills">
      <img src="~/assets/images/100-bill.jpg" alt="" v-for="i in 20" :key="i">
    </div>
    <div class="background-overlay"></div>
    <div class="flex-center">
      <div class="container">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      // title: this.$t('pages.index.document_title'),
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,600|Poppins:700'
        }
      ],
      // meta: createMetaTags({
      //   title: this.$t('social.share_title'),
      //   description: this.$t('social.share_description'),
      //   image: this.$t('social.share_image'),
      //   url: this.$t('social.share_url')
      // })
    }
  }
}
</script>
