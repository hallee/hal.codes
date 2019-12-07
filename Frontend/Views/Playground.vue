<template>
  <transition name="fade">
    <div id="playground">
      <div class="run-bar">
        <button 
          title="Run Playground" 
          class="roundrect-button run-button" 
          :disabled="status != 'ready'" 
          @click.passive="execute"
        >
          <img 
            src="/images/run.svg" 
            height="24px" 
            width="24px"
            alt=""
          >
        </button>

        <div class="run-result">
          <transition name="slide-right">
            <img
              v-if="result == 'success'"
              key="success-icon"
              src="/images/success.svg"
              height="32px"
              width="32px"
              alt="Run succeeded"
            >
            <img 
              v-if="result == 'error'"
              key="error-icon"
              src="/images/fail.svg"
              height="32px"
              width="32px"
              alt="Run failed"
            >
          </transition>
        </div>
        <div class="spacer" />
        <p class="version">
          <a href="https://swift.org/blog/swift-5-1-released/">{{ swiftVersion }}</a>
        </p>

        <button 
          title="Reset to original code"
          class="reset-button"
          @click.passive="resetPlayground"
        >
          <img 
            src="/images/reset.svg" 
            height="24px"
            width="24px"
            alt=""
          >
        </button>
      </div>
      <CodeMirrorSwift v-model="code" />
      <div class="console">
        <p><pre>{{ playgroundOutput }}</pre></p>
      </div>
      <div class="explanation">
        <p><a @click.passive="toggleExplanation"><i>What’s this?</i></a>
          <transition name="fade">
            <span v-if="showExplanation == true"> A fully-featured <a href="https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html">Swift</a> environment in your browser. Hit the play button to run your code. You can even make changes to this site’s logo — and they’ll be visible to everyone!</span>
          </transition>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import CodeMirrorSwift from 'vue2-codemirror-lite-swift'

const codeString = `enum LogoColor {
    case red, orange, yellow, green, blue, indigo, violet
}

/// Called by the app to color this site's logo ✨
func siteLogoColor() -> LogoColor {
    return .indigo
}`
var socket

export default {
  components: {
    CodeMirrorSwift
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
      showExplanation: false
    }
  },
  mounted: function () {
    this.constructSocket()
    this.checkSwiftVersion()
  },
  methods: {
    execute: function () {
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
      socket = new WebSocket('wss://' + location.host + '/playground')
      socket.onopen = function () {
        vm.status = 'ready'
      }
      socket.onmessage = function (event) {
        var response = JSON.parse(event.data)
        if (response.hasOwnProperty('error') && response.hasOwnProperty('text')) {
          vm.printConsole(response.text + response.error)
          if (response.error != '') {
            vm.result = 'error'
          } else {
            vm.result = 'success'
          }
        } else if (response.hasOwnProperty('logoColor')) {
          if (response.logoColor.length == 6) {
            vm.$emit('logo-color', response.logoColor)
          }
        }
      }
      socket.onclose = function () {
        vm.status = 'disconnected'
        setTimeout(function() { vm.constructSocket() }, 1000)
      }
    },
    resetPlayground: function () {
      this.code = codeString
    },
    checkSwiftVersion: function () {
      this.$http.get('/playground/version').then(response => {
        if (response.body.length < 6) {
          this.swiftVersion = 'Swift ' + response.body
        }
      });
    },
    toggleExplanation: function () {
      this.showExplanation = !this.showExplanation
    },
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

.run-bar {
  margin: 0 0 12px 0;
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
  transition: all .4s;

  img {
    vertical-align: top;
  }

  &:hover {
    transform: rotate(360deg);
  }
  &:active {
    opacity: 0.1;
  }


}

#playground {
  width: auto;

  @include tablet {
    flex-basis: 55%;
  }

  @include mobile {
    flex-basis: 80%;
  }
  
  .cm-s-one-dark, .console pre {
    font-family: 'Iosevka';
    font-weight: 400;
    font-size: 16px;

    @include mobile-small {
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
    user-select: none;
    pointer-events: none;
    ::-webkit-scrollbar-corner, ::-webkit-scrollbar { background-color: rgba(0,0,0,0); }

    @include tablet {
      padding: 0.4em;
    }

    .CodeMirror-code {
      -webkit-user-select: text;
      user-select: text;
      pointer-events: auto;
      ::selection {
        background-color: rgba(200, 220, 240, 0.2);
      }
    }

    .CodeMirror-linenumber {
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
    }
  }
  .CodeMirror-scroll {
    max-height: 600px;
  }

  .console {
    color: #CDD5E4;
    background-color: #444A55;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    max-height: 220px;
    overflow-y: auto;
    overflow-x: hidden;
    p {
      margin: 0.8em 0;

      @include tablet {
        margin: 0.6em 0;
      }
    }
    pre {
      margin: 0 3.2em;
      white-space: pre-wrap;
      line-height: 1.6em;
      &:before {
        margin-left: -1em;
        opacity: 0.5;
        content: "> ";
        display: inline;
      }

      @include tablet {
        margin: 0 2.6em;
      }
    }
  }

  .explanation {
    font-size: 0.8em;
    height: 4.4em;
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
