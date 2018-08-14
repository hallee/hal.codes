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
  flex-wrap: wrap-reverse;
  
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

  .post-text {
    flex: 1 0 40%;
  }

  .image-fit {
    flex: 1 0 50%;
    max-width: 554px;
    min-width: 380px;
    margin: 0 auto;
  }

  img {
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }


}
</style>