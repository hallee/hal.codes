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

<style>
@font-face {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/ibmplexsans/v2/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
    font-family: 'Iosevka';
    font-weight: 400;
    src: url('/fonts/iosevka-brew-regular.woff2') format('woff2'),
         url('/fonts/iosevka-brew-regular.ttf') format('truetype');
}

body {
    background: #efefef;
    text-rendering: optimizeSpeed;
    font-family: 'IBM Plex Sans', serif;
    font-size: 22px;
    font-weight: 400;
    color: #000;
    -webkit-font-smoothing: antialiased;
    text-decoration-skip: ink;
}

a {
    color: #000;
    background: none;
    transition: color 0.2s, background 0.2s;
    
    &:hover {
        color: #999;
        cursor: pointer;
    }
}

p {
    font-size: 1em;
    line-height: 1.5em;
}

section.main {
    padding: 3em;
    margin: 0 auto;
    max-width: 1400px;
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