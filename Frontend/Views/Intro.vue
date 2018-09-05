<template>   
  <section class="intro">
    <div>
      <Logo :logo-color="logoColor" />
      <article>
        <p>👋 I’m Hal, an iOS developer living in Brooklyn.</p>
        <p>Currently I work at Quartz
        helping to build a <a href="https://qz.com/app/">conversational news app</a>. It’s a fun reprieve from traditional news apps, and it’s sort of like texting with an entire newsroom.</p>
      </article>
    </div>
    <Playground @logo-color="setLogoColor = $event" />
  </section>
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
@import "../Sass/mixins.scss";

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