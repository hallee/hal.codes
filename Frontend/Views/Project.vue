<template>
  <section class="main">
    <Logo />
    <h2>Project '{{ $route.params.project }}'</h2>
  </section>
</template>

<script>
import Logo from './Logo.vue'
export default {
  components: {
    Logo
  },
  beforeRouteEnter (to, from, next) {
    // Check that Markdown file exists for project, otherwise:
    Logo.logoColor = window.initialLogoColor 
    next(true)
  }
}
</script>