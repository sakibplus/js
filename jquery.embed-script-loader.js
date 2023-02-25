
function EmbedScriptLoader(){var self=this;var currentScripts=document.querySelectorAll('[src*="jquery.embed-script-loader.js"]');var baseUrl=new URL(currentScripts[0].getAttribute("src")).origin;this.scripts=[];this.csss=[];var jsVPath='js';this.init=function(){this.setJsVPath();this.pushDeafultScripts();this.openGate(function(){self.loadSources();});}
this.setJsVPath=function(){var scriptTag=document.querySelector("script[src*='jsv']");if(!scriptTag){return;}
var src=scriptTag.getAttribute('src');if(!src){return;}
var matches=src.match(/\/(jsv\d*)\//);if(matches[1]){jsVPath=matches[1];}}
this.pushDeafultScripts=function(){currentScripts.forEach(function(script){var tmp=script.getAttribute('data-script');if(self.scripts.indexOf(tmp)==-1){self.scripts.push(tmp);}});}
this.loadStyles=function(){var max=this.csss.length;for(var i=0;i<max;i++){this.addStyle(self.csss.shift());}}
this.loadSources=function(){if(!self.scripts.length){return;}
if(!window.jQuery){this.addScript("https://code.jquery.com/jquery-3.3.1.min.js",function(){self.loadSources();});}else{if($!==jQuery){$=jQuery.noConflict();}
this.addScript(self.scripts.shift(),function(){self.loadSources();});}}
this.openGate=function(callback){var s=document.createElement('iframe');src=baseUrl+'/tracking-ext-user',s.setAttribute('src',src);s.style.display="none";s.onload=callback;document.body.appendChild(s);}
this.addStyle=function(src){src=(src.indexOf('//')==-1?baseUrl+'/public/'+jsVPath.replace('js','css')+'/'+src:src);if(document.querySelectorAll("[href*='"+src+"']").length){return;}
var s=document.createElement('link');s.setAttribute('href',src);s.setAttribute('rel','stylesheet');s.setAttribute('type','text/css');document.body.appendChild(s);}
this.addScript=function(src,callback){src=(src.indexOf('//')==-1?baseUrl+'/public/'+jsVPath+'/'+src:src);if(document.querySelectorAll("[src*='"+src+"']").length){if(callback){callback();}
return;}
var s=document.createElement('script');if(callback){s.onload=callback;}
s.setAttribute('async','async');s.setAttribute('src',src);document.body.appendChild(s);}
this.checksum=function(s){var hash=0,strlen=s.length,i,c;if(strlen===0){return hash;}
for(i=0;i<strlen;i++){c=s.charCodeAt(i);hash=((hash<<5)-hash)+c;hash=hash&hash;}
return hash;};this.init();}
var scriptLoader=function(){if(typeof(EmbedScriptLoaderI)=="undefined"){EmbedScriptLoaderI=new EmbedScriptLoader();}}
if(window.addEventListener){window.addEventListener('load',scriptLoader,false);}else if(window.attachEvent){window.attachEvent('onload',scriptLoader);}
function isMobile(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){return true;}else{return false;}}