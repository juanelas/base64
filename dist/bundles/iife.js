var base64=function(e){"use strict";return e.decode=function(e,r=!1){{let t=!1;if(/^[0-9a-zA-Z_-]+={0,2}$/.test(e))t=!0;else if(!/^[0-9a-zA-Z+/]*={0,2}$/.test(e))throw new Error("Not a valid base64 input");t&&(e=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=/g,""));const n=new Uint8Array(atob(e).split("").map((e=>e.charCodeAt(0))));return r?(new TextDecoder).decode(n):n}},e.encode=function(e,r=!1,t=!0){let n="";return n=(e=>{const r=[];for(let t=0;t<e.length;t+=32768)r.push(String.fromCharCode.apply(null,e.subarray(t,t+32768)));return btoa(r.join(""))})("string"==typeof e?(new TextEncoder).encode(e):new Uint8Array(e)),r&&(n=function(e){return e.replace(/\+/g,"-").replace(/\//g,"_")}(n)),t||(n=n.replace(/=/g,"")),n},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
