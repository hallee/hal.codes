<template>
    <div id="playground"></div>
</template>

<script>
import Codemirror from "codemirror"
import 'codemirror/mode/swift/swift'
import "codemirror-one-dark-theme"

export default { 
    mounted: function () {
        this.$nextTick(function () {
            console.log(document.getElementById('playground'))
            var playground = Codemirror(document.getElementById('playground'), {
                value: "enum LogoColor {\n\
                case red, orange, yellow, green, blue, indigo, violet\n\
            }\n\
            \n\
            class SiteLogo {\n\
                var color: LogoColor\n\
            \n\
                init(_ color: LogoColor) {\n\
                    self.color = color\n\
                }\n\
            }\n\
            \n\
            /// Called by the app to fetch this site's logo ✨\n\
            func generateSiteLogo() -> SiteLogo {\n\
                let logo = SiteLogo(.indigo)\n\
                return logo\n\
            }",
                mode: 'swift',
                indentUnit: 4,
                lineNumbers: true,
                theme: "one-dark"
            })
        })
    }
}

</script>

<!-- <template>
    <div id="playground">
        <codemirror v-model="code" :options="options"></codemirror>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/swift/swift'
import 'codemirror-one-dark-theme'

export default { 
    components: {
      codemirror
    },
    data () {
      return {
        code: 'class CodeMirror',
        options: {
          mode: 'text/x-swift',
          indentUnit: 4,
          lineNumbers: true,
          theme: 'one-dark'
        },
      }
    }

    // created: function() {
    //     // import('codemirror').then(Codemirror => {
    //         console.log(document.getElementById('playground'))
    //         var playground = Codemirror(document.getElementById('playground'), {
    //             value: "enum LogoColor {\n\
    //             case red, orange, yellow, green, blue, indigo, violet\n\
    //         }\n\
    //         \n\
    //         class SiteLogo {\n\
    //             var color: LogoColor\n\
    //         \n\
    //             init(_ color: LogoColor) {\n\
    //                 self.color = color\n\
    //             }\n\
    //         }\n\
    //         \n\
    //         /// Called by the app to fetch this site's logo ✨\n\
    //         func generateSiteLogo() -> SiteLogo {\n\
    //             let logo = SiteLogo(.indigo)\n\
    //             return logo\n\
    //         }",
    //             mode: 'swift',
    //             indentUnit: 4,
    //             lineNumbers: true,
    //             theme: "one-dark"
    //         });
    //     // })
    // }
}
</script> -->