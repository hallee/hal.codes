(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{17:function(t,o,e){},20:function(t,o,e){"use strict";var n=e(17);e.n(n).a},24:function(t,o,e){"use strict";e.r(o);var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("transition",{attrs:{name:"fade"}},[e("div",{attrs:{id:"playground"}},[e("div",{staticClass:"run-bar"},[e("button",{staticClass:"roundrect-button run-button",attrs:{title:"Run Playground",disabled:"ready"!=t.status},on:{"&click":function(o){return t.execute(o)}}},[e("img",{attrs:{src:"/images/run.svg",height:"24px",width:"24px"}})]),t._v(" "),e("div",{staticClass:"run-result"},[e("transition",{attrs:{name:"slide-right"}},["success"==t.result?e("img",{key:"success-icon",attrs:{src:"/images/success.svg",height:"32px",width:"32px"}}):t._e(),t._v(" "),"error"==t.result?e("img",{key:"error-icon",attrs:{src:"/images/fail.svg",height:"32px",width:"32px"}}):t._e()])],1),t._v(" "),e("div",{staticClass:"spacer"}),t._v(" "),e("p",{staticClass:"version"},[e("a",{attrs:{href:"https://swift.org/blog/swift-4-1-released/"}},[t._v(t._s(t.swiftVersion))])]),t._v(" "),e("button",{staticClass:"reset-button",attrs:{title:"Reset to original code"},on:{"&click":function(o){return t.resetPlayground(o)}}},[e("img",{attrs:{src:"/images/reset.svg",height:"24px",width:"24px"}})])]),t._v(" "),e("codemirror",{model:{value:t.code,callback:function(o){t.code=o},expression:"code"}}),t._v(" "),e("div",{staticClass:"console"},[e("p",[e("pre",[t._v(t._s(t.playgroundOutput))])])]),t._v(" "),e("div",{staticClass:"explanation"},[e("p",[e("a",{on:{"&click":function(o){return t.toggleExplanation(o)}}},[e("i",[t._v("What's this?")])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[1==t.showExplanation?e("span",[t._v(" A community "),e("a",{attrs:{href:"https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html"}},[t._v("Swift")]),t._v(" environment. Poke around and get a taste of my favorite programming language right here in your browser. "),e("br"),t._v("Changes made to the site's logo will be visible to everyone!")]):t._e()])],1)])],1)])};n._withStripped=!0;const s="enum LogoColor {\n    case red, orange, yellow, green, blue, indigo, violet\n}\n\nstruct SiteLogo {\n    var color: LogoColor\n}\n\n/// Called by the app to fetch this site's logo ✨\nfunc generateSiteLogo() -> SiteLogo {\n    return SiteLogo(color: .indigo)\n}";var r,i={methods:{execute:function(t){this.status="running",this.result="unknown",r.send(this.code)},printConsole:function(t){this.status="ready",this.playgroundOutput=t},constructSocket:function(){const t=this;(r=new WebSocket("ws://"+location.host+"/playground")).onopen=function(o){t.status="ready"},r.onmessage=function(o){var e=JSON.parse(o.data);e.hasOwnProperty("error")&&e.hasOwnProperty("text")?(t.printConsole(e.text+e.error),""!=e.error?t.result="error":t.result="success"):e.hasOwnProperty("logoColor")&&6==e.logoColor.length&&t.$emit("logo-color",e.logoColor)},r.onclose=function(o){t.status="disconnected",t.constructSocket()}},resetPlayground:function(){this.code=s},checkSwiftVersion:function(){this.$http.get("/playground/version").then(t=>{t.body.length<6&&(this.swiftVersion="Swift "+t.body)},t=>{})},toggleExplanation:function(t){this.showExplanation=!this.showExplanation}},components:{codemirror:e(21).codemirror},mounted:function(){this.constructSocket(),this.checkSwiftVersion()},data:()=>({playgroundOutput:"",code:s,swiftVersion:"",status:{type:String,validator:function(t){return-1!==["ready","running","disconnected"].indexOf(t)}},result:{type:String,validator:function(t){return-1!==["success","error","unknown"].indexOf(t)}},showExplanation:!1})},a=(e(20),e(0)),c=Object(a.a)(i,n,[],!1,null,null,null);c.options.__file="Frontend/Views/Playground.vue";o.default=c.exports}}]);