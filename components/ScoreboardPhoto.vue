<style lang="scss">
.scoreboard-photo {
  position: relative;
  border-radius: $border-radius;
  display: inline-block;
  width: 10rem;
  height: 12.2rem;

  img, .cover, .yes-bg {
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255,26,9,0.5);
  }

  h5 {
    position: absolute;
    bottom: .6rem;
    left: 0px;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.3rem;
    text-shadow: 0 0 5px rgba(0, 0, 0, 1.0);
    margin: 0;
    padding: 0;
    color: #fff;

    small {
      display: block;
      font-size: 1rem;
    }
  }

  &.long-name h5 {
    font-size: 0.95rem;
    bottom: .9rem;
  }

  .yes-bg {
    display: none;
  }

  &.vote-yes {
    .cover {
      background: none;
    }

    .yes-bg {
      background: linear-gradient(90deg, rgba(55,191,164,1) 0%, rgba(53,118,173,1) 100%);
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      z-index: 1;
    }

    h5 {
      z-index: 2;
    }
  }
}
</style>

<template>
  <div :class="{ 'scoreboard-photo': true, 'vote-yes': rep.supports_cra, 'long-name': hasLongName }">
    <img :src="imageURL" alt="">
    <div class="cover">
      <div class="yes-bg"></div>
      <h5>
        {{ rep.last_name }}
        <small v-if="rep.state">{{ subtitle }}</small>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rep: Object
  },

  computed: {
    subtitle() {
      let str = '('

      if (this.rep.organization == 'Senate') {
        str += 'SEN '
      }

      if (this.rep.party) {
        str += this.rep.party.substr(0, 1).toUpperCase()
      }

      str += ` - ${this.rep.state})`

      return str
    },

    hasLongName() {
      const str = this.rep.last_name || ''
      return str.indexOf(' ') === -1 && str.length > 11;
    },

    imageURL() {
      return `https://www.fightforthefuture.org/congress-images/${this.rep.bioguide_id}_x2.jpg`
    }
  }
}
</script>
