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

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>