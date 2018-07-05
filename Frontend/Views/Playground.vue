<template>
<div id="playground">
    <codemirror
        :code="code"
        :options="{
           tabSize: 2,
           lineNumbers: true,
           lineWrapping: true,
           line: true,
           gutters: ['CodeMirror-linenumbers'],
        }">
    </codemirror>
</div>
<!--    <link rel="stylesheet" href="/codemirror/lib/codemirror.css">
    <link rel="stylesheet" href="/codemirror/theme/one-dark.css">
    <script src="/codemirror/lib/codemirror.js" defer></script>
    <script src="/codemirror/mode/swift/swift.js" defer></script>
    <script src="/scripts/playground.js" defer></script> -->
</template>

<script>
import { codemirror } from 'vue2-codemirror-lite-js'
// import codemirror from './CodeMirror.vue'


export default {
    components: {
        codemirror
    },
    data () {
        return {
          code: 'var a = 10',
          cmOptions: {
              tabSize: 4,
              styleActiveLine: true,
              lineNumbers: true,
              line: true,
              mode: 'text/x-swift',
              lineWrapping: true,
              theme: 'rubyblue'
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