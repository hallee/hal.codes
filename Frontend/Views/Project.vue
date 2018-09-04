<template>
  <section class="main">
    <Logo />
    <component
      :is="currentPost"
      ref="currentPost"
      class="post"
    />
    <Footer />
  </section>
</template>

<script>
import Logo from './Logo.vue'
import Footer from './Footer.vue'

export default {
  beforeRouteEnter (to, from, next) {
    import('../../Content/Projects/' + to.params.project + '.md').then(function(post) {
      if (post) {
        next(true)
      } else {
        next('/')
      }
    }).catch(() => {
      next('/')
    })
  },
  components: {
    Logo,
    Footer
  },
  data () {
    return {
      currentPost: () => import('../../Content/Projects/' + this.$route.params.project + '.md')
    }
  },
  updated: function () {
    const autoplayVideo = this.$refs.currentPost.$refs.autoplayVideo
    if (autoplayVideo) {
      autoplayVideo.play()
    }
  }
}
</script>

<style lang="scss">
@import "../Sass/mixins.scss";
$post-width: 640px;

.post {
  display: flex;
  flex-wrap: wrap;

  div:first-child {
    @include mobile {
      order: 1;
    }
  }

  h2 {
    max-width: $post-width;
  }

  p {
    max-width: $post-width;
  }

  .post-text {
    flex: 1 0 40%;

    @include mobile {
      flex: 1 0 100%;
    }
  }

  .image-fit {
    flex: 1 0 50%;
    max-width: 526px;
    min-width: 360px;
    margin: 0 auto;
  }

  .iphone-x {
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 auto;
    width: 526px;
    height: 998px;
    position: relative;

    @include tablet {
      width: 400px;
      height: 759px;
    }

    @include mobile {
      margin-top: 1em;
      width: 380px;
      height: 721px;
    }

    @include mobile-small {
      width: 340px;
      height: 645px;
    }
  }

  .iphone-x:before {
    content: " ";
    background-image: url("/images/videoFrame@2x.png");
    background-size: 100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-position: center center, center center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    pointer-events: none;
  }
  .iphone-x > video {
    background: black;
    position: absolute;
    top: 2.55%;
    left: 6%;
    width: 70.34%; // 370px
    height: 80.76%; // 806px
    cursor: pointer;
    z-index: 5;
  }


  img {
    width: auto;
    max-width: 100%;
    object-fit: contain;

    @include mobile {
      margin-top: 1em;
    }
  }


}
</style>