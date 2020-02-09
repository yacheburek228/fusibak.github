if (self.CavalryLogger) { CavalryLogger.start_js(["SkivO"]); }

__d("PixelRatioConst",[],(function(a,b,c,d,e,f){e.exports={cookieName:"dpr"}}),null);
__d("XConsentCookieController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/cookie/consent/",{})}),null);
__d("DeferredCookie",["requireCond","Cookie","CookieConsent","cr:1109759","SubscriptionList","cr:1083116","XConsentCookieController","cr:1069930","promiseDone","cr:1083117"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g,h=new Map();a={shouldAddDefaultListener:!0,defaultHandler:null,sentConsentToServer:!1,callbacks:new(b("SubscriptionList"))(),addToQueue:function(a,c,d,e,f,i,j){if(!(g||(g=b("CookieConsent"))).isDeferCookies()){f?b("Cookie").setWithoutChecksIfFirstPartyContext(a,c,d,e,j):b("Cookie").setWithoutChecks(a,c,d,e,j);return}if(h.has(a))return;h.set(a,{name:a,value:c,nMilliSecs:d,path:e,firstPartyOnly:f,secure:j});i&&this.addDefaultInteractionListener()},flushAllCookiesWithoutRequestingConsentSeePrivacyXFNBeforeUsing:function(){h.forEach(function(a,c){a.firstPartyOnly?b("Cookie").setWithoutChecksIfFirstPartyContext(a.name,a.value,a.nMilliSecs,a.path,a.secure):b("Cookie").setWithoutChecks(a.name,a.value,a.nMilliSecs,a.path,a.secure)}),(g||(g=b("CookieConsent"))).setConsented(),this.callbacks.fireCallbacks(),h=new Map(),this.removeDefaultInteractionListener()},flushAllCookies:function(){this.flushAllCookiesWithoutRequestingConsentSeePrivacyXFNBeforeUsing();if(!this.sentConsentToServer){var a=b("XConsentCookieController").getURIBuilder().getURI();this.sentConsentToServer=!0;b("cr:1069930")!=null?b("promiseDone")(b("cr:1069930")(a.toString(),{data:{},method:"POST"}),null,function(a){b("cr:1083117")&&b("cr:1083117")("Cookie consent has not been set successfully: "+a.errorMsg,"comet_infra")}):b("cr:1083116")!=null&&new(b("cr:1083116"))(a).send()}},removeDefaultInteractionListener:function(){this.shouldAddDefaultListener=!1,this.defaultHandler&&(window.removeEventListener?window.removeEventListener("click",this.defaultHandler,!0):document.detachEvent&&document.detachEvent("onclick",this.defaultHandler),this.defaultHandler=null)},addDefaultInteractionListener:function(a){this.shouldAddDefaultListener&&(this.shouldAddDefaultListener=!1,this.defaultHandler=a!=null?a:this.baseInteractionHandler.bind(this),window.addEventListener?window.addEventListener("click",this.defaultHandler,!0):document.attachEvent&&document.attachEvent("onclick",this.defaultHandler))},registerCallbackOnCookieFlush:function(a){!(g||(g=b("CookieConsent"))).isDeferCookies()?a():this.callbacks.add(a)},baseInteractionHandler:function(a){var c=a.target;if(!(c instanceof HTMLElement))return;if(a instanceof MouseEvent&&!this.isValidClick(a))return;b("cr:1109759")!=null&&!b("cr:1109759").isBlacklisted(c)&&this.flushAllCookies()},isValidClick:function(a){return a.which===void 0?!0:a.which==1},canEmbedThirdPartyPixel:function(){return(g||(g=b("CookieConsent"))).isCookiesBlocked()||(g||(g=b("CookieConsent"))).isDeferCookies()?!1:h.size===0}};e.exports=a}),null);
__d("XRefererFrameController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/common/referer_frame.php",{})}),null);
__d("ControlledReferer",["Bootloader","DeferredCookie","URI","XRefererFrameController","isMessengerDotComURI","isOculusDotComURI","isWorkplaceDotComURI","lowerFacebookDomain"],(function(a,b,c,d,e,f){__p&&__p();var g,h={useFacebookReferer:function(a,c,d){__p&&__p();if(!b("DeferredCookie").canEmbedThirdPartyPixel()){b("Bootloader").loadModules(["BanzaiODS"],function(a){a.bumpEntityKey(2966,"defer_cookies","block_controlled_referer_iframe")},"ControlledReferer");return}var e=!1;function f(){if(e)return;var b=a.contentWindow.location.pathname;if(b!=="/intern/common/referer_frame.php"&&b!=="/common/referer_frame.php")return;e=!0;a.contentWindow.document.body.style.margin=0;c()}var h;b("isMessengerDotComURI")((g||(g=b("URI"))).getRequestURI())?h=b("XRefererFrameController").getURIBuilder().getURI().toString():b("isOculusDotComURI")((g||(g=b("URI"))).getRequestURI())?h="/common/referer_frame.php":!b("lowerFacebookDomain").isValidDocumentDomain()?h="/intern/common/referer_frame.php":h=b("XRefererFrameController").getURIBuilder().getURI().toString();d==null&&b("isWorkplaceDotComURI")((g||(g=b("URI"))).getRequestURI())&&(d="workplace");d&&(h+="?fb_source="+d);a.onload=f;a.src=h},useFacebookRefererHtml:function(a,b,c){h.useFacebookReferer(a,function(){a.contentWindow.document.body.innerHTML=b},c)}};e.exports=h}),null);
__d("TrackingPixel",["Arbiter","ControlledReferer","DeferredCookie","FBLogger"],(function(a,b,c,d,e,f){__p&&__p();var g={_iframe:void 0,setIFrame:function(a){g._iframe=a},loadWithNoReferrer:function(a){__p&&__p();if(!b("DeferredCookie").canEmbedThirdPartyPixel()){b("FBLogger")("tracking_pixel").mustfix("Attempting to load a TrackingPixel (%s) while cookies are deferred. This is not allowed because tracking pixels sometimes set cookies.",a);return}if(!g._iframe){var c=document.createElement("iframe");c.frameBorder="0";c.width=c.height="1";c.style.position="absolute";c.style.top="-10px";b("ControlledReferer").useFacebookReferer(c,function(){b("Arbiter").inform("TrackingPixel/iframeIsLoaded",null,"persistent")});document.body!=null&&document.body.appendChild(c);g._iframe=c}b("Arbiter").subscribe("TrackingPixel/iframeIsLoaded",function(){if(g._iframe!=void 0){var b=g._iframe.contentWindow;b=new b.Image();b.src=a}})}};e.exports=g}),null);
__d("DesktopHscrollUnitEventConstants",[],(function(a,b,c,d,e,f){e.exports={HSCROLL_ITEM_INSERTED_EVENT:"DesktopHScrollUnit/itemInserted",HSCROLL_ITEM_SHOWN_EVENT:"DesktopHScrollUnit/itemShown",HSCROLL_ITEM_HIDE_EVENT:"DesktopHScrollUnit/HideIndividualItem",HSCROLL_ITEM_SCROLL_BEFORE_XOUT_EVENT:"DesktopHScrollUnit/scrollItemBeforeXout",HSCROLL_ITEM_UNHIDE_EVENT:"DesktopHScrollUnit/unhideIndividualItem",HSCROLL_LAST_ITEM_NFX_ACTION_TAKEN:"logLastAdXout",HSCROLL_PAGER_ITEM_HIDE_EVENT:"onXoutIndividualItem"}}),null);
__d("EntstreamFeedObject",["csx","CSS","Parent"],(function(a,b,c,d,e,f,g){var h={getRoot:function(a){return b("Parent").bySelector(a,"._5jmm")},getHscrollOuterRootIfAvailable:function(a){a=a;b("CSS").matchesSelector(a,"._170y")&&(a=h.getRoot(a.parentNode));return a}};e.exports=h}),null);
__d("legacy:onload-action",["PageHooks"],(function(a,b,c,d,e,f){a._domreadyHook=(c=b("PageHooks"))._domreadyHook;a._onloadHook=c._onloadHook;a.runHook=c.runHook;a.runHooks=c.runHooks;a.keep_window_set_as_loaded=c.keepWindowSetAsLoaded}),3);
__d("LitestandMessages",[],(function(a,b,c,d,e,f){a=Object.freeze({NEWSFEED_LOAD:"LitestandMessages/NewsFeedLoad",LEAVE_HOME:"LitestandMessages/LeaveHome",STORIES_REQUESTED:"LitestandMessages/StoriesRequested",STORIES_INSERTED:"LitestandMessages/StoriesInserted",NEWER_STORIES_REQUESTED:"LitestandMessages/NewerStoriesRequested",NEWER_STORIES_INSERTED:"LitestandMessages/NewerStoriesInserted",NEW_STORIES_CONTAINER_CREATED:"LitestandMessages/NewStoriesContainer",RHC_RELOADED:"LitestandMessages/RHCReloaded",STREAM_LOAD_ERROR:"LitestandMessages/StreamLoadError",DUPLICATE_CURSOR_ERROR:"LitestandMessages/DuplicateCursorError",STREAM_LOAD_RETRY:"LitestandMessages/StreamLoadRetry"});e.exports=a}),null);
__d("Nectar",["Env","getContextualParent"],(function(a,b,c,d,e,f){__p&&__p();var g;function h(a){a.nctr||(a.nctr={})}function i(a){__p&&__p();if((g||(g=b("Env"))).module||!a)return(g||(g=b("Env"))).module;var c={fbpage_fan_confirm:!0,photos_snowlift:!0},d;while(a&&a.getAttribute){var e=a.getAttribute("id");if(e!=null&&e.startsWith("pagelet_"))return e;!d&&c[e]&&(d=e);a=b("getContextualParent")(a)}return d}a={addModuleData:function(a,b){b=i(b);b&&(h(a),a.nctr._mod=b)},addImpressionID:function(a){(g||(g=b("Env"))).impid&&(h(a),a.nctr._impid=(g||(g=b("Env"))).impid)}};e.exports=a}),null);
__d("AsyncRequestNectarLogging",["AsyncRequest","Nectar"],(function(a,b,c,d,e,f){Object.assign(b("AsyncRequest").prototype,{setNectarModuleData:function(a){this.method=="POST"&&b("Nectar").addModuleData(this.data,a)}})}),null);
__d("QueryString",[],(function(a,b,c,d,e,f){__p&&__p();function a(a){__p&&__p();var b=[];Object.keys(a).sort().forEach(function(c){var d=a[c];if(d===void 0)return;if(d===null){b.push(c);return}b.push(encodeURIComponent(c)+"="+encodeURIComponent(d))});return b.join("&")}function b(a,b){__p&&__p();b===void 0&&(b=!1);var c={};if(a==="")return c;a=a.split("&");for(var d=0;d<a.length;d++){var e=a[d].split("=",2),f=decodeURIComponent(e[0]);if(b&&Object.prototype.hasOwnProperty.call(c,f))throw new URIError("Duplicate key: "+f);c[f]=e.length===2?decodeURIComponent(e[1]):null}return c}function c(a,b){return a+(a.indexOf("?")!==-1?"&":"?")+(typeof b==="string"?b:g.encode(b))}var g={encode:a,decode:b,appendToUrl:c};e.exports=g}),null);
__d("isAdsExcelAddinURI",[],(function(a,b,c,d,e,f){var g=new RegExp("(^|\\.)fbaddins\\.com$","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.indexOf(a.getProtocol())!==-1&&g.test(a.getDomain())}e.exports=a}),null);
__d("isValidURI",[],(function(a,b,c,d,e,f){var g=new RegExp("((^|\\.)instagram\\.com$)|((^|\\.)wit\\.ai$)|((^|\\.)accountkit\\.com$)","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.includes(a.getProtocol())&&g.test(a.getDomain())}e.exports=a}),null);
__d("AsyncSignal",["Promise","ErrorGuard","QueryString","Run","TimeSlice","TrackingConfig","URI","ZeroRewrites","getAsyncParams","isAdsExcelAddinURI","isFacebookURI","isMessengerDotComURI","isValidURI","isWorkplaceDotComURI","memoize","promiseDone"],(function(a,b,c,d,e,f){__p&&__p();var g,h,i;function a(a,c){this.data=c||{},this.uri=a.toString(),b("TrackingConfig").domain&&this.uri.charAt(0)=="/"&&(this.uri=b("TrackingConfig").domain+this.uri)}a.prototype.setHandler=function(a){this.handler=a;return this};a.prototype.setTimeout=function(a){this.timeout=a;return this};a.prototype.send=function(){b("TimeSlice").guard(this._send.bind(this),"AsyncSignal send",{propagationType:b("TimeSlice").PropagationType.ORPHAN})()};a.prototype._send=function(){__p&&__p();var a=this.handler,c=this.data;c.asyncSignal=(Math.random()*1e4|0)+1;var d=b("ZeroRewrites").rewriteURI(new(g||(g=b("URI")))(this.uri));d=b("isFacebookURI")(d)||b("isMessengerDotComURI")(d)||b("isAdsExcelAddinURI")(d)||b("isWorkplaceDotComURI")(d)||b("isValidURI")(d);if(d)Object.assign(c,b("getAsyncParams")("POST"));else throw new Error("'"+this.uri+"' is an external URL, you should not send async signals to offsite links.");var e=b("QueryString").appendToUrl(this.uri,c);i||(i=new(b("Promise"))(function(a){b("Run").onAfterLoad(a)}));d=i.then(function(){return new(b("Promise"))(function(a,b){var c=new Image();c.onload=a;c.onerror=c.onabort=b;c.src=e})});if(a){var f=!1,j=b("memoize")(function(){(h||(h=b("ErrorGuard"))).applyWithGuard(a,null,[f])});b("promiseDone")(d.then(function(){f=!0,j()},j));this.timeout&&setTimeout(j,this.timeout)}return this};e.exports=a}),null);
__d("DialogHideOnSuccess",["csx","CSS"],(function(a,b,c,d,e,f,g){__p&&__p();a=function(){"use strict";__p&&__p();function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscription=this._layer.subscribe("success",this._handle.bind(this))};c.disable=function(){this._subscription.unsubscribe(),this._subscription=null};c._handle=function(a,c){b("CSS").matchesSelector(c.getTarget(),"._s")&&this._layer.hide()};return a}();Object.assign(a.prototype,{_subscription:null});e.exports=a}),null);
__d("Ease",[],(function(a,b,c,d,e,f){__p&&__p();var g={makePowerOut:function(a){var b=g.makePowerIn(a);return function(a){return 1-b(1-a)}},makePowerIn:function(a){return function(b){b=Math.pow(b,a);return(b*1e4|0)/1e4}},makePowerInOut:function(a){var b=g.makePowerIn(a),c=g.makePowerOut(a);return function(a){return a<.5?.5*b(a*2):.5*c(a*2-1)+.5}},expoOut:function(a){return 1-Math.pow(2,-10*a)},expoIn:function(a){return 1-g.expoOut(1-a)},expoInOut:function(a){return a<.5?.5*g.expoIn(a*2):.5*g.expoOut(a*2-1)+.5},sineOut:function(a){return Math.sin(a*Math.PI*.5)},sineIn:function(a){return 1-Math.cos(a*Math.PI*.5)},sineInOut:function(a){return-.5*(Math.cos(Math.PI*a)-1)},circOut:function(a){a--;return Math.sqrt(1-a*a)},circIn:function(a){return 1-g.circOut(1-a)},circInOut:function(a){return a<.5?.5*g.circIn(a*2):.5*g.circOut(a*2-1)+.5},bounceOut:function(a){if(a<1/2.75)return 7.5625*a*a;else if(a<2/2.75)return 7.5625*(a-=1.5/2.75)*a+.75;else if(a<2.5/2.75)return 7.5625*(a-=2.25/2.75)*a+.9375;else return 7.5625*(a-=2.625/2.75)*a+.984375},bounceIn:function(a){return 1-g.bounceOut(1-a)},bounceInOut:function(a){return a<.5?.5*g.bounceIn(a*2):.5*g.bounceOut(a*2-1)+.5},makeBounceOut:function(a){a=a||1;return function(b){b=(1-Math.cos(b*Math.PI*a))*(1-b)+b;return 1-Math.abs(1-b)}},makeBounceIn:function(a){var b=g.makeBounceOut(a);return function(a){return 1-b(1-a)}},makeElasticOut:function(a,b){a<1&&(a=1);var c=Math.PI*2;return function(d){if(d===0||d===1)return d;var e=b/c*Math.asin(1/a);return a*Math.pow(2,-10*d)*Math.sin((d-e)*c/b)+1}},makeElasticIn:function(a,b){var c=g.makeElasticOut(a,b);return function(a){return 1-c(1-a)}},makeElasticInOut:function(a,b){b*=1.5;var c=g.makeElasticIn(a,b),d=g.makeElasticOut(a,b);return function(a){return a<.5?.5*c(a*2):.5*d(a*2-1)+.5}},makeBackOut:function(a){var b=g.makeBackIn(a);return function(a){return 1-b(1-a)}},makeBackIn:function(a){return function(b){return b*b*((a+1)*b-a)}},makeBackInOut:function(a){a*=1.525;var b=g.makeBackIn(a),c=g.makeBackOut(a);return function(a){return a<.5?.5*b(a*2):.5*c(a*2-1)+.5}}};g.elasticOut=g.makeElasticOut(1,.3);g.elasticIn=g.makeElasticIn(1,.3);g.elasticInOut=g.makeElasticInOut(1,.3);g.backOut=g.makeBackOut(1.7);g.backIn=g.makeBackIn(1.7);g.backInOut=g.makeBackInOut(1.7);e.exports=g}),null);
__d("FBIDCheck",[],(function(a,b,c,d,e,f){"use strict";var g=/^[1-9]\d*$/;a={isUser_deprecated:function(a){if(!a||typeof a==="string"&&!g.test(a))return!1;a=parseInt(a,10);return!a?!1:a>0&&a<22e8||a>=1e14&&a<=100099999989999||a>=89e12&&a<=89999999999999||a>=6000001e7&&a<=60000019999999}};e.exports=a}),null);
__d("WebPixelRatio",["SiteData"],(function(a,b,c,d,e,f){a={get:function(){return b("SiteData").pr!=null&&b("SiteData").pr>0?b("SiteData").pr:window.devicePixelRatio||1}};e.exports=a}),null);
__d("WebPixelRatioDetector",["Cookie","DOMEventListener","PixelRatioConst","Run"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("PixelRatioConst").cookieName,h=!1,i=!1,j=!1;function k(){return window.devicePixelRatio||1}function l(){b("Cookie").set(g,String(k()))}function m(){b("Cookie").clear(g)}function n(){if(i)return;i=!0;j&&m();k()!==1?l():m()}a={startDetecting:function(a){a&&(j=!0);if(h)return;h=!0;"onpagehide"in window&&b("DOMEventListener").add(window,"pagehide",n);b("Run").onBeforeUnload(n,!1)}};e.exports=a}),null);
__d("EntityPageLayoutDockingElement",["DockingElement","EntityPageDockingElementController"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(a){babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.register=function(){b("EntityPageDockingElementController").register(this.__queryDOM.bind(this),this.__updateWithCache.bind(this))};return c}(b("DockingElement"));e.exports=a}),null);
__d("ContextualLayerUpdateOnScroll",["Event"],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscriptions=[this._layer.subscribe("show",this._attachScrollListener.bind(this)),this._layer.subscribe("hide",this._removeScrollListener.bind(this))]};c.disable=function(){while(this._subscriptions.length)this._subscriptions.pop().unsubscribe()};c._attachScrollListener=function(){var a=this,c=this._layer.getContextScrollParent(),d=this._layer.getInsertScrollParent();if(this._listener!=null||c===d)return;this._listener=b("Event").listen(c,"scroll",function(){a._layer.updatePosition()})};c._removeScrollListener=function(){this._listener&&this._listener.remove(),this._listener=null};return a}();Object.assign(a.prototype,{_subscriptions:[]});e.exports=a}),null);
__d("LayerAutoFocusReact",["focusWithinLayer"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(a){this._layer=a,this._subscription=null}var c=a.prototype;c.enable=function(){this._layer.containsReactComponent&&(this._subscription=this._layer.subscribe("reactshow",this._focus.bind(this)))};c.disable=function(){this._subscription&&(this._subscription.unsubscribe(),this._subscription=null)};c._focus=function(){var a=this._layer.getRoot();a&&b("focusWithinLayer")(a)};return a}();e.exports=a}),null);
__d("LayerDestroyOnHide",[],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a){this._layer=a}var b=a.prototype;b.enable=function(){var a=this._layer.destroy.bind(this._layer);this._subscription=this._layer.subscribe("hide",function(){setTimeout(a,0)})};b.disable=function(){this._subscription&&(this._subscription.unsubscribe(),this._subscription=null)};return a}();Object.assign(a.prototype,{_subscription:null});e.exports=a}),null);
__d("LayerRemoveOnHide",["DOM"],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscription=this._layer.subscribe("hide",b("DOM").remove.bind(null,this._layer.getRoot()))};c.disable=function(){this._subscription&&(this._subscription.unsubscribe(),this._subscription=null)};return a}();Object.assign(a.prototype,{_subscription:null});e.exports=a}),null);
__d("getEarlyResources",[],(function(a,b,c,d,e,f){"use strict";function a(){return Array.from(document.querySelectorAll("head script[data-bootloader-hash]"))}e.exports=a}),null);
__d("WebDevicePerfInfoLogging",["Banzai","JSScheduler","VisibilityListener","WebDevicePerfInfoData","getEarlyResources"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function g(a){__p&&__p();var b=document.createElement("canvas");b=b.getContext("webgl")||b.getContext("experimental-webgl");if(!b)return;var c=b.getExtension("WEBGL_debug_renderer_info");if(!c)return;var d=b.getParameter(c.UNMASKED_RENDERER_WEBGL);b=b.getParameter(c.UNMASKED_VENDOR_WEBGL);a.gpu_vendor=b;a.gpu_renderer=d}function h(a){__p&&__p();var c=window.performance.getEntriesByType("resource"),d=b("getEarlyResources")(),e={};d.forEach(function(a){a=a.getAttribute("src");a!==null&&a!==void 0&&(e[a]=!0)});var f=0,g=0,h=0,i=0;c.forEach(function(a){if(e[a.name]===!0){var c=b("VisibilityListener").getHiddenTime(a.startTime,a.responseEnd);c=c!=null&&c>0;if(!c){c=a.transferSize===0;var d=a.transferSize<a.encodedBodySize,j=a.responseEnd-a.responseStart;c?(f+=a.encodedBodySize/j,g++):d||(h+=a.transferSize/j,i++)}}});g>0&&(a.cached_speed_sample=f/g,a.cached_file_count=g);i>0&&(a.remote_speed_sample=h/i,a.remote_file_count=i)}function i(){var a={};navigator&&navigator.hardwareConcurrency!==void 0&&(a.cpu_cores=navigator.hardwareConcurrency);navigator&&navigator.deviceMemory!==void 0&&(a.ram=navigator.deviceMemory);b("WebDevicePerfInfoData").needsFullUpdate&&g(a);b("WebDevicePerfInfoData").shouldLogResourcePerf&&h(a);b("Banzai").post("web_device_perf_info_log",a)}a={doLog:function(){(b("WebDevicePerfInfoData").needsFullUpdate||b("WebDevicePerfInfoData").needsPartialUpdate||b("WebDevicePerfInfoData").shouldLogResourcePerf)&&b("JSScheduler").scheduleSpeculativeCallback(i)}};e.exports=a}),null);
__d("PagesEventObserver",["Banzai"],(function(a,b,c,d,e,f){var g="pages_client_logging",h={VITAL_WAIT:b("Banzai").VITAL_WAIT,logData_DEPRECATED:function(a,c){c={delay:c||b("Banzai").VITAL_WAIT};b("Banzai").post(g,a,c)},notify:function(a,c,d,e,f){d=babelHelpers["extends"]({},d,{event_name:a,page_id:c,dedupe:e!==!1});a={delay:f||b("Banzai").VITAL_WAIT};b("Banzai").post(g,d,a)},registerLogOnClick:function(a,b,c){c===void 0&&(c=null),a.addEventListener("click",function(){c&&h.notify(c,b,null,null,null)})}};e.exports=h}),null);
__d("VisualCompletionGating",["requireCond","cr:729414"],(function(a,b,c,d,e,f){"use strict";e.exports=b("cr:729414")}),null);
__d("areJSONRepresentationsEqual",[],(function(a,b,c,d,e,f){function a(a,b){return JSON.stringify(a)==JSON.stringify(b)}e.exports=a}),null);
__d("clamp",[],(function(a,b,c,d,e,f){function a(a,b,c){if(a<b)return b;return a>c?c:a}e.exports=a}),null);
__d("coalesce",[],(function(a,b,c,d,e,f){function a(){for(var a=0;a<arguments.length;++a)if((a<0||arguments.length<=a?void 0:arguments[a])!=null)return a<0||arguments.length<=a?void 0:arguments[a];return null}e.exports=a}),null);
__d("ImmutableValue",["invariant","isNode"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h="_DONT_EVER_TYPE_THIS_SECRET_KEY";a=function(){__p&&__p();function a(b){b===a[h]||g(0,5608)}a.mergeAllPropertiesInto=function(a,b){var c=b.length;for(var d=0;d<c;d++)Object.assign(a,b[d])};a.deepFreezeRootNode=function(c){if(b("isNode")(c))return;Object.freeze(c);for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&a.recurseDeepFreeze(c[d]);Object.seal(c)};a.recurseDeepFreeze=function(c){if(b("isNode")(c)||!a.shouldRecurseFreeze(c))return;Object.freeze(c);for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&a.recurseDeepFreeze(c[d]);Object.seal(c)};a.shouldRecurseFreeze=function(b){return typeof b==="object"&&!(b instanceof a)&&b!==null};return a}();a._DONT_EVER_TYPE_THIS_SECRET_KEY=Math.random();e.exports=a}),null);
__d("ImmutableObject",["invariant","ImmutableValue","mergeHelpers"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h=b("mergeHelpers").checkMergeObjectArgs,i=b("mergeHelpers").isTerminal,j="_DONT_EVER_TYPE_THIS_SECRET_KEY";function k(a){a instanceof b("ImmutableValue")||g(0,3884)}var l=function(c){__p&&__p();babelHelpers.inheritsLoose(a,c);function a(){var a;a=c.call(this,b("ImmutableValue")[j])||this;b("ImmutableValue").mergeAllPropertiesInto(babelHelpers.assertThisInitialized(a),arguments);return a}a.create=function(){var b=Object.create(a.prototype);a.apply(b,arguments);return b};a.set=function(b,c){k(b);typeof c==="object"&&c!==void 0&&!Array.isArray(c)||g(0,3885);return new a(b,c)};a.setProperty=function(b,c,d){var e={};e[c]=d;return a.set(b,e)};a.deleteProperty=function(b,c){var d={};for(var e in b)e!==c&&Object.prototype.hasOwnProperty.call(b,e)&&(d[e]=b[e]);return new a(d)};a.setDeep=function(a,b){k(a);return m(a,b)};a.values=function(a){return Object.keys(a).map(function(b){return a[b]})};return a}(b("ImmutableValue"));function m(a,c){__p&&__p();h(a,c);var d={},e=Object.keys(a);for(var f=0;f<e.length;f++){var g=e[f];!Object.prototype.hasOwnProperty.call(c,g)?d[g]=a[g]:i(a[g])||i(c[g])?d[g]=c[g]:d[g]=m(a[g],c[g])}g=Object.keys(c);for(f=0;f<g.length;f++){e=g[f];if(Object.prototype.hasOwnProperty.call(a,e))continue;d[e]=c[e]}return a instanceof b("ImmutableValue")?new l(d):c instanceof b("ImmutableValue")?new l(d):d}e.exports=l}),null);
__d("formatNumber",["fbt","intlNumUtils"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();function a(a,c){return b("intlNumUtils").formatNumber(a,c)}function h(a,c){c=g._({"*":"{number}+"},[g._param("number",b("intlNumUtils").formatNumberWithThousandDelimiters(a,c),[0,a])]);return c.toString()}function i(a,c){c=g._({"*":"\u003C{number}"},[g._param("number",b("intlNumUtils").formatNumberWithThousandDelimiters(a,c),[0,a])]);return c.toString()}function c(a,c,d){return a>c?h(c,d):b("intlNumUtils").formatNumberWithThousandDelimiters(a,d)}function d(a,c,d){return a<c?i(c,d):b("intlNumUtils").formatNumberWithThousandDelimiters(a,d)}a.withThousandDelimiters=b("intlNumUtils").formatNumberWithThousandDelimiters;a.withMaxLimit=c;a.withMinLimit=d;e.exports=a}),null);
__d("MercuryIDs",["gkx"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g={isValid:function(a){return a==null||a===""||typeof a!=="string"?!1:/^\w{3,12}:.+/.test(a)},isValidThreadID:function(a){if(!g.isValid(a))return!1;a=g.tokenize(a);switch(a.type){case"user":case"support":case"thread":case"root":return!0;default:return(a.type==="pending"||a.type==="group")&&!b("gkx")("863760")?!0:!1}},tokenize:function(a){if(a==null||a===""||!g.isValid(a))throw new Error("bad_id_format "+String(a));var b=a.indexOf(":");return{type:a.substr(0,b),value:a.substr(b+1)}},getUserIDFromParticipantID:function(a){if(!g.isValid(a))throw new Error("bad_id_format "+a);a=g.tokenize(a);var b=a.type;a=a.value;return b==="fbid"?a:null},getParticipantIDFromUserID:function(a){if(isNaN(a))throw new Error("Not a user ID: "+a);return"fbid:"+a},getUserIDFromThreadID:function(a){return!this.isCanonical(a)?null:this.tokenize(a).value},getThreadIDFromUserID:function(a){return"user:"+a},getThreadIDFromThreadFBID:function(a){return"thread:"+a},getThreadIDFromSupportInboxItemID:function(a){return"support:"+a},getThreadFBIDFromThreadID:function(a){return this.tokenize(a).value},getThreadKeyfromThreadIDUserID:function(a,b){__p&&__p();if(a==null||a===""||!g.isValid(a))throw new Error("bad_id_format "+String(a));var c=this.tokenize(a).type;a=this.tokenize(a).value;if(c!=="user")return"g"+a;c="";var d="";if(a.length!==b.length)a.length>b.length?(c=a,d=b):(c=b,d=a);else if(b===a)return b+"u"+a;else{var e=0;while(e<a.length&&e<b.length)if(a[e]===b[e])e++;else{a[e]>b[e]?(c=a,d=b):(c=b,d=a);break}}return d+"u"+c},getThreadIDFromParticipantID:function(a){a=this.getUserIDFromParticipantID(a);return a?this.getThreadIDFromUserID(a):null},getParticipantIDFromFromThreadID:function(a){a=this.getUserIDFromThreadID(a);return a?this.getParticipantIDFromUserID(a):null},getSupportInboxItemIDFromThreadID:function(a){return this.tokenize(a).value},isCanonical:function(a){return this.isValid(a)&&this.tokenize(a).type==="user"},isGroupChat:function(a){return this.isValid(a)&&this.tokenize(a).type!=="user"},isLocalThread:function(a){return this.isValid(a)&&this.tokenize(a).type==="root"}};e.exports=g}),null);
__d("PerfXSharedFields",[],(function(a,b,c,d,e,f){var g={addCommonValues:function(a){navigator&&navigator.hardwareConcurrency!==void 0&&(a.num_cores=navigator.hardwareConcurrency);navigator&&navigator.deviceMemory&&(a.ram_gb=navigator.deviceMemory);navigator&&navigator.connection&&(typeof navigator.connection.downlink==="number"&&(a.downlink_megabits=navigator.connection.downlink),typeof navigator.connection.effectiveType==="string"&&(a.effective_connection_type=navigator.connection.effectiveType),typeof navigator.connection.rtt==="number"&&(a.rtt_ms=navigator.connection.rtt));return a},getCommonData:function(){var a={};g.addCommonValues(a);return a}};e.exports=g}),null);
__d("QuicklingRefreshOverheadUtil",["QuicklingConfig","WebStorage","performanceAbsoluteNow"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g,h,i=null,j=1e4;a={onQuicklingStart:function(){i=(g||(g=b("performanceAbsoluteNow")))()},onQuicklingVersionMatch:function(){i=null},onQuicklingRefreshStart:function(){if(!b("QuicklingConfig").logRefreshOverhead||i===null)return;var a=(h||(h=b("WebStorage"))).getSessionStorage();if(!a)return;a.setItem("quickling_refresh_overhead",((g||(g=b("performanceAbsoluteNow")))()-i).toString());a.setItem("quickling_refresh_start",Date.now().toString())},getOverhead:function(a){__p&&__p();if(!b("QuicklingConfig").logRefreshOverhead)return null;var c=(h||(h=b("WebStorage"))).getSessionStorageForRead();if(!c)return null;var d=c.getItem("quickling_refresh_start");if(d==null)return null;if(a-parseInt(d,10)>j)return null;a=c.getItem("quickling_refresh_overhead");return a!=null?parseFloat(a):null}};e.exports=a}),null);
__d("PresenceUtil",["CurrentUser","randomInt"],(function(a,b,c,d,e,f){var g=b("randomInt")(0,4294967295)+1;function a(){return g}function c(){return b("CurrentUser").isLoggedInNow()}e.exports={getSessionID:a,hasUserCookie:c}}),null);
__d("ClientServiceWorkerMessage",[],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a,b,c){this.$1=a,this.$2=b,this.$3=c}var b=a.prototype;b.sendViaController=function(){if(!navigator.serviceWorker||!navigator.serviceWorker.controller)return;var a=new self.MessageChannel();this.$3&&(a.port1.onmessage=this.$3);navigator.serviceWorker.controller.postMessage({command:this.$1,data:this.$2},[a.port2])};return a}();e.exports=a}),null);
__d("TokenizeUtil",["nullthrows"],(function(a,b,c,d,e,f){__p&&__p();var g=/[ ]+/g,h=/[^ ]+/g,i=new RegExp("[^ "+l()+"]+|"+a(),"g"),j=new RegExp(a(),"g"),k=1e3;function l(){return".,+*?$|#{}()'\\^\\-\\[\\]\\\\\\/!@%\"~=<>_:;\u30fb\u3001\u3002\u3008-\u3011\u3014-\u301f\uff1a-\uff1f\uff01-\uff0f\uff3b-\uff40\uff5b-\uff65\u2e2e\u061f\u066a-\u066c\u061b\u060c\u060d\ufd3e\ufd3f\u1801\u0964\u104a\u104b\u2010-\u2027\u2030-\u205e\xa1-\xb1\xb4-\xb8\xba\xbb\xbf"}function a(){return"["+l()+"]"}var m={},n={a:"\u0430 \xe0 \xe1 \xe2 \xe3 \xe4 \xe5 \u0101",b:"\u0431",c:"\u0446 \xe7 \u010d",d:"\u0434 \xf0 \u010f \u0111",e:"\u044d \u0435 \xe8 \xe9 \xea \xeb \u011b \u0113",f:"\u0444",g:"\u0433 \u011f \u0123",h:"\u0445 \u0127",i:"\u0438 \xec \xed \xee \xef \u0131 \u012b",j:"\u0439",k:"\u043a \u0138 \u0137",l:"\u043b \u013e \u013a \u0140 \u0142 \u013c",m:"\u043c",n:"\u043d \xf1 \u0148 \u0149 \u014b \u0146",o:"\u043e \xf8 \xf6 \xf5 \xf4 \xf3 \xf2",p:"\u043f",r:"\u0440 \u0159 \u0155",s:"\u0441 \u015f \u0161 \u017f",t:"\u0442 \u0165 \u0167 \xfe",u:"\u0443 \u044e \xfc \xfb \xfa \xf9 \u016f \u016b",v:"\u0432",y:"\u044b \xff \xfd",z:"\u0437 \u017e",ae:"\xe6",oe:"\u0153",ts:"\u0446",ch:"\u0447",ij:"\u0133",sh:"\u0448",ss:"\xdf",ya:"\u044f"};for(var o in n){var p=n[o].split(" ");for(var q=0;q<p.length;q++)m[p[q]]=o}function c(a){return a.replace(j," ")}function r(a){a=a.toLowerCase();var b="",c;for(var d=a.length;d--;)c=a.charAt(d),b=(m[c]||c)+b;return b.replace(g," ")}function s(a,b){b===void 0&&(b=h);var c=[],d=b.exec(a);while(d)d=d[0],c.push(d),d=b.exec(a);return c}function d(a,b){__p&&__p();b===void 0&&(b=h);var c={},d=0;return function(e,f){if(!Object.prototype.hasOwnProperty.call(c,e)){d>=k&&(c={},d=0);var g=r(e),h=a(g);c[e]={value:e,flatValue:g,tokens:s(h,b),isPrefixQuery:!!h&&h[h.length-1]!=" "};d++}f!=null&&f!==!1&&c[e].sortedTokens===void 0&&(c[e].sortedTokens=c[e].tokens.slice(),c[e].sortedTokens.sort(function(a,b){return b.length-a.length}));return c[e]}}var t=d(c),u=d(function(a){return a},i);function f(a,c,d){__p&&__p();var e=a=="query"||a=="query_punc",f=a=="aligned",g=a=="query_punc"?u:t;c=g(c,a=="prefix");var h=a=="prefix"?b("nullthrows")(c.sortedTokens):c.tokens,i=g(d).tokens,j={},k=c.isPrefixQuery&&(e||f)?h.length-1:null;g=function(b,c){for(var d=0;d<i.length;++d){var g=i[d];if(!j[d]&&(g==b||((e||f)&&c===k||a=="prefix")&&g.indexOf(b)===0))return j[d]=!0;if(f&&!j[d])return!1}return!1};return Boolean(h.length&&h.every(g))}p={flatten:r,parse:t,parseIncludingPunctuations:u,getPunctuation:a,makeParse:d,isExactMatch:f.bind(null,"exact"),isQueryMatch:f.bind(null,"query"),isQueryMatchIncludingPunctuations:f.bind(null,"query_punc"),isAlignedMatch:f.bind(null,"aligned"),isPrefixMatch:f.bind(null,"prefix"),tokenize:s};e.exports=p}),null);
__d("DamerauLevenshtein",[],(function(a,b,c,d,e,f){__p&&__p();a={DamerauLevenshteinDistance:function(a,b){__p&&__p();if(a.length===0)return b.length;if(b.length===0)return a.length;if(a===b)return 0;var c,d,e=[];e[0]=[];e[1]=[];e[2]=[];for(d=0;d<=b.length;d++)e[0][d]=d;for(c=1;c<=a.length;c++)for(d=1;d<=b.length;d++){e[c%3][0]=c;var f=a.charAt(c-1)===b.charAt(d-1)?0:1;e[c%3][d]=Math.min(e[(c-1)%3][d]+1,e[c%3][d-1]+1,e[(c-1)%3][d-1]+f);c>1&&d>1&&a.charAt(c-1)==b.charAt(d-2)&&a.charAt(c-2)==b.charAt(d-1)&&(e[c%3][d]=Math.min(e[c%3][d],e[(c-2)%3][d-2]+f))}return e[a.length%3][b.length]}};e.exports=a}),null);
__d("getByPath",[],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,b,c){a=a;for(var d=0;d<b.length;d++){var e=b[d];if(a&&typeof a!=="string"&&typeof a!=="number"&&e in a)a=a[e];else return c}return a}e.exports=a}),null);