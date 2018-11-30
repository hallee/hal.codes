<template>
  <section class="main">
    <Intro />
    <Projects />
    <Footer />
  </section>
</template>

<script>
import Intro from './Intro.vue'
import Footer from './Footer.vue'
const Projects = () => ({
  component: import('./Projects.vue')
})

export default {
  components: {
    Intro,
    Projects,
    Footer
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'PlexSans';
  font-style: italic;
  font-weight: 400;
  src: url('/fonts/ibmplexsans-italic.woff2') format('woff2'),
       url('/fonts/ibmplexsans-italic.ttf') format('truetype');
}
@font-face {
  font-family: 'PlexSans';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/ibmplexsans-regular.woff2') format('woff2'),
       url('/fonts/ibmplexsans-regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Iosevka';
  font-weight: 400;
  src: url('/fonts/iosevka-brew-regular.woff2') format('woff2'),
       url('/fonts/iosevka-brew-regular.ttf') format('truetype');
}
@font-face {
  font-family: 'BasierSquare';
  src: url('/fonts/basiersquare-bold-webfont.eot');
  src: url('/fonts/basiersquare-bold-webfont.eot?#iefix') format('embedded-opentype'),
       url('/fonts/basiersquare-bold-webfont.woff2') format('woff2'),
       url('/fonts/basiersquare-bold-webfont.woff') format('woff'),
       url('/fonts/basiersquare-bold-webfont.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

html {
  overflow-y: scroll;
}

body {
  background: #efefef;
  font-family: 'PlexSans', serif;
  font-size: 20px;
  font-weight: 400;
  color: #232323;
}

h1, h2, h3, h4, h5 {
  font-family: 'BasierSquare', serif;
  font-weight: 700;
}

h2 {
  font-size: 2.8em;

  @include tablet {
    font-size: 1.8em;
  }
}

a {
  color: #232323;
  cursor: pointer;
  background: none;
  text-decoration: underline;
  transition: color 0.2s, background 0.2s;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  
  &:hover {
    color: #999;
  }
}

p {
  font-size: 1.1em;
  line-height: 1.5em;

  @include tablet {
    font-size: 0.9em;
  }
  @include mobile {
    font-size: 0.8em;
  }
  @include mobile-small {
    font-size: 0.7em;
  }
}

code {
  font-family: 'Iosevka', monospace;
  background: #ddd;
  border-radius: 4px;
  padding: 0 0.2em;
}

button {
  outline: none;
}

section.main {
  padding: 3em 3em 1em 3em;
  margin: 0 auto;
  max-width: 1400px;
  overflow-x: hidden;

  @include tablet {
    padding: 2em;
  }
  
  @include mobile {
    padding: 1em;
  }
}
</style>
