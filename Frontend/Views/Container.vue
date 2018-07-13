<template>
    <!-- TODO: Routing -->
    <section class="main">
        <Intro/>
        <!-- TODO: Projects, footer -->
    </section>
</template>

<script>
import Intro from './Intro.vue'

export default {
    components: {
        Intro
    }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'PlexSans';
  font-style: italic;
  font-weight: 400;
  src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'), url(https://fonts.gstatic.com/s/ibmplexsans/v2/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZJW9XjDg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'PlexSans';
  font-style: normal;
  font-weight: 400;
  src: local('IBM Plex Sans'), local('IBMPlexSans'), url(https://fonts.gstatic.com/s/ibmplexsans/v2/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
    font-family: 'Iosevka';
    font-weight: 400;
    src: url('/fonts/iosevka-brew-regular.woff2') format('woff2'),
         url('/fonts/iosevka-brew-regular.ttf') format('truetype');
}

$break-mobile: 768px;
$break-mobile-small: 320px;

body {
    background: #efefef;
    text-rendering: optimizeSpeed;
    font-family: 'PlexSans', serif;
    font-size: 22px;
    font-weight: 400;
    color: #000;
    -webkit-font-smoothing: antialiased;
    text-decoration-skip: ink;
}

a {
    color: #000;
    cursor: pointer;
    background: none;
    transition: color 0.2s, background 0.2s;
    
    &:hover {
        color: #999;
    }
}

p {
    font-size: 1em;
    line-height: 1.5em;

    @media screen and (max-width: $break-mobile) { 
        font-size: 0.8em;
    }
    @media screen and (max-width: $break-mobile-small) {
        font-size: 0.6em;
    }
}

button {
    outline: none;
}

section.main {
    padding: 3em;
    margin: 0 auto;
    max-width: 1400px;

    @media screen and (max-width: $break-mobile) { 
        padding: 1em;
    }
}

.footer {
    margin-top: 8em;
    
    p {
        color: #bcbcbc;
        font-size: 0.7em;
        text-align: center;
    }
}

</style>