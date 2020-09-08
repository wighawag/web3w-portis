var __awaiter=this&&this.__awaiter||function(t,i,o,e){return new(o||(o=Promise))(function(n,r){function s(t){try{c(e.next(t))}catch(t){r(t)}}function a(t){try{c(e.throw(t))}catch(t){r(t)}}function c(t){var i;t.done?n(t.value):(i=t.value,i instanceof o?i:new o(function(t){t(i)})).then(s,a)}c((e=e.apply(t,i||[])).next())})};define("index",["require","exports","named-logs"],function(t,i,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.PortisModuleLoader=void 0;const e=o.logs("web3w-portis:index");let n;const r={1:"mainnet",3:"ropsten",4:"rinkeby",5:"goerli",8:"ubiq",18:"thundercoreTestnet",42:"kovan",61:"classic",77:"sokol",99:"core",100:"xdai",108:"thundercore",163:"lightstreams"};class s{constructor(t,i){this.id="portis",this.dappId=t,this.forceFallbackUrl=i&&i.forceFallbackUrl,this.fallbackUrl=i&&i.fallbackUrl,this.chainId=i&&i.chainId,this.config=i}setup(t){return __awaiter(this,void 0,void 0,function*(){t=t||{};let{chainId:i,fallbackUrl:o}=t;if(i=i||this.chainId,(o=o||this.fallbackUrl)&&!i){const t=yield fetch(o,{headers:{"content-type":"application/json; charset=UTF-8"},body:JSON.stringify({id:Math.floor(1e6*Math.random()),jsonrpc:"2.0",method:"eth_chainId",params:[]}),method:"POST"}),e=yield t.json();i=parseInt(e.result.slice(2),16).toString()}if(!i)throw new Error("chainId missing");const s=r[i];let a;s&&!this.forceFallbackUrl&&(a=s);const c=parseInt(i);if(!a&&o&&(a={nodeUrl:o,chainId:c},e.log("PORTIS with "+a.nodeUrl+" "+i)),!a)throw new Error(`chain (${i}) not supported by portis`);return this.portis=new n(this.dappId,a,this.config),window.portis=this.portis,this.portis.onError(t=>{e.error("PORTIS ERROR:"),e.error(t)}),this.portis.onActiveWalletChanged(t=>{e.log("PORTIS address: "+t)}),this.portis.onLogout(()=>{e.log("PORTIS logout ")}),this.portis.onLogin((t,i,o)=>{e.log("PORTIS login: "+t+","+i)}),{web3Provider:this.portis.provider,chainId:i}})}logout(){return this.portis.logout()}isLoggedIn(){return this.portis.isLoggedIn()}onAccountsChanged(t){this.portis.onActiveWalletChanged(i=>{t([i])})}}i.PortisModuleLoader=class{constructor(t,i){this.id="portis",this.dappId=t,this.jsURL=i&&i.jsURL||"https://cdn.jsdelivr.net/npm/@portis/web3@2.0.0-beta.2.0.0-beta.49/umd/index.js",this.jsURLIntegrity=i&&i.jsURLIntegrity||"sha256-eVldFSMA1ifYTEJo1QXYPK7v+V+CNCEP4Xsp5/aAVQ8=",this.moduleConfig=i}load(){return __awaiter(this,void 0,void 0,function*(){if(!n){const t=this.jsURL,i=this.jsURLIntegrity;yield function(t,i,o){return new Promise(function(e,n){const r=document.createElement("script");r.type="text/javascript",r.src=t,i&&(r.integrity=i),o&&(r.crossOrigin=o),r.onload=r.onreadystatechange=function(){e()},r.onerror=function(){n()},document.head.appendChild(r)})}(t,i,"anonymous"),n=window.require("@portis/web3").default}return new s(this.dappId,this.moduleConfig)})}}});