!function(){const e=Symbol("Comlink.proxy"),t=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),r=Symbol("Comlink.thrown"),a=e=>"object"==typeof e&&null!==e||"function"==typeof e,o=new Map([["proxy",{canHandle:t=>a(t)&&t[e],serialize:function(e){const{port1:t,port2:n}=new MessageChannel;return s(e,t),[n,[n]]},deserialize:function(e){return e.start(),c(e,[],t);var t}}],["throw",{canHandle:e=>a(e)&&r in e,serialize:function({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize:function(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function s(t,n=self){n.addEventListener("message",(function a(o){if(!o||!o.data)return;const{id:l,type:c,path:u}=Object.assign({path:[]},o.data),g=(o.data.argumentList||[]).map(h);let d;try{const n=u.slice(0,-1).reduce(((e,t)=>e[t]),t),r=u.reduce(((e,t)=>e[t]),t);switch(c){case"GET":d=r;break;case"SET":n[u.slice(-1)[0]]=h(o.data.value),d=!0;break;case"APPLY":d=r.apply(n,g);break;case"CONSTRUCT":d=function(t){return Object.assign(t,{[e]:!0})}(new r(...g));break;case"ENDPOINT":{const{port1:e,port2:n}=new MessageChannel;s(t,n),d=function(e,t){return f.set(e,t),e}(e,[e])}break;case"RELEASE":d=void 0;break;default:return}}catch(e){d={value:e,[r]:0}}Promise.resolve(d).catch((e=>({value:e,[r]:0}))).then((e=>{const[t,r]=p(e);n.postMessage(Object.assign(Object.assign({},t),{id:l}),r),"RELEASE"===c&&(n.removeEventListener("message",a),i(n))}))})),n.start&&n.start()}function i(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function l(e){if(e)throw new Error("Proxy has been released and is not useable")}function c(e,r=[],a=function(){}){let o=!1;const s=new Proxy(a,{get:function(t,a){if(l(o),a===n)return()=>g(e,{type:"RELEASE",path:r.map((e=>e.toString()))}).then((()=>{i(e),o=!0}));if("then"===a){if(0===r.length)return{then:()=>s};const t=g(e,{type:"GET",path:r.map((e=>e.toString()))}).then(h);return t.then.bind(t)}return c(e,[...r,a])},set:function(t,n,a){l(o);const[s,i]=p(a);return g(e,{type:"SET",path:[...r,n].map((e=>e.toString())),value:s},i).then(h)},apply:function(n,a,s){l(o);const i=r[r.length-1];if(i===t)return g(e,{type:"ENDPOINT"}).then(h);if("bind"===i)return c(e,r.slice(0,-1));const[f,p]=u(s);return g(e,{type:"APPLY",path:r.map((e=>e.toString())),argumentList:f},p).then(h)},construct:function(t,n){l(o);const[a,s]=u(n);return g(e,{type:"CONSTRUCT",path:r.map((e=>e.toString())),argumentList:a},s).then(h)}});return s}function u(e){const t=e.map(p);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const f=new WeakMap;function p(e){for(const[t,n]of o)if(n.canHandle(e)){const[r,a]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},a]}return[{type:"RAW",value:e},f.get(e)||[]]}function h(e){switch(e.type){case"HANDLER":return o.get(e.name).deserialize(e.value);case"RAW":return e.value}}function g(e,t,n){return new Promise((r=>{const a=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===a&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:a},t),n)}))}const d=(e,t=1)=>{const n=[['"',"'"],["':","!"],[",'","~"],["}",")","\\","\\"],["{","(","\\","\\"]],r=(e,t)=>{let n=new RegExp(`${(t[2]?t[2]:"")+t[0]}|${(t[3]?t[3]:"")+t[1]}`,"g");return e.replace(n,(e=>e===t[0]?t[1]:t[0]))};if(t)for(let t=0;t<n.length;++t)e=r(e,n[t]);else for(let t=n.length;t--;)e=r(e,n[t]);return e};s({crush:(e,t=50)=>{let n=[];const r="-_.!~*'()";for(let e=127;--e;)(e>=48&&e<=57||e>=65&&e<=90||e>=97&&e<=122||r.includes(String.fromCharCode(e)))&&n.push(String.fromCharCode(e));for(let e=32;e<255;++e){let t=String.fromCharCode(e);"\\"==t||n.includes(t)||n.unshift(t)}e=e.replace(new RegExp("","g"),"");const a=((e,n)=>{let r=n.length,a="";const o=e=>encodeURI(encodeURIComponent(e)).replace(/%../g,"i").length,s=e=>{let t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t>=56320&&t<=57343||n>=55296&&n<=56319};let i={};for(let n=2;n<t;n++)for(let t=0;t<e.length-n;++t){let r=e.substr(t,n);if(i[r])continue;if(s(r))continue;let a=1;for(let o=e.indexOf(r,t+n);o>=0;++a)o=e.indexOf(r,o+n);a>1&&(i[r]=a)}for(;;){for(;r--&&e.includes(n[r]););if(r<0)break;let t,s=n[r],l=0,c=o(s);for(let e in i){let n=i[e],r=(n-1)*o(e)-(n+1)*c;a.length||(r-=o("")),r<=0?delete i[e]:r>l&&(t=e,l=r)}if(!t)break;e=e.split(t).join(s)+s+t,a=s+a;let u={};for(let n in i){let r=n.split(t).join(s),a=0;for(let t=e.indexOf(r);t>=0;++a)t=e.indexOf(r,t+r.length);a>1&&(u[r]=a)}i=u}return{a:e,b:a}})(e=d(e),n);let o=a.a;return a.b.length&&(o+=""+a.b),o+="_",encodeURIComponent(o)},uncrush:e=>{const t=(e=e.substring(0,e.length-1)).split("");let n=t[0];if(t.length>1){let e=t[1];for(let t of e){let e=n.split(t);n=e.join(e.pop())}}return d(n,0)}})}();
//# sourceMappingURL=worker.fe49f137.js.map
