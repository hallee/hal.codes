<template>
<transition name="fade">
<div id="playground">
    <codemirror
        :code="code"
        :options="options">
    </codemirror>
</div>
</transition>
</template>

<script>
import { codemirror } from 'vue2-codemirror-lite-swift'

export default {
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
    -webkit-user-select: none;
    
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
    }
    .CodeMirror-scroll {
        max-height: 600px;
    }
}

</style>