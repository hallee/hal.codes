<template>
<div id="playground">
    <codemirror
        :code="code"
        :options="options">
    </codemirror>
</div>
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
<!--  
<script>
import hljs from 'highlight.js/lib/highlight';
import Behave from 'behave-js';
export default {
    mounted: function () {
        this.$nextTick(function () {
            hljs.initHighlightingOnLoad();
            var editor = new Behave({
                textarea: document.getElementById('test'),
                replaceTab: true,
                softTabs: true,
                tabSize: 4,
                autoOpen: true,
                overwrite: true,
                autoStrip: true,
                autoIndent: true,
                fence: false
            })
        })
    }
}
</script>  -->