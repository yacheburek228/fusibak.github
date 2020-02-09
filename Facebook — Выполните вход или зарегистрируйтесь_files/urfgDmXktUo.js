if (self.CavalryLogger) { CavalryLogger.start_js(["85kY9"]); }

__d("ContextualLayerHideOnScroll",["Event"],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a){this._layer=a}var c=a.prototype;c.enable=function(){this._subscriptions=[this._layer.subscribe("contextchange",this._handleContextChange.bind(this)),this._layer.subscribe("show",this.attach.bind(this)),this._layer.subscribe("hide",this.detach.bind(this))]};c.disable=function(){while(this._subscriptions.length)this._subscriptions.pop().unsubscribe();this.detach()};c.attach=function(){if(this._listener)return;var a=this._layer.getContextScrollParent();if(a===window)return;this._listener=b("Event").listen(a,"scroll",this._layer.hide.bind(this._layer))};c.detach=function(){this._listener&&this._listener.remove(),this._listener=null};c._handleContextChange=function(){this.detach(),this._layer.isShown()&&this.attach()};return a}();Object.assign(a.prototype,{_subscriptions:[]});e.exports=a}),null);
__d("VideoPauseWhenBackgrounded",["invariant","Event","SubscriptionsHandler","VideoPlayerExperiments","Visibility"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1=new(b("SubscriptionsHandler"))(),this.$3=!1}var c=a.prototype;c.enable=function(a){this.$2&&g(0,2800),this.$1.engage(),this.$2=a,this.$1.addSubscriptions(b("Event").listen(window,"blur",this.$4.bind(this)),b("Event").listen(window,"focus",this.$5.bind(this)),b("Visibility").addListener(b("Visibility").HIDDEN,this.$4.bind(this)),b("Visibility").addListener(b("Visibility").VISIBLE,this.$5.bind(this)))};c.disable=function(){this.$1.release(),this.$2=null};c.$4=function(){this.pauseVideo("page_visibility_initiated")};c.$5=function(){this.playVideo("page_visibility_initiated")};c.playVideo=function(a){var b=this.$2;b||g(0,2801);b.isState("paused")&&this.$3&&b.play(a);this.$3=!1};c.pauseVideo=function(a){var c=this.$2;c||g(0,2801);if(b("VideoPlayerExperiments").fullScreenVideoIsNotHidden&&c.isFullscreen())return;c.isState("playing")&&(c.pause(a),this.$3=!0)};return a}();e.exports=a}),null);
__d("Animation",["BrowserSupport","CSS","DataStore","DOM","Style","clearInterval","clearTimeout","getVendorPrefixedName","requestAnimationFrame","setIntervalAcrossTransitions","setTimeoutAcrossTransitions","shield"],(function(a,b,c,d,e,f){__p&&__p();var g=b("requestAnimationFrame"),h=[],i;function j(b){if(a==this)return new j(b);else this.obj=b,this._reset_state(),this.queue=[],this.last_attr=null,this.unit="px",this.behaviorOverrides={ignoreUserScroll:!1}}function k(a){if(b("BrowserSupport").hasCSS3DTransforms())return n(a);else return m(a)}function l(a){return a.toFixed(8)}function m(a){a=[a[0],a[4],a[1],a[5],a[12],a[13]];return"matrix("+a.map(l).join(",")+")"}function n(a){return"matrix3d("+a.map(l).join(",")+")"}function o(a,b){__p&&__p();a||(a=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);var c=[];for(var d=0;d<4;d++)for(var e=0;e<4;e++){var f=0;for(var g=0;g<4;g++)f+=a[d*4+g]*b[g*4+e];c[d*4+e]=f}return c}var p=0;j.prototype._reset_state=function(){this.state={attrs:{},duration:500}};j.prototype.stop=function(){this._reset_state();this.queue=[];return this};j.prototype._build_container=function(){__p&&__p();if(this.container_div){this._refresh_container();return}if(this.obj.firstChild&&this.obj.firstChild.__animation_refs){this.container_div=this.obj.firstChild;this.container_div.__animation_refs++;this._refresh_container();return}var a=document.createElement("div");a.style.padding="0px";a.style.margin="0px";a.style.border="0px";a.__animation_refs=1;var b=this.obj.childNodes;while(b.length)a.appendChild(b[0]);this.obj.appendChild(a);this._orig_overflow=this.obj.style.overflow;this.obj.style.overflow="hidden";this.container_div=a;this._refresh_container()};j.prototype._refresh_container=function(){this.container_div.style.height="auto",this.container_div.style.width="auto",this.container_div.style.height=this.container_div.offsetHeight+this.unit,this.container_div.style.width=this.container_div.offsetWidth+this.unit};j.prototype._destroy_container=function(){__p&&__p();if(!this.container_div)return;if(!--this.container_div.__animation_refs){var a=this.container_div.childNodes;while(a.length)this.obj.appendChild(a[0]);this.obj.removeChild(this.container_div)}this.container_div=null;this.obj.style.overflow=this._orig_overflow};var q=1,r=2,s=3;j.prototype._attr=function(a,b,c){__p&&__p();a=a.replace(/-[a-z]/gi,function(a){return a.substring(1).toUpperCase()});var d=!1;switch(a){case"background":this._attr("backgroundColor",b,c);return this;case"backgroundColor":case"borderColor":case"color":b=w(b);break;case"opacity":b=parseFloat(b,10);break;case"height":case"width":b=="auto"?d=!0:b=parseInt(b,10);break;case"borderWidth":case"lineHeight":case"fontSize":case"margin":case"marginBottom":case"marginLeft":case"marginRight":case"marginTop":case"padding":case"paddingBottom":case"paddingLeft":case"paddingRight":case"paddingTop":case"bottom":case"left":case"right":case"top":case"scrollTop":case"scrollLeft":b=parseInt(b,10);break;case"rotateX":case"rotateY":case"rotateZ":b=parseInt(b,10)*Math.PI/180;break;case"translateX":case"translateY":case"translateZ":case"scaleX":case"scaleY":case"scaleZ":b=parseFloat(b,10);break;case"rotate3d":this._attr("rotateX",b[0],c);this._attr("rotateY",b[1],c);this._attr("rotateZ",b[2],c);return this;case"rotate":this._attr("rotateZ",b,c);return this;case"scale3d":this._attr("scaleZ",b[2],c);case"scale":this._attr("scaleX",b[0],c);this._attr("scaleY",b[1],c);return this;case"translate3d":this._attr("translateZ",b[2],c);case"translate":this._attr("translateX",b[0],c);this._attr("translateY",b[1],c);return this;default:throw new Error(a+" is not a supported attribute!")}this.state.attrs[a]===void 0&&(this.state.attrs[a]={});d&&(this.state.attrs[a].auto=!0);switch(c){case s:this.state.attrs[a].start=b;break;case r:this.state.attrs[a].by=!0;case q:this.state.attrs[a].value=b;break}};function t(a){var c,d=parseInt((c=b("Style")).get(a,"paddingLeft"),10),e=parseInt(c.get(a,"paddingRight"),10),f=parseInt(c.get(a,"borderLeftWidth"),10);c=parseInt(c.get(a,"borderRightWidth"),10);return a.offsetWidth-(d?d:0)-(e?e:0)-(f?f:0)-(c?c:0)}function u(a){var c,d=parseInt((c=b("Style")).get(a,"paddingTop"),10),e=parseInt(c.get(a,"paddingBottom"),10),f=parseInt(c.get(a,"borderTopWidth"),10);c=parseInt(c.get(a,"borderBottomWidth"),10);return a.offsetHeight-(d?d:0)-(e?e:0)-(f?f:0)-(c?c:0)}j.prototype.setUnit=function(a){this.unit=a;return this};j.prototype.to=function(a,b){b===void 0?this._attr(this.last_attr,a,q):(this._attr(a,b,q),this.last_attr=a);return this};j.prototype.by=function(a,b){b===void 0?this._attr(this.last_attr,a,r):(this._attr(a,b,r),this.last_attr=a);return this};j.prototype.from=function(a,b){b===void 0?this._attr(this.last_attr,a,s):(this._attr(a,b,s),this.last_attr=a);return this};j.prototype.duration=function(a){this.state.duration=a?a:0;return this};j.prototype.checkpoint=function(a,b){a===void 0&&(a=1);this.state.checkpoint=a;this.queue.push(this.state);this._reset_state();this.state.checkpointcb=b;return this};j.prototype.blind=function(){this.state.blind=!0;return this};j.prototype.hide=function(){this.state.hide=!0;return this};j.prototype.show=function(){this.state.show=!0;return this};j.prototype.ease=function(a){this.state.ease=a;return this};j.prototype.CSSAnimation=function(a){var b={duration:this.state.duration};this.state.ondone&&(b.callback=this.state.ondone);a(this.obj,b)};j.prototype.go=function(){var a=Date.now();this.queue.push(this.state);for(var b=0;b<this.queue.length;b++)this.queue[b].start=a-p,this.queue[b].checkpoint&&(a+=this.queue[b].checkpoint*this.queue[b].duration);x(this);return this};j.prototype._show=function(){b("CSS").show(this.obj)};j.prototype._hide=function(){b("CSS").hide(this.obj)};j.prototype.overrideBehavior=function(a){this.behaviorOverrides=babelHelpers["extends"]({},this.behaviorOverrides,a);return this};j.prototype._frame=function(c){__p&&__p();var d=!0,e=!1,f;function g(a){return document.documentElement[a]||document.body[a]}function h(a,b){return a===document.body?g(b):a[b]}function i(a,b){return b.lastScrollTop!==void 0&&b.lastScrollTop!==h(a.obj,"scrollTop")||b.lastScrollLeft!==void 0&&b.lastScrollLeft!==h(a.obj,"scrollLeft")}function j(a,b){b.lastScrollTop=h(a.obj,"scrollTop"),b.lastScrollLeft=h(a.obj,"scrollLeft")}for(var l=0;l<this.queue.length;l++){var m=this.queue[l];if(m.start>c){d=!1;continue}m.checkpointcb&&(this._callback(m.checkpointcb,c-m.start),m.checkpointcb=null);if(m.started===void 0){m.show&&this._show();for(var n in m.attrs){if(m.attrs[n].start!==void 0)continue;switch(n){case"backgroundColor":case"borderColor":case"color":f=w(b("Style").get(this.obj,n=="borderColor"?"borderLeftColor":n));m.attrs[n].by&&(m.attrs[n].value[0]=Math.min(255,Math.max(0,m.attrs[n].value[0]+f[0])),m.attrs[n].value[1]=Math.min(255,Math.max(0,m.attrs[n].value[1]+f[1])),m.attrs[n].value[2]=Math.min(255,Math.max(0,m.attrs[n].value[2]+f[2])));break;case"opacity":f=b("Style").getOpacity(this.obj);m.attrs[n].by&&(m.attrs[n].value=Math.min(1,Math.max(0,m.attrs[n].value+f)));break;case"height":f=u(this.obj);m.attrs[n].by&&(m.attrs[n].value+=f);break;case"width":f=t(this.obj);m.attrs[n].by&&(m.attrs[n].value+=f);break;case"scrollLeft":case"scrollTop":f=h(this.obj,n);m.attrs[n].by&&(m.attrs[n].value+=f);j(this,m);break;case"rotateX":case"rotateY":case"rotateZ":case"translateX":case"translateY":case"translateZ":f=b("DataStore").get(this.obj,n,0);m.attrs[n].by&&(m.attrs[n].value+=f);break;case"scaleX":case"scaleY":case"scaleZ":f=b("DataStore").get(this.obj,n,1);m.attrs[n].by&&(m.attrs[n].value+=f);break;default:f=parseInt(b("Style").get(this.obj,n),10)||0;m.attrs[n].by&&(m.attrs[n].value+=f);break}m.attrs[n].start=f}if(m.attrs.height&&m.attrs.height.auto||m.attrs.width&&m.attrs.width.auto){this._destroy_container();for(var n in{height:1,width:1,fontSize:1,borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,paddingLeft:1,paddingRight:1,paddingTop:1,paddingBottom:1})m.attrs[n]&&(this.obj.style[n]=m.attrs[n].value+(typeof m.attrs[n].value==="number"?this.unit:""));m.attrs.height&&m.attrs.height.auto&&(m.attrs.height.value=u(this.obj));m.attrs.width&&m.attrs.width.auto&&(m.attrs.width.value=t(this.obj))}m.started=!0;m.blind&&this._build_container()}var p=(c-m.start)/m.duration;p>=1?(p=1,m.hide&&this._hide()):d=!1;var q=m.ease?m.ease(p):p;!e&&p!=1&&m.blind&&(e=!0);for(var n in m.attrs)switch(n){case"backgroundColor":case"borderColor":case"color":m.attrs[n].start[3]!=m.attrs[n].value[3]?this.obj.style[n]="rgba("+v(q,m.attrs[n].start[0],m.attrs[n].value[0],!0)+","+v(q,m.attrs[n].start[1],m.attrs[n].value[1],!0)+","+v(q,m.attrs[n].start[2],m.attrs[n].value[2],!0)+","+v(q,m.attrs[n].start[3],m.attrs[n].value[3],!1)+")":this.obj.style[n]="rgb("+v(q,m.attrs[n].start[0],m.attrs[n].value[0],!0)+","+v(q,m.attrs[n].start[1],m.attrs[n].value[1],!0)+","+v(q,m.attrs[n].start[2],m.attrs[n].value[2],!0)+")";break;case"opacity":b("Style").set(this.obj,"opacity",v(q,m.attrs[n].start,m.attrs[n].value));break;case"height":case"width":this.obj.style[n]=q==1&&m.attrs[n].auto?"auto":v(q,m.attrs[n].start,m.attrs[n].value,!0)+this.unit;break;case"scrollLeft":case"scrollTop":var r=this.obj===document.body;if(!this.behaviorOverrides.ignoreUserScroll&&i(this,m))delete m.attrs.scrollTop,delete m.attrs.scrollLeft;else{var s=v(q,m.attrs[n].start,m.attrs[n].value,!0);!r?this.obj[n]=s:n=="scrollLeft"?a.scrollTo(s,g("scrollTop")):a.scrollTo(g("scrollLeft"),s);j(this,m)}break;case"translateX":case"translateY":case"translateZ":case"rotateX":case"rotateY":case"rotateZ":case"scaleX":case"scaleY":case"scaleZ":b("DataStore").set(this.obj,n,v(q,m.attrs[n].start,m.attrs[n].value,!1));break;default:this.obj.style[n]=v(q,m.attrs[n].start,m.attrs[n].value,!0)+this.unit;break}r=null;s=b("DataStore").get(this.obj,"translateX",0);q=b("DataStore").get(this.obj,"translateY",0);var x=b("DataStore").get(this.obj,"translateZ",0);(s||q||x)&&(r=o(r,[1,0,0,0,0,1,0,0,0,0,1,0,s,q,x,1]));s=b("DataStore").get(this.obj,"scaleX",1);q=b("DataStore").get(this.obj,"scaleY",1);x=b("DataStore").get(this.obj,"scaleZ",1);(s-1||q-1||x-1)&&(r=o(r,[s,0,0,0,0,q,0,0,0,0,x,0,0,0,0,1]));s=b("DataStore").get(this.obj,"rotateX",0);s&&(r=o(r,[1,0,0,0,0,Math.cos(s),Math.sin(-s),0,0,Math.sin(s),Math.cos(s),0,0,0,0,1]));q=b("DataStore").get(this.obj,"rotateY",0);q&&(r=o(r,[Math.cos(q),0,Math.sin(q),0,0,1,0,0,Math.sin(-q),0,Math.cos(q),0,0,0,0,1]));x=b("DataStore").get(this.obj,"rotateZ",0);x&&(r=o(r,[Math.cos(x),Math.sin(-x),0,0,Math.sin(x),Math.cos(x),0,0,0,0,1,0,0,0,0,1]));s=b("getVendorPrefixedName")("transform");if(s)if(r){q=k(r);b("Style").set(this.obj,s,q)}else d&&b("Style").set(this.obj,s,null);p==1&&(this.queue.splice(l--,1),this._callback(m.ondone,c-m.start-m.duration))}!e&&this.container_div&&this._destroy_container();return!d};j.prototype.ondone=function(a){this.state.ondone=a;return this};j.prototype._callback=function(a,b){a&&(p=b,a.call(this),p=0)};function v(a,b,c,d){return(d?parseInt:parseFloat)((c-b)*a+b,10)}function w(a){__p&&__p();var b=/^#([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})$/i.exec(a);if(b)return[parseInt(b[1].length==1?b[1]+b[1]:b[1],16),parseInt(b[2].length==1?b[2]+b[2]:b[2],16),parseInt(b[3].length==1?b[3]+b[3]:b[3],16),1];else{b=/^rgba? *\(([0-9]+), *([0-9]+), *([0-9]+)(?:, *([0-9\.]+))?\)$/.exec(a);if(b)return[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),b[4]?parseFloat(b[4]):1];else if(a=="transparent")return[255,255,255,0];else throw new Error("Named color attributes are not supported.")}}function x(a){h.push(a),h.length===1&&(g?g(z):i=b("setIntervalAcrossTransitions")(z,20)),g&&y(),z(Date.now(),!0)}function y(){__p&&__p();if(!g)throw new Error("Ending timer only valid with requestAnimationFrame");var a=0;for(var c=0;c<h.length;c++){var d=h[c];for(var e=0;e<d.queue.length;e++){var f=d.queue[e].start+d.queue[e].duration;f>a&&(a=f)}}i&&(b("clearTimeout")(i),i=null);f=Date.now();a>f&&(i=b("setTimeoutAcrossTransitions")(b("shield")(z),a-f))}function z(a,c){a=Date.now();for(var c=c===!0?h.length-1:0;c<h.length;c++)try{h[c]._frame(a)||h.splice(c--,1)}catch(a){h.splice(c--,1)}h.length===0?i&&(g?b("clearTimeout")(i):b("clearInterval")(i),i=null):g&&g(z)}j.ease={};j.ease.begin=function(a){return Math.sin(Math.PI/2*(a-1))+1};j.ease.end=function(a){return Math.sin(.5*Math.PI*a)};j.ease.both=function(a){return.5*Math.sin(Math.PI*(a-.5))+.5};j.prependInsert=function(a,c){j.insert(a,c,b("DOM").prependContent)};j.appendInsert=function(a,c){j.insert(a,c,b("DOM").appendContent)};j.insert=function(a,c,d){b("Style").set(c,"opacity",0),d(a,c),new j(c).from("opacity",0).to("opacity",1).duration(400).go()};e.exports=j}),null);
__d("VideoCover",["invariant","Promise","Animation","Bootloader","CSS","EventListener","SubscriptionsHandler","promiseDone","setTimeout"],(function(a,b,c,d,e,f,g){__p&&__p();a=function(){"use strict";__p&&__p();function a(a,c,d,e,f,h){__p&&__p();var i=this;e===void 0&&(e=null);f===void 0&&(f=!1);h===void 0&&(h=0);this.$7=new(b("SubscriptionsHandler"))();this.$15=function(){i.$5&&b("CSS").show(i.$1)};this.$16=function(){i.$5&&b("CSS").hide(i.$1)};this.$11=function(){i.$3!=null&&i.$3.length>0?b("Bootloader").loadModules(["PhotoSnowlift"],function(a){return a.bootstrap(i.$3)},"VideoCover"):i.$8&&i.$8.clickVideo()};this.$12=function(){i.$9&&i.$8&&!i.$8.hasSeenClick()?b("promiseDone")(new(b("Promise"))(function(a){return b("setTimeout")(a,i.$10)}),function(a){return i.$17()},function(a){return i.$17()}):b("CSS").hide(i.$1)};this.$14=function(){if(i.$8){var a=i.$8.getOption("Looping","isLooping");if(i.$4||a)return;b("CSS").show(i.$1)}};this.$13=function(){i.$8&&i.$8.isState("fallback")&&i.$6&&b("CSS").show(i.$1)};a instanceof Element||g(0,4829);this.$1=a;c[0]instanceof Element||g(0,4830);this.$2=c[0];this.$3=d;this.$9=f;this.$10=h;e&&(this.$4=e.hiddenAfterFinish,this.$5=e.showWhileBuffering,this.$6=e.showAfterFallback);b("EventListener").listen(this.$1,"click",this.$11)}var c=a.prototype;c.disable=function(){this.$7.release(),this.$8&&this.$8.unregisterOption("VideoCover","coverElement"),this.$8=null};c.enable=function(a){var b=this;this.$8=a;a.getState()==="playing"&&this.$12();this.$7.addSubscriptions(a.addListener("stateChange",this.$13),a.addListener("beginPlayback",this.$12),a.addListener("finishPlayback",this.$14),a.addListener("buffering",this.$15),a.addListener("buffered",this.$16));a.registerOption("VideoCover","coverElement",function(){return b.$1})};c.getCurrentCover=function(){return this.$2};c.setSnowLiftURI=function(a){this.$3=a};c.$17=function(){new(b("Animation"))(this.$1).from("opacity",1).to("opacity",0).duration(1e3).hide().go()};return a}();e.exports=a}),null);
__d("Duration.react",["React","ServerTime","clearTimeout","setTimeout"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=500,h=1e3,i=60,j=60;a=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);function c(b){b=a.call(this,b)||this;b.state={duration:0};return b}var d=c.prototype;d.UNSAFE_componentWillMount=function(){this.$2()};d.componentWillUnmount=function(){b("clearTimeout")(this.$1)};d.$2=function(){var a=this,c;this.props.useLocalTime?c=Date.now():c=b("ServerTime").getMillis();this.setState({duration:Math.max(c-this.props.startTime,0)});this.$1=b("setTimeout")(function(){return a.$2()},g)};d.render=function(){__p&&__p();var a=Math.floor(this.state.duration/h),c=a%i;a=Math.floor(a/i);var d=a%j;a=Math.floor(a/j);var e="";a>0&&(e=a+":");a=d+":";a.length<3&&e.length>0&&(a="0"+a);d=""+c;d.length<2&&(d="0"+d);return b("React").jsxs("span",{children:[e,a,d]})};return c}(b("React").Component);a.defaultProps={useLocalTime:!1};e.exports=a}),null);
__d("intlSummarizeNumber",["FbtNumberType","IntlCompactDecimalNumberFormatConfig","IntlVariations","intlNumUtils"],(function(a,b,c,d,e,f){__p&&__p();var g=3,h=14,i={ROUND:"ROUND",TRUNCATE:"TRUNCATE"},j={SHORT:"SHORT",LONG:"LONG"};function a(a,c,d,e){__p&&__p();d===void 0&&(d=j.SHORT);e===void 0&&(e=i.ROUND);d=b("IntlCompactDecimalNumberFormatConfig")[d==j.SHORT?"short_patterns":"long_patterns"];var f=a===0?0:Math.floor(Math.log10(Math.abs(a)));f>h&&(f=h);var l=k(a,f,c,e,d),m=l[0],n=l[1];l=l[2];if(l){f+=1;l=k(a,f,c,e,d);m=l[0];n=l[1];l[2]}e=b("FbtNumberType").getVariation(m)||b("IntlVariations").NUMBER_OTHER;l=f.toString();l=(d=d)!=null?(d=d[l])!=null?d[e.toString()]:d:d;if(!l||f<g||l.positive_prefix_pattern===""&&l.positive_suffix_pattern===""){e=c===void 0?0:c;return b("intlNumUtils").formatNumberWithThousandDelimiters(a,e)}return l&&l.min_integer_digits===0&&m===1?l.positive_prefix_pattern+l.positive_suffix_pattern:(l&&l.positive_prefix_pattern||"")+b("intlNumUtils").formatNumberWithThousandDelimiters(m,n)+(l&&l.positive_suffix_pattern||"")}function k(a,c,d,e,f){__p&&__p();var g=c.toString();g=(f=f)!=null?(f=f[g])!=null?f[b("IntlVariations").NUMBER_OTHER.toString()]:f:f;f=g&&g.min_integer_digits||c+1;var j=c-f+1;j=Math.abs(a)/Math.pow(10,j);var k=d!=null;d=k?d:g&&g.min_fraction_digits;d==null&&(d=c>2?1:0);g=e==i.TRUNCATE?b("intlNumUtils").truncateLongNumber(j.toString(),d):j.toFixed(d);e=parseFloat(g)*(a<0?-1:1);return[e,e%1===0&&!k?0:d,g.length>f+(d>0?d+1:0)+(j>=0?0:1)&&c<h]}e.exports=a}),null);
__d("VideoConcurrentViewerCount.react",["ix","cx","fbt","Image.react","React","Tooltip","asset","intlSummarizeNumber"],(function(a,b,c,d,e,f,g,h,i){"use strict";__p&&__p();a=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.$1=function(){if(this.props.isAudio)return g("466773");else return g("406916")};d.render=function(){var a=this.props.viewerCount;if(!a)return b("React").jsx("div",{className:"_1jb_ _2z59"});var c=null;this.props.compact||(c=b("React").jsx(b("Image.react"),{className:"_5pf2",src:this.$1()}));var d=this.props.pageCount!=null&&this.props.pageCount>1?b("Tooltip").propsFor(i._({"*":"\u041e\u0431\u0449\u0435\u0435 \u0447\u0438\u0441\u043b\u043e \u0442\u0435\u043a\u0443\u0449\u0438\u0445 \u0437\u0440\u0438\u0442\u0435\u043b\u0435\u0439 \u0441 \u044d\u0442\u043e\u0439 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b \u0438 \u0435\u0449\u0435 {number}","_1":"\u041e\u0431\u0449\u0435\u0435 \u0447\u0438\u0441\u043b\u043e \u0442\u0435\u043a\u0443\u0449\u0438\u0445 \u0437\u0440\u0438\u0442\u0435\u043b\u0435\u0439 \u0441 \u044d\u0442\u043e\u0439 \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b \u0438 \u0435\u0449\u0435 1"},[i._plural(this.props.pageCount-1,"number")]),"right"):{};return b("React").jsxs("div",babelHelpers["extends"]({className:"_1jb_"+(this.props.compact?" _3eca":""),"data-testid":"live-cvc"},d,{children:[c,b("intlSummarizeNumber")(a)]}))};return c}(b("React").Component);e.exports=a}),null);
__d("LiveVideoIndicator.react",["cx","fbt","DateConsts","Duration.react","React","VideoConcurrentViewerCount.react"],(function(a,b,c,d,e,f,g,h){"use strict";__p&&__p();a=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){if(this.props.isPreview)return this.$1();var a=this.$2();a=this.$3(a);return b("React").jsxs("div",{className:(this.props.inline?"":"_3htz")+(this.props.inline?" _3qry":"")+(this.props.inline?"":" _2659")+(this.props.inline?"":" _530p")+" _4ubd _2lwf"+(this.props.isLive?" _3rno":"")+(this.props.inline?"":" _6xrw")+(this.props.inline?" _6xrt":""),children:[a,b("React").jsx(b("VideoConcurrentViewerCount.react"),{pageCount:this.props.pageCount,viewerCount:this.props.viewerCount})]})};d.$3=function(a){var c=!this.props.isRewound&&this.props.showElapsedTime&&this.props.startTime?b("React").jsx("span",{className:"_2nwf",children:b("React").jsx(b("Duration.react"),{startTime:this.props.startTime*b("DateConsts").MS_PER_SEC,useLocalTime:!0})}):null,d,e;this.props.inBeeper?(d="_60yg",e="_60yf"):this.props.isRewound?(d="_1dvf",e="_1dvg"):(d="_5pe-"+(this.props.isRehearsal?" _1dvf":""),e="_2wrk"+(this.props.isRehearsal?" _7bca":""));return a?b("React").jsx("div",{className:d,"data-testid":"live-indicator",children:b("React").jsxs("span",{className:e,children:[a,c]})}):null};d.$2=function(){if(this.props.isBreakingNews)return h._("\u0421\u0420\u041e\u0427\u041d\u041e");if(this.props.textOverride)return this.props.textOverride;return this.props.isPremiere?h._("\u041f\u0420\u0415\u041c\u042c\u0415\u0420\u0410"):this.props.isLive?h._("\u041f\u0420\u042f\u041c\u041e\u0419 \u042d\u0424\u0418\u0420"):null};d.$1=function(){return b("React").jsx("div",{className:"_5vj",children:b("React").jsx("div",{className:"_5vm",children:b("React").jsx("span",{className:"_5vo",children:h._("\u041f\u0420\u0415\u0414\u0412\u0410\u0420\u0418\u0422\u0415\u041b\u042c\u041d\u042b\u0419 \u041f\u0420\u041e\u0421\u041c\u041e\u0422\u0420")})})})};return c}(b("React").PureComponent);e.exports=a}),null);
__d("LiveVideoPlayerDispatcher",["ExplicitRegistrationReactDispatcher"],(function(a,b,c,d,e,f){"use strict";a=function(a){babelHelpers.inheritsLoose(b,a);function b(b){b=a.call(this,b)||this;babelHelpers.assertThisInitialized(b).dispatch=b.dispatch.bind(babelHelpers.assertThisInitialized(b));return b}return b}(b("ExplicitRegistrationReactDispatcher"));e.exports=new a({strict:!0})}),null);
__d("LiveVideoPlayerConstants",[],(function(a,b,c,d,e,f){"use strict";a={ACTIONS:{SET_IS_REWOUND:"SET_IS_REWOUND",DISMISS_REWIND_COMMENT_OVERLAY:"DISMISS_REWIND_COMMENT_OVERLAY"}};e.exports=a}),null);
__d("LiveVideoPlayerStore",["FluxReduceStore","LiveVideoPlayerConstants","LiveVideoPlayerDispatcher","immutable"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("LiveVideoPlayerConstants").ACTIONS;a=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.getInitialState=function(){return b("immutable").Map({})};d.getIsRewound=function(a){return this.getState().getIn([a,"isRewound"],!1)};d.getIsRewindCommentOverlayDismissed=function(a){return this.getState().getIn([a,"isRewindCommentOverlayDismissed"],!1)};d.$LiveVideoPlayerStore1=function(a,b){var c=this;a.hasOption("LivePlayer","isRewound")||a.registerOption("LivePlayer","isRewound",function(){return c.getIsRewound(a.getVideoPlayerID())});a.emit("LivePlayer/isRewoundChanged")};d.reduce=function(a,b){__p&&__p();var c=this;switch(b.type){case g.DISMISS_REWIND_COMMENT_OVERLAY:a=a.setIn([b.playerID,"isRewindCommentOverlayDismissed"],!0);break;case g.SET_IS_REWOUND:var d=b.vpc,e=b.isRewound;a=a.setIn([d.getVideoPlayerID(),"isRewound"],e);setTimeout(function(){return c.$LiveVideoPlayerStore1(d,e)},0);d.setEnableLiveheadCatchup(!e);break;default:break}return a};return c}(b("FluxReduceStore"));a.__moduleID=e.id;e.exports=new a(b("LiveVideoPlayerDispatcher"))}),null);
__d("LiveVideoIndicatorContainer.react",["FluxContainer","LiveVideoIndicator.react","LiveVideoPlayerDispatcher","LiveVideoPlayerStore","React"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);c.getStores=function(){return[b("LiveVideoPlayerStore")]};c.calculateState=function(a,c){a=b("LiveVideoPlayerStore").getIsRewound(c.playerID);return{isRewound:a}};function c(c){c=a.call(this,c)||this;b("LiveVideoPlayerDispatcher").explicitlyRegisterStores([b("LiveVideoPlayerStore")]);return c}var d=c.prototype;d.render=function(){return b("React").jsx(b("LiveVideoIndicator.react"),{inline:this.props.inline,inBeeper:this.props.inBeeper,isAudio:this.props.isAudio,isBreakingNews:this.props.isBreakingNews,isLive:this.props.isLive,isPremiere:this.props.isPremiere,isPreview:this.props.isPreview,isRehearsal:this.props.isRehearsal,isRewound:this.state.isRewound,pageCount:this.props.pageCount,showElapsedTime:this.props.showElapsedTime,startTime:this.props.startTime,textOverride:this.props.textOverride,viewerCount:this.props.viewerCount})};return c}(b("React").Component);e.exports=b("FluxContainer").create(a,{withProps:!0})}),null);
__d("LiveVideoIndicatorContainerServerCallable.react",["DateConsts","FBJSON","LiveVideoIndicatorContainer.react","React","SubscriptionsHandler","clearInterval","setInterval"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=3*b("DateConsts").MS_PER_SEC;a=function(a){__p&&__p();babelHelpers.inheritsLoose(c,a);function c(){var b,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(b=c=a.call.apply(a,[this].concat(e))||this,c.state={showElapsedTime:!1,viewerCount:c.props.viewerCount},b)||babelHelpers.assertThisInitialized(c)}var d=c.prototype;d.componentDidMount=function(){__p&&__p();var a=this;this.subscriptions=new(b("SubscriptionsHandler"))();this.subscriptions.addSubscriptions(this.props.videoPlayerController.addListener("VideoWithLiveBroadcast/viewCountChange",function(c){c=c.getAttribute("data-store");c=c?b("FBJSON").parse(c).viewerCount:null;a.setState({viewerCount:c})}),this.props.videoPlayerController.addListener("unifiedCVC/update",function(b){a.setState({viewerCount:b.c})}));this.props.showTimePop&&this.props.broadcastCreationTime&&this.subscriptions.addSubscriptions(this.props.videoPlayerController.addListener("beginPlayback",function(){a.setState({showElapsedTime:!0});var c=b("setInterval")(function(){a.setState({showElapsedTime:!1}),b("clearInterval")(c)},g)}))};d.componentWillUnmount=function(){this.subscriptions.release()};d.render=function(){return b("React").jsx(b("LiveVideoIndicatorContainer.react"),{inline:this.props.inline,inBeeper:this.props.inBeeper,isAudio:this.props.isAudio,isBreakingNews:this.props.isBreakingNews,isLive:this.props.isLive,isPremiere:this.props.isPremiere,isPreview:this.props.isPreview,isRehearsal:this.props.isRehearsal,pageCount:this.props.pageCount,playerID:this.props.videoPlayerController.getVideoPlayerID(),showElapsedTime:this.state.showElapsedTime,startTime:this.props.broadcastCreationTime,textOverride:this.props.textOverride,viewerCount:this.state.viewerCount})};return c}(b("React").Component);e.exports=a}),null);