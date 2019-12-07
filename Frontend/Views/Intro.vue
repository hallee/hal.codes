<template>
  <div>
  <Logo :logo-color="logoColor" />
  <section class="intro">
    <div>
      <article>
        <p>👋 I’m Hal, a sofware engineer living in Brooklyn and building apps for iOS.</p>
        <p>Currently I work at <a href="https://qz.com" title="Quartz">Quartz</a>, where I lead development of our recently launched, all-new, <a href="https://qz.com/1724663/putting-members-at-the-heart-of-quartz/" title="Relaunch of Quartz">member-focused news app</a>. <br>Previously I worked on Quartz’s <a href="https://qz.com/613700/its-here-quartzs-first-news-app-for-iphone/" title="Quartz's first news app">conversational news app</a>.</p>
        <p>In my free time I <a href="https://github.com/hallee" title="Hal on GitHub">write open source software</a> and write a bit on my <a href="https://blog.hal.codes">blog</a>. <br>Here you can find a small showcase of apps and features I’ve worked on recently.</p>
      </article>
    </div>
    <Playground @logo-color="setLogoColor = $event" />
  </section>
  </div>
</template>

<script>
import Logo from './Logo.vue'
export default {
  components: {
    Playground: () => import('./Playground.vue'),
    Logo
  },
  data () {
    return {
      setLogoColor: null
    }
  },
  computed: {
    initialLogoColor: function () {
      return window.initialLogoColor
    },
    logoColor: function () {
      return this.setLogoColor || this.initialLogoColor
    }
  }
}
</script>

<style lang="scss" scoped>
section.intro {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  article {
    max-width: 480px;
    margin-bottom: 2em;
    margin-right: 2em;

    @include mobile {
      margin-right: 0;
    }
  }

  div {
    flex: 1 0 320px;
    min-width: 320px;

    @include tablet {
      flex: 1 0 300px;
      min-width: 300px;
    }

    @include mobile-small {
      min-width: 100px;
      flex: 1 0 100px;
    }
  }
}
</style>