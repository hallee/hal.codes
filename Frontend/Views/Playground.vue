<template>
<transition name="fade">
<div id="playground">
    <div class="run-bar">
        <button v-on:click="run">Run</button>
    </div>
    <codemirror
        v-model="code"
        :options="options">
    </codemirror>
    <p><a href="https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html">Swift</a> is my language of choice — it's easy to learn, open source, and has great low-level performance. But its usage is mostly limited to iOS developers, and I'd like to see that change.</p>
    <p>In that spirit, I've made this little Swift environment so that you can try it right here in your browser. It's a real Swift environment with all the type checking and error handling you'd expect.</p>
    <p>You can use it to change this site's logo color — not just for you, but for everyone who visits this page!</p>
</div>
</transition>
</template>

<script>
import { codemirror } from 'vue2-codemirror-lite-swift'

var exampleSocket

function constructSocket() {
    exampleSocket = new WebSocket("ws://" + location.host + "/playground")
    // TODO: loading view
    exampleSocket.onopen = function (event) {
      // TODO: hide loading view
      console.log("OPENED")
    }
    exampleSocket.onmessage = function (event) {
      // TODO: show error
      console.log(event.data);
    }
    exampleSocket.onclose = function (event) {
        console.log("CLOSED")
        constructSocket()
    }
}
constructSocket()


export default {
    methods: {
        run: function (event) {
            exampleSocket.send(this.$data.code)
        }
    },
    components: {
        codemirror
    },
    data () {
        return {
          code: `enum LogoColor {
    case red, orange, yellow, green, blue, indigo, violet
}

class SiteLogo {
    var color: LogoColor

    init(_ color: LogoColor) {
        self.color = color
    }
}

/// Called by the app to fetch this site's logo ✨
func generateSiteLogo() -> SiteLogo {
    let logo = SiteLogo(.indigo)
    return logo
}`,
            options: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                mode: 'text/x-swift',
                lineWrapping: true,
                undoDepth: 100,
                historyEventDelay: 500,
                gutters: ['CodeMirror-linenumbers'],
            }
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

#playground {
    flex-grow: 1;
    max-width: 740px;
    width: auto;
    border-radius: 8px;

    p {
        font-size: 0.8em;
    }
    
    .cm-s-one-dark {
        font-family: 'Iosevka';
        font-weight: 400;
        font-size: 16px;
    }
    .CodeMirror {
        border-radius: 7px;
        line-height: 1.4em;
        padding: 1em;
        height: auto;
        -webkit-user-select: none;

        pre {
            -webkit-font-variant-ligatures: normal !important;
            font-variant-ligatures: normal !important;
        }
    }
    .CodeMirror-scroll {
        max-height: 600px;
    }
}

</style>