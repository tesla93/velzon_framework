(()=>{"use strict";var e,v={},_={};function r(e){var n=_[e];if(void 0!==n)return n.exports;var t=_[e]={id:e,loaded:!1,exports:{}};return v[e].call(t.exports,t,t.exports,r),t.loaded=!0,t.exports}r.m=v,r.amdO={},e=[],r.O=(n,t,f,i)=>{if(!t){var a=1/0;for(o=0;o<e.length;o++){for(var[t,f,i]=e[o],s=!0,d=0;d<t.length;d++)(!1&i||a>=i)&&Object.keys(r.O).every(p=>r.O[p](t[d]))?t.splice(d--,1):(s=!1,i<a&&(a=i));if(s){e.splice(o--,1);var l=f();void 0!==l&&(n=l)}}return n}i=i||0;for(var o=e.length;o>0&&e[o-1][2]>i;o--)e[o]=e[o-1];e[o]=[t,f,i]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},(()=>{var n,e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__;r.t=function(t,f){if(1&f&&(t=this(t)),8&f||"object"==typeof t&&t&&(4&f&&t.__esModule||16&f&&"function"==typeof t.then))return t;var i=Object.create(null);r.r(i);var o={};n=n||[null,e({}),e([]),e(e)];for(var a=2&f&&t;"object"==typeof a&&!~n.indexOf(a);a=e(a))Object.getOwnPropertyNames(a).forEach(s=>o[s]=()=>t[s]);return o.default=()=>t,r.d(i,o),i}})(),r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((n,t)=>(r.f[t](e,n),n),[])),r.u=e=>e+"."+{47:"d3e2c780fe48dfe6",62:"2e6f49b9ae879bcc",80:"bdfa1d714e5adda2",98:"264979b033294756",126:"1e35e94d3a673bc0",256:"e1f34fbfe2bff3f5",456:"57a0ada2dcd5a18f",484:"ae1c776b45664979",603:"d564da88bf387ab1",620:"6cbd37cc5f5071f8",779:"cd4594cacbff6c8e",855:"b044a6d16764d538",871:"e3acde508f538976",896:"ed9ab616b3c510c5",938:"c25d2b52c0dfd681"}[e]+".js",r.miniCssF=e=>{},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={},n="velzon_framework:";r.l=(t,f,i,o)=>{if(e[t])e[t].push(f);else{var a,s;if(void 0!==i)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var c=d[l];if(c.getAttribute("src")==t||c.getAttribute("data-webpack")==n+i){a=c;break}}a||(s=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",n+i),a.src=r.tu(t)),e[t]=[f];var u=(g,p)=>{a.onerror=a.onload=null,clearTimeout(b);var h=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),h&&h.forEach(m=>m(p)),g)return g(p)},b=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),s&&document.head.appendChild(a)}}})(),r.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;r.tt=()=>(void 0===e&&(e={createScriptURL:n=>n},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),r.tu=e=>r.tt().createScriptURL(e),r.p="",(()=>{var e={666:0};r.f.j=(f,i)=>{var o=r.o(e,f)?e[f]:void 0;if(0!==o)if(o)i.push(o[2]);else if(666!=f){var a=new Promise((c,u)=>o=e[f]=[c,u]);i.push(o[2]=a);var s=r.p+r.u(f),d=new Error;r.l(s,c=>{if(r.o(e,f)&&(0!==(o=e[f])&&(e[f]=void 0),o)){var u=c&&("load"===c.type?"missing":c.type),b=c&&c.target&&c.target.src;d.message="Loading chunk "+f+" failed.\n("+u+": "+b+")",d.name="ChunkLoadError",d.type=u,d.request=b,o[1](d)}},"chunk-"+f,f)}else e[f]=0},r.O.j=f=>0===e[f];var n=(f,i)=>{var d,l,[o,a,s]=i,c=0;if(o.some(b=>0!==e[b])){for(d in a)r.o(a,d)&&(r.m[d]=a[d]);if(s)var u=s(r)}for(f&&f(i);c<o.length;c++)r.o(e,l=o[c])&&e[l]&&e[l][0](),e[l]=0;return r.O(u)},t=self.webpackChunkvelzon_framework=self.webpackChunkvelzon_framework||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})()})();