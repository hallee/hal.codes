<template>
<transition name="fade">
<div id="playground">
    <div class="run-bar">
        <button class="roundrect-button run-button" :disabled="status != 'ready'" v-on:click.passive="execute">
            <img src="/images/run.svg" height="24px" width="24px" />
        </button>

        <div class="run-result">
            <transition name="slide-right">
                <img v-if="result == 'success'" key="success-icon" src="/images/success.svg" height="32px" width="32px" />
                <img v-if="result == 'error'" key="error-icon" src="/images/fail.svg" height="32px" width="32px" />
            </transition>
        </div>
        <div class="spacer"></div>
        <p class="version"><a href="https://swift.org/blog/swift-4-1-released/">{{ swiftVersion }}</a></p>

        <button class="reset-button" v-on:click.passive="resetPlayground">
            <img src="/images/reset.svg" height="24px" width="24px" />
        </button>
    </div>
    <codemirror
        v-model="code"
        :options="options">
    </codemirror>
    <div class="console">
        <p><pre>{{ playgroundOutput }}</pre></p>
    </div>
    <p><i>What's this?</i> A community <a href="https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html">Swift</a> environment. Poke around and get a taste of my favorite programming language right here in your browser.</p>
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

struct SiteLogo {
    var color: LogoColor
}

/// Called by the app to fetch this site's logo ✨
func generateSiteLogo() -> SiteLogo {
    return SiteLogo(color: .indigo)
}`
var socket

export default {
    methods: {
        execute: function (event) {
            this.status = 'running'
            this.result = 'unknown'
            socket.send(this.code)
        },
        printConsole: function (text) {
            this.status = 'ready'
            // TODO: sanitize, limit output
            this.playgroundOutput = text
        },
        constructSocket: function () {
            const vm = this
            socket = new WebSocket('ws://' + location.host + '/playground')
            socket.onopen = function (event) {
                vm.status = 'ready'
            }
            socket.onmessage = function (event) {
                var response = JSON.parse(event.data)
                vm.printConsole(response.text + response.error)
                if (response.error != '') {
                    vm.result = 'error'
                } else {
                    vm.result = 'success'
                }
            }
            socket.onclose = function (event) {
                vm.status = 'disconnected'
                vm.constructSocket()
            }
        },
        resetPlayground: function () {
            this.code = codeString
        },
        checkSwiftVersion: function () {
            this.$http.get('/playground/version').then(response => {
                this.swiftVersion = 'Swift ' + response.body;
            }, response => { });
        }
    },
    components: {
        codemirror
    },
    mounted: function () {
        this.constructSocket()
        this.checkSwiftVersion()
    },
    data () {
        return {
            playgroundOutput: '',
            code: codeString,
            swiftVersion: '',
            status: {
                type: String,
                validator: function (value) {
                  return [
                    'ready',
                    'running',
                    'disconnected'
                  ].indexOf(value) !== -1
                }
            },
            result: {
                type: String,
                validator: function (value) {
                  return [
                    'success',
                    'error',
                    'unknown'
                  ].indexOf(value) !== -1
                }
            },
            options: {
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                mode: 'text/x-swift',
                lineWrapping: true,
                undoDepth: 100,
                historyEventDelay: 500,
            }
        }
    }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
    transition: opacity .2s, transform .2s cubic-bezier(0.175, 0.9, 0.32, 1.6);
}
.slide-right-enter, .slide-right-leave-to {
    opacity: 0;
    transform: translateX(-0.4em);
}

$break-mobile: 768px;
$break-mobile-small: 320px;

.run-bar {
    margin: 12px 0;
    display: flex;
    .spacer {
        flex-grow: 1;
    }
    .version {
        margin: auto 2em;
        font-size: 0.6em;

        a {
            color: #B7B7B7;
            text-decoration: none;
        }
    }
}

.roundrect-button {
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 0.8em;
    cursor: pointer;
    transition: transform .3s cubic-bezier(0.175, 0.9, 0.32, 1.6);
    
    &:hover {
        transform: scale(0.98);
    }
    &:active {
        transform: scale(0.92);
    }
}

.run-button {
    background: #5D6169;
    padding: 6px 18px;
    z-index: 10;
    img {
        vertical-align: middle;
    }

    &:disabled {
        opacity: 0.5;
    }
}

.reset-button {
    align-self: flex-end;
    margin: auto 0;
    padding: 0;
    height: 100%;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.5;

    img {
        vertical-align: top;
    }
}

#playground {
    flex: 1 0 520px;
    max-width: 740px;
    width: auto;

    @media screen and (max-width: $break-mobile) { 
        flex: 1 0 240px;
    }
    
    .cm-s-one-dark, .console pre {
        font-family: 'Iosevka';
        font-weight: 400;
        font-size: 16px;

        @media screen and (max-width: $break-mobile) { 
            font-size: 0.8em;
        }
        @media screen and (max-width: $break-mobile-small) { 
            font-size: 0.5em;
        }
    }
    .CodeMirror {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        line-height: 1.4em;
        padding: 1em;
        height: auto;
        -webkit-user-select: none;

        .CodeMirror-linenumbers {
            margin-right: 0.2em;
        }
    }
    .CodeMirror-scroll {
        max-height: 600px;
    }

    div.CodeMirror-cursors {
        visibility: visible;
    }

    .console {
        color: #CDD5E4;
        background-color: #444A55;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        line-height: 1.4em;
        padding: 0em 2.4em;
        margin: 0;
        max-height: 240px;
        overflow-y: scroll;
        p {
            margin: 0.4em 0;
        }
        pre {
            margin: 0;
            white-space: pre-wrap;
            &:before {
                margin-left: -1em;
                opacity: 0.5;
                content: "> ";
                display: inline;
            }
        }
    }

    .run-result {
        display: flex;
        margin-left: 0.4em;

        img {
            position: absolute;
            margin: auto 0;
        }
    }
}

</style>