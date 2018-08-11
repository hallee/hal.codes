(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{31:function(t,n,e){"use strict";e.r(n);var o=e(42),r=e(34);for(var s in r)"default"!==s&&function(t){e.d(n,t,function(){return r[t]})}(s);e(40);var i=e(0),a=Object(i.a)(r.default,o.a,o.b,!1,null,null,null);a.options.__file="Frontend/Views/Playground.vue",n.default=a.exports},34:function(t,n,e){"use strict";e.r(n);var o=e(35),r=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,function(){return o[t]})}(s);n.default=r.a},35:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,r=e(39),s="enum LogoColor {\n    case red, orange, yellow, green, blue, indigo, violet\n}\n\n/// Called by the app to color this site's logo ✨\nfunc siteLogoColor() -> LogoColor {\n    return .indigo\n}";n.default={components:{codemirror:r.codemirror},data:function(){return{playgroundOutput:"",code:s,swiftVersion:"",status:{type:String,validator:function(t){return-1!==["ready","running","disconnected"].indexOf(t)}},result:{type:String,validator:function(t){return-1!==["success","error","unknown"].indexOf(t)}},showExplanation:!1}},mounted:function(){this.constructSocket(),this.checkSwiftVersion()},methods:{execute:function(){this.status="running",this.result="unknown",o.send(this.code)},printConsole:function(t){this.status="ready",this.playgroundOutput=t},constructSocket:function(){var t=this;(o=new WebSocket("ws://"+location.host+"/playground")).onopen=function(){t.status="ready"},o.onmessage=function(n){var e=JSON.parse(n.data);e.hasOwnProperty("error")&&e.hasOwnProperty("text")?(t.printConsole(e.text+e.error),""!=e.error?t.result="error":t.result="success"):e.hasOwnProperty("logoColor")&&6==e.logoColor.length&&t.$emit("logo-color",e.logoColor)},o.onclose=function(){t.status="disconnected",setTimeout(function(){t.constructSocket()},1e3)}},resetPlayground:function(){this.code=s},checkSwiftVersion:function(){var t=this;this.$http.get("/playground/version").then(function(n){n.body.length<6&&(t.swiftVersion="Swift "+n.body)})},toggleExplanation:function(){this.showExplanation=!this.showExplanation}}}},36:function(t,n,e){},40:function(t,n,e){"use strict";var o=e(36);e.n(o).a},42:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("transition",{attrs:{name:"fade"}},[e("div",{attrs:{id:"playground"}},[e("div",{staticClass:"run-bar"},[e("button",{staticClass:"roundrect-button run-button",attrs:{title:"Run Playground",disabled:"ready"!=t.status},on:{"&click":function(n){return t.execute(n)}}},[e("img",{attrs:{src:"/images/run.svg",height:"24px",width:"24px"}})]),t._v(" "),e("div",{staticClass:"run-result"},[e("transition",{attrs:{name:"slide-right"}},["success"==t.result?e("img",{key:"success-icon",attrs:{src:"/images/success.svg",height:"32px",width:"32px"}}):t._e(),t._v(" "),"error"==t.result?e("img",{key:"error-icon",attrs:{src:"/images/fail.svg",height:"32px",width:"32px"}}):t._e()])],1),t._v(" "),e("div",{staticClass:"spacer"}),t._v(" "),e("p",{staticClass:"version"},[e("a",{attrs:{href:"https://swift.org/blog/swift-4-1-released/"}},[t._v(t._s(t.swiftVersion))])]),t._v(" "),e("button",{staticClass:"reset-button",attrs:{title:"Reset to original code"},on:{"&click":function(n){return t.resetPlayground(n)}}},[e("img",{attrs:{src:"/images/reset.svg",height:"24px",width:"24px"}})])]),t._v(" "),e("codemirror",{model:{value:t.code,callback:function(n){t.code=n},expression:"code"}}),t._v(" "),e("div",{staticClass:"console"},[e("p",[e("pre",[t._v(t._s(t.playgroundOutput))])])]),t._v(" "),e("div",{staticClass:"explanation"},[e("p",[e("a",{on:{"&click":function(n){return t.toggleExplanation(n)}}},[e("i",[t._v("What's this?")])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[1==t.showExplanation?e("span",[t._v(" A community "),e("a",{attrs:{href:"https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html"}},[t._v("Swift")]),t._v(" environment. Poke around and get a taste of my favorite programming language right here in your browser. "),e("br"),t._v("Changes made to the site's logo will be visible to everyone!")]):t._e()])],1)])],1)])},r=[];o._withStripped=!0,e.d(n,"a",function(){return o}),e.d(n,"b",function(){return r})}}]);