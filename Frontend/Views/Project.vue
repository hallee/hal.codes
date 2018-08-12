<template>
  <section class="main">
    <Logo />
    <component :is="currentPost" />
  </section>
</template>

<script>
import Logo from './Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      currentPost: () => import('../../Content/Projects/' + this.$route.params.project + '.md')
    }
  }
}
</script>