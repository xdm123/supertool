(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jdtc/jdtc"],{"0de3":function(t,e,n){"use strict";n.r(e);var r=n("1c7c"),c=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=c.a},"1c7c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a={data:function(){return{url:"/txapi/dialogue/index?key=",dataobj:""}},computed:u({},(0,r.mapState)(["requesturl","key"])),methods:{getdata:function(){var e=this;t.request({url:e.requesturl+e.url+e.key,success:function(t){console.log(t),e.dataobj=t.data.newslist[0],console.log(e.dataobj)}})},nextfn:function(){this.getdata()}},onLoad:function(){this.getdata()}};e.default=a}).call(this,n("543d")["default"])},"2c1b":function(t,e,n){"use strict";(function(t){n("5f52"),n("921b");r(n("66fd"));var e=r(n("fdd8"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"8f73":function(t,e,n){"use strict";var r=n("9ecf"),c=n.n(r);c.a},"9ecf":function(t,e,n){},fdd8:function(t,e,n){"use strict";n.r(e);var r=n("fe04"),c=n("0de3");for(var u in c)"default"!==u&&function(t){n.d(e,t,(function(){return c[t]}))}(u);n("8f73");var o,a=n("f0c5"),f=Object(a["a"])(c["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=f.exports},fe04:function(t,e,n){"use strict";var r,c=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}))}},[["2c1b","common/runtime","common/vendor"]]]);