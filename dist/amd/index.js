var __awaiter=this&&this.__awaiter||function(t,i,o,n){return new(o||(o=Promise))(function(e,r){function s(t){try{c(n.next(t))}catch(t){r(t)}}function a(t){try{c(n.throw(t))}catch(t){r(t)}}function c(t){var i;t.done?e(t.value):(i=t.value,i instanceof o?i:new o(function(t){t(i)})).then(s,a)}c((n=n.apply(t,i||[])).next())})};define("index",["require","exports","named-logs"],function(t,i,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.PortisModuleLoader=void 0;const n=o.logs("web3w-portis:index");let e;const r={1:"mainnet",3:"ropsten",4:"rinkeby",5:"goerli",8:"ubiq",18:"thundercoreTestnet",42:"kovan",61:"classic",77:"sokol",99:"core",100:"xdai",108:"thundercore",163:"lightstreams"};class s{constructor(t,i){this.id="portis",this.dappId=t,this.forceFallbackUrl=i&&i.forceFallbackUrl,this.fallbackUrl=i&&i.fallbackUrl,this.chainId=i&&i.chainId,this.config=i}setup(t){return __awaiter(this,void 0,void 0,function*(){t=t||{};let{chainId:i,fallbackUrl:o}=t;if(i=i||this.chainId,(o=o||this.fallbackUrl)&&!i){const t=yield fetch(o,{headers:{"content-type":"application/json; charset=UTF-8"},body:JSON.stringify({id:Math.floor(1e6*Math.random()),jsonrpc:"2.0",method:"eth_chainId",params:[]}),method:"POST"}),n=yield t.json();i=parseInt(n.result.slice(2),16).toString()}if(!i)throw new Error("chainId missing");const s=r[i];let a;s&&!this.forceFallbackUrl&&(a=s);const c=parseInt(i);if(!a&&o&&(a={nodeUrl:o,chainId:c},n.log("PORTIS with "+a.nodeUrl+" "+i)),!a)throw new Error(`chain (${i}) not supported by portis`);return this.portis=new e(this.dappId,a,this.config),window.portis=this.portis,this.portis.onError(t=>{n.error("PORTIS ERROR:"),n.error(t)}),this.portis.onActiveWalletChanged(t=>{n.log("PORTIS address: "+t)}),this.portis.onLogout(()=>{n.log("PORTIS logout ")}),this.portis.onLogin((t,i,o)=>{n.log("PORTIS login: "+t+","+i+","+o)}),{web3Provider:this.portis.provider,chainId:i}})}disconnect(){return __awaiter(this,void 0,void 0,function*(){return this.portis.logout()})}isLoggedIn(){return this.portis.isLoggedIn()}onAccountsChanged(t){this.portis.onActiveWalletChanged(i=>{t([i])})}}i.PortisModuleLoader=class{constructor(t,i){this.id="portis",this.dappId=t,i&&i.jsURL?(this.jsURL=i.jsURL,this.jsURLIntegrity=i.jsURLIntegrity):(this.jsURL="https://cdn.jsdelivr.net/npm/@portis/web3@2.0.0-beta.56/umd/index.js",this.jsURLIntegrity="sha256-YglsZuKbHpe2+U4HYCd3juAiADRTU7Ys2AGfCGY+Nmo=="),this.moduleConfig=i}load(){return __awaiter(this,void 0,void 0,function*(){if(!e){const t=this.jsURL,i=this.jsURLIntegrity;yield function(t,i,o){return new Promise(function(n,e){const r=document.createElement("script");r.type="text/javascript",r.src=t,i&&(r.integrity=i),o&&(r.crossOrigin=o),r.onload=r.onreadystatechange=function(){n()},r.onerror=function(){e()},document.head.appendChild(r)})}(t,i,"anonymous"),e=window.Portis}return new s(this.dappId,this.moduleConfig)})}}});