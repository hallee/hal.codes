<template>
<transition name="fade">
<div id="playground">
    <div class="run-bar">
        <button class="roundrect-button run-button" v-on:click="execute">
            <img src="/images/run.svg" height="32px" width="32px" />
        </button>

        <button class="reset-button" v-on:click="resetPlayground">
            <img src="/images/reset.svg" height="32px" width="32px" />
        </button>
    </div>
    <codemirror
        v-model="code"
        :options="options">
    </codemirror>
    <div class="console">
        <p><pre>{{ playgroundOutput }}</pre></p>
    </div>
<!--     <p><a href="https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html">Swift</a> is my language of choice — it's easy to learn, open source, and has great low-level performance. But its usage is mostly limited to iOS developers, and I'd like to see that change.</p>
    <p>In that spirit, I've made this little Swift environment so that you can try it right here in your browser. It's a real Swift environment with all the type checking and error handling you'd expect.</p>
    <p>You can use it to change this site's logo color — not just for you, but for everyone who visits this page!</p> -->
</div>
</transition>
</template>

<script>
import { codemirror } from 'vue2-codemirror-lite-swift'

const codeString = `enum LogoColor {
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
}`
var socket

export default {
    methods: {
        execute: function (event) {
            socket.send(this.code)
        },
        printConsole: function (text) {
            this.playgroundOutput = text
        },
        constructSocket: function () {
            const vm = this
            socket = new WebSocket("ws://" + location.host + "/playground")
            // TODO: loading view
            socket.onopen = function (event) {
              // TODO: hide loading view
                console.log("OPENED")
            }
            socket.onmessage = function (event) {
              // TODO: show error
              console.log(event.data)
              vm.printConsole(event.data)
            }
            socket.onclose = function (event) {
                console.log("CLOSED")
                vm.constructSocket()
            }
        },
        resetPlayground: function () {
            this.code = codeString
        }
    },
    components: {
        codemirror
    },
    mounted: function () {
        this.constructSocket()
    },
    data () {
        return {
            playgroundOutput: 'playgroundOutput',
            code: codeString,
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

.run-bar {
    margin: 12px 0;
    display: flex;
}

.roundrect-button {
    color: white;
    border: none;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 0.8em;
    cursor: pointer;
    transition: transform .3s cubic-bezier(0.175, 0.9, 0.32, 1.6);
    filter: drop-shadow( 0 4px 16px rgba(40, 0, 80, 0.25) );
    
    &:hover {
        transform: scale(1.08);
    }
    &:active {
        transform: none;
    }
}

.run-button {
    background: #5664EC;
    padding: 6px 32px;
}

.reset-button {
    align-self: flex-end;
    margin-left: auto;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;

    img {
        vertical-align: bottom;
    }
}

.console {
    font-family: 'Iosevka';
    font-weight: 400;
    font-size: 16px;
}

#playground {
    flex-grow: 1;
    max-width: 740px;
    width: auto;

    p {
        font-size: 0.8em;
    }
    
    .cm-s-one-dark {
        font-family: 'Iosevka';
        font-weight: 400;
        font-size: 16px;
    }
    .CodeMirror {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
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