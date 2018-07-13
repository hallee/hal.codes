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
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/ibmplexsans/v2/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
    font-family: 'IBM Plex Sans';
    font-style: italic;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/ibmplexsans/v2/zYX-KVElMYYaJe8bpLHnCwDKhdTuGaZJW9XjDlN8.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
    font-family: 'Iosevka';
    font-weight: 400;
    src: url('/fonts/iosevka-brew-regular.woff2') format('woff2'),
         url('/fonts/iosevka-brew-regular.ttf') format('truetype');
}

$break-mobile: 768px;

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

i {
    font-family: 'IBM Plex Sans', serif;
    font-style: italic;
    font-weight: 400;
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