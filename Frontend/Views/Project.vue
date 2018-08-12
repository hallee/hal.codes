<template>
  <section class="main">
    <Logo />
    <component 
      :is="currentPost" 
      class="post"
    />
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

<style lang="scss">
$post-width: 500px;

.post {
  display: flex;
  flex-wrap: wrap;
  
  h1, h2, h3, h4, h5 {
    font-family: Cerebri, serif;
    font-weight: 600;
  }

  h2 {
    font-size: 2.2em;
    max-width: $post-width;
  }

  p {
    max-width: $post-width;
  }

  img {
    object-fit: contain;
  }

  .post-text {
    flex-grow: 1;
  }
}
</style>