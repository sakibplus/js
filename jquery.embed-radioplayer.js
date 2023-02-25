
function EmbedRadioPlayer(container){var self=this;var baseUrl=new URL(document.querySelector('[src*="jquery.embed-radioplayer.js"]').getAttribute("src")).origin;var defClasses='embed-radioplayer js-radioplayerData';this.resizeTimer=null;this.scripts=['embed-radio-player.mini.js'];this.csss=['embed-radio-player.mini.css'];this.init=function(){container.setAttribute("data-host",baseUrl);self.loadStyles();self.getServer(function(servers){self.buildHtmlSkeleton(servers);self.loadSources();self.bindContResize();})}
this.loadStyles=function(){this.csss.forEach(function(item){EmbedScriptLoaderI.addStyle(item);});}
this.loadSources=function(){if(!this.scripts.length){this.refreshBoxText();return;}
EmbedScriptLoaderI.addScript(this.scripts.shift(),function(){self.loadSources();});}
this.getServer=function(callback){var ukey=container.getAttribute('data-rid')+container.getAttribute('data-stream');var cache=sessionStorage.getItem('servers'+ukey);if(cache){cache=JSON.parse(decodeURIComponent(escape(atob(cache))));callback(cache['servers']);return;}
$.ajax({'url':baseUrl+'/get-radio-stream','method':'post','data':{'rid':container.getAttribute('data-rid'),'rsu_id':container.getAttribute('data-stream')},'dataType':'json','xhrFields':{'withCredentials':true},}).done(function(resp){callback(resp['servers']);sessionStorage.setItem('servers'+ukey,btoa(unescape(encodeURIComponent(JSON.stringify(resp)))));});}
this.buildHtmlSkeleton=function(servers){var urlP=container.getAttribute('data-url');var name=container.getAttribute('data-name');var ext=container.getAttribute('data-logo');var server=btoa(container.getAttribute('data-stream'));var dt=container.getAttribute('data-dt');var autoplay=container.getAttribute('data-autoplay');var serverHTML='';for(i in servers){serverHTML+='<div class="server-row active" data-hash="'+(servers[i]['rsu_hash']?servers[i]['rsu_hash']:'')+'" data-dt="'+servers[i]['rsu_bandwidth']+'" data-source="'+btoa(servers[i]['rsu_url'])+'"></div>';if(servers[i]['subName']){name=servers[i]['rsu_name'];}}
let logo=baseUrl+'/public/uploads/radio_img/'+urlP+'/play_250_250.'+ext;if(ext.indexOf('http')>-1){logo=ext;}
var html='<div class="logo song-cover-cont">\
     <span>\
      <img title="'+name+'" alt="'+name+'" width="90" height="90" src="'+logo+'">\
     </span>\
     <div class="play-cont-app">\
      <i class="fa fa-play-circle-o" aria-hidden="true"></i>\
     </div>\
    </div>\
    <div class="controllerbox">\
     <div class="_actSongCont" data-act-url="'+urlP+'" data-act-radio="1">\
      <div class="radioName"><a target="_blank" href="'+baseUrl+'/'+urlP+'" title="'+name+'">'+name+'</a></div>\
      <div class="actSong"></div>\
     </div>\
     <div class="player play-page-footer">\
      <audio preload="none" controls data-autoplay="'+autoplay+'">\
       <source type="audio/mpeg">\
      </audio>\
      <div class="server-conts">\
       '+serverHTML+'\
       <div class="clear"></div>\
      </div>\
     </div>\
    </div>';if($(container).data('popup')){html+='<a href="'+$(container).data('host')+'/'+urlP+'" class="fake-popup js-popupPlayer" style="position: absolute; top: 0; left: 0;"></a>';}
container.innerHTML=html;if($(container).data('popup')){EmbedScriptLoaderI.addScript('https://myonlineradio.hu/public/js/jquery.embed-popup-player.js',function(){self.loadSources();});}}
this.bindContResize=function(){$(window).resize(function(){clearTimeout(self.resizeTimer);self.resizeTimer=setTimeout(function(){self.checkContSize();},100);});this.checkContSize();}
this.checkContSize=function(){var tmpClass=defClasses;if(container.offsetWidth<320){tmpClass+=' disable-time';}
if(container.offsetWidth<400){tmpClass+=' disable-bw';}
if(container.offsetWidth<260){tmpClass+=' disable-forward';}
container.className=tmpClass;}
this.refreshBoxText=function(){if(typeof(LangI)!="undefined"){$('.song-cover-cont img').attr('title',LangI.getText('click-and-hear-back')).attr('alt',LangI.getText('click-and-hear-back'));}}
this.init();}
$(document).ready(function(){var list=$('.embed-radioplayer');list.each(function(i,elem){if(!$(elem).attr('data-init')){$(elem).attr("data-init","1");new EmbedRadioPlayer(elem);}});});function isMobile(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){return true;}else{return false;}}