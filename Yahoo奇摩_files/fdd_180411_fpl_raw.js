var yad_richmedia={};
yad_richmedia.lang=yad_richmedia.lang||{};(function(){var A=yad_richmedia.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}}},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);})();
yad_richmedia.Cookie={_createCookieString:function(B,D,C,A){var F=yad_richmedia.lang;var E=encodeURIComponent(B)+"="+(C?encodeURIComponent(D):D);if(F.isObject(A)){if(A.expires instanceof Date){E+="; expires="+A.expires.toGMTString();}if(F.isString(A.path)&&A.path!=""){E+="; path="+A.path;}if(F.isString(A.domain)&&A.domain!=""){E+="; domain="+A.domain;}if(A.secure===true){E+="; secure";}}return E;},_createCookieHashString:function(B){var D=yad_richmedia.lang;if(!D.isObject(B)){throw new TypeError("Cookie._createCookieHashString(): Argument must be an object.");}var C=new Array();for(var A in B){if(D.hasOwnProperty(B,A)&&!D.isFunction(B[A])&&!D.isUndefined(B[A])){C.push(encodeURIComponent(A)+"="+encodeURIComponent(String(B[A])));}}return C.join("&");},_parseCookieHash:function(E){var D=E.split("&");var F=null;var C=new Object();for(var B=0,A=D.length;B<A;B++){F=D[B].split("=");C[decodeURIComponent(F[0])]=decodeURIComponent(F[1]);}return C;},_parseCookieString:function(I,A){var J=new Object();if(yad_richmedia.lang.isString(I)&&I.length>0){var B=(A===false?function(K){return K;}:decodeURIComponent);if(/[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(I)){var G=I.split(/;\s/g);var H=null;var C=null;var E=null;for(var D=0,F=G.length;D<F;D++){E=G[D].match(/([^=]+)=/i);if(E instanceof Array){H=decodeURIComponent(E[1]);C=B(G[D].substring(H.length+1));}else{H=decodeURIComponent(G[D]);C=H;}J[H]=C;}}}return J;},get:function(A,B){var D=yad_richmedia.lang;var C=this._parseCookieString(document.cookie);if(!D.isString(A)||A===""){throw new TypeError("Cookie.get(): Cookie name must be a non-empty string.");}if(D.isUndefined(C[A])){return null;}if(!D.isFunction(B)){return C[A];}else{return B(C[A]);}},getSub:function(A,C,B){var E=yad_richmedia.lang;var D=this.getSubs(A);if(D!==null){if(!E.isString(C)||C===""){throw new TypeError("Cookie.getSub(): Subcookie name must be a non-empty string.");}if(E.isUndefined(D[C])){return null;}if(!E.isFunction(B)){return D[C];}else{return B(D[C]);}}else{return null;}},getSubs:function(A){if(!yad_richmedia.lang.isString(A)||A===""){throw new TypeError("Cookie.getSubs(): Cookie name must be a non-empty string.");}var B=this._parseCookieString(document.cookie,false);if(yad_richmedia.lang.isString(B[A])){return this._parseCookieHash(B[A]);}return null;},remove:function(B,A){if(!yad_richmedia.lang.isString(B)||B===""){throw new TypeError("Cookie.remove(): Cookie name must be a non-empty string.");}A=A||{};A.expires=new Date(0);return this.set(B,"",A);},set:function(B,C,A){var E=yad_richmedia.lang;if(!E.isString(B)){throw new TypeError("Cookie.set(): Cookie name must be a string.");}if(E.isUndefined(C)){throw new TypeError("Cookie.set(): Value cannot be undefined.");}var D=this._createCookieString(B,C,true,A);document.cookie=D;return D;},setSub:function(B,D,C,A){var F=yad_richmedia.lang;if(!F.isString(B)||B===""){throw new TypeError("Cookie.setSub(): Cookie name must be a non-empty string.");}if(!F.isString(D)||D===""){throw new TypeError("Cookie.setSub(): Subcookie name must be a non-empty string.");}if(F.isUndefined(C)){throw new TypeError("Cookie.setSub(): Subcookie value cannot be undefined.");}var E=this.getSubs(B);if(!F.isObject(E)){E=new Object();}E[D]=C;return this.setSubs(B,E,A);},setSubs:function(B,C,A){var E=yad_richmedia.lang;if(!E.isString(B)){throw new TypeError("Cookie.setSubs(): Cookie name must be a string.");}if(!E.isObject(C)){throw new TypeError("Cookie.setSubs(): Cookie value must be an object.");}var D=this._createCookieString(B,this._createCookieHashString(C),false,A);document.cookie=D;return D;}};
var yad_cookie = yad_richmedia.Cookie;
var FPLCookie = function(){
	if(typeof(yad_richmedia) != "undefined"){
		if(yad_cookie.get(FPLad) == null){
			FPLflag = 1;
			var now = new Date();
			var tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000 * FPLexpireDay);
			yad_cookie.set(FPLad, FPLad, {expires: tomorrow});
			yad_cookie.set(FPLad + ".adTimes", 1, {expires: tomorrow});
			yad_cookie.set(FPLad + ".adExpire", tomorrow, {expires: tomorrow});
		}else{
			FPLflag = yad_cookie.get(FPLad + ".adTimes");
			if(FPLflag <= FPLcaps){
				FPLflag++;
				var tomorrow = new Date(yad_cookie.get(FPLad + ".adExpire"));
				yad_cookie.set(FPLad + ".adTimes", FPLflag, {expires: tomorrow});
			}
		}
		return FPLflag;
	}
};
var FPLdomain = document.domain;
var myBrw = "";
var FPLflag = 0;
var FPLtimer = 0;
var FPLmaxURL = 10;
var FPLStop = true;
var isFPLLoaded = false;

if(navigator.userAgent && navigator.userAgent.indexOf("Windows") >= 0){
	if((navigator.userAgent.indexOf("MSIE") >= 0) || navigator.userAgent.indexOf("Trident/7.0") >= 0){
		if(navigator.userAgent.indexOf("Trident/7.0") >= 0){
			myBrw = "ie11";
		} else if(navigator.userAgent.indexOf("Trident/6.0") >= 0){
			myBrw = "ie10";
		} else if(navigator.userAgent.indexOf("Trident/5.0") >= 0){
			myBrw = "ie9";
		} else {
			myBrw = "ie";
		}
	}else if(navigator.userAgent.indexOf("Firefox") >= 0){
		myBrw = "firefox";
	}else if(navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome")>=0){
		myBrw = "chrome";
	}else if(navigator.userAgent.indexOf("Safari") >= 0){
		myBrw = "safari";
	}
}else if(navigator.userAgent && navigator.userAgent.indexOf("Mac")>=0){
	if(navigator.userAgent.indexOf("Firefox")>=0){
		myBrw = "firefox";
	}else if(navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome")>=0){
		myBrw = "chrome";
	}else if(navigator.userAgent.indexOf("Safari") >= 0){
		myBrw = "safari";
	}
}
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
}
function FPLalert(args){
	if(FPLoxBug == true){
		if(typeof(console) != "undefined"){
			console.log(args);
		}else{
			alert(args);
		}
	}
}
function FPLshowAD(){
	if(!isMobile.any() && (myBrw=="ie10" || myBrw=="ie11" || myBrw=="firefox" || myBrw=="chrome" || myBrw=="safari")){
		return true;
	}
}
function FPLjp0(n,s,u) {
	if (FPLr0 != null) {
		var seedNumber = Math.floor(Math.random()*100000).toString();
		var img = new Image;
		img.src = FPLbeap[0] + 'seq$' + n + ',label$'+ s + ",type$click" + FPLbeap[1]+"&uniqueVal="+seedNumber;
		if(FPLoxBug){
			FPLalert(img.src);
		}
	}
	return u;
}
function FPLjp(r,s,u) {
	var h = "";
	if (FPLr0 != null) {
		if(FPLoxBug){
			FPLalert("R= "+r+" / id= "+s);
		}else{
			if(document.getElementById("my-adsFPL") != null){
				if (FPLrB && FPLrB.indexOf("))/*") != -1) {
					var i = FPLrB.indexOf("))/*"); //if so, check to see if the ClientSideEditable string has "))/*http" in it.
					if(i!= -1) {
						i+=2;
						h= FPLrB.substring(0,i) +"&id="+s+"&r="+r+"/*" + u;              //if ClientSideEditable is in the format we want, then extract the first half or it and generate the redirect string with the id and label
					} else {
						h=FPLr0.substring(0,FPLr0.length-9)+"R="+r+"/X=3/id="+s+"/*"+u;     //if the ClientSideEditable string is unrecognizable, then APT did something weird and just re-format FPLr0 the way we used to and risk double-tracking
					}
					return h;
				}
			}else{
				return u; // for click when preview in APT
			}
		}
	}
	return u; // return h;
}
function moveIt(open) {
	FPLalert("moveIt =" + open);
	document.getElementsByTagName('body')[0].style.overflowX = "hidden";
	var waitingforMove = function() {
		if (open) {
			if (document.querySelector(".M-0.js-applet.breakingnews div") != null) {
				document.querySelector(".M-0.js-applet.breakingnews div").style.display = "none";
			}
			// if (document.querySelector(".yvp-flash-video") != null) {
			// 	document.querySelector(".yvp-flash-video").style.visibility = "hidden";
			// } else if (document.querySelector(".yvp-html5-video") != null) {
			// 	document.querySelector(".yvp-html5-video").style.visibility = "hidden";
			// }
			// if (isFPLLoaded == true && isFPRLoaded == true && isCRAZYLoaded == true){
			// if (isCRAZYLoaded == true){
			var newSXspeed = Math.ceil((FPLopenH - FPLHnow) / 5);
			document.getElementById("CRAZYiframe").src = "";
			document.getElementById("FPLiframe").src = "";
			document.getElementById("FPRiframe").src = "";
			// FPT_DIV.style.visibility = "hidden";
			FPL_DIV.style.visibility = "hidden";
			FPR_DIV.style.visibility = "hidden";
			// FPT_DIV.style.display = "none";
			if (newSXspeed >= 1) {
				FPLStop = false;
				FPLHnow = FPLHnow + newSXspeed;
				FPL_DIV.style.height = FPLHnow + 'px';
			} else {

				clearInterval(fplmove);
				FPLStop = true;
				FPLHnow = FPLopenH;
				FPL_DIV.style.height = FPLHnow + 'px';
				document.getElementById("FPLiframe").height = FPLHnow + 'px';
				// FPTObj.height = FPTopenH + 'px';
				// FPLObj.height = FPLopenH + 'px';
				FPLjp0(-2, 'fpl_load_float_start', '');
				CRAZY_DIV.style.visibility = "";
				CRAZY_DIV.style.zIndex = "999";
				// CRAZY_DIV.style.display = "";
				// CRAZY_DIV.style.top = "-224px";
				FPL_DIV.style.visibility = "";
				FPR_DIV.style.visibility = "";
				document.getElementById("CRAZYiframe").src = FPRdir + CRAZYhtml;
				document.getElementById("FPLiframe").src = FPLdir + FPLAutohtml;
				document.getElementById("FPRiframe").src = FPRdir + FPRAutohtml;
				document.getElementById("FPR_fto_close").style.display = "block";


				// document.getElementById('Navigation').style.backgroundImage = "";
				document.getElementsByClassName('Col3 End-0')[0].style.zIndex = "9"; // IE9+
				// CRAZY_DIV.style.zIndex = "-999";
				// CRAZY_DIV.style.display = "none";
				// FPRVIDEO_DIV.style.display = "";
				// videoInit();
				// getController().play();
				// document.getElementsByClassName('Col3')[0].style.zIndex = "0"; // IE9+

			}
		} else {

			// document.getElementById('CRAZYiframe').style.display = "none";
			// document.getElementById('CRAZYiframe').src = "";
			// CRAZY_DIV.style.top = "-1000px";
			CRAZY_DIV.style.zIndex = "-999";
			CRAZY_DIV.style.visibility = "hidden";
			// FPLObj.height = FPLcloseH + 'px';
			// FPTObj.height = FPTcloseH + 'px';
			FPL_DIV.style.visibility = "hidden";
			FPR_DIV.style.visibility = "hidden";
			document.getElementById("CRAZYiframe").src = "";
			document.getElementById("FPLiframe").src = "";
			document.getElementById("FPRiframe").src = "";
			var newSXspeed = Math.ceil((FPLHnow - FPLcloseH) / 5);
			if (newSXspeed >= 1) {
				FPLStop = false;
				FPLHnow = FPLHnow - newSXspeed;
				FPL_DIV.style.height = FPLHnow + 'px';
			} else {
				clearInterval(fplmove);
				FPLStop = true;
				FPLHnow = FPLcloseH;
				FPL_DIV.style.height = FPLcloseH + 'px';
				// FPTObj.height = FPTcloseH + 'px';
				// FPLObj.height = FPLcloseH + 'px';


				// FPT_DIV.style.visibility = "";
				// FPT_DIV.style.display = "";
				document.getElementById("FPR_fto_replay").style.display = "block";
				document.getElementsByTagName('body')[0].style.overflowX = "auto";
				// document.getElementsByClassName('Col3 End-0')[0].style.zIndex = "0"; // IE9+
				FPL_DIV.style.visibility = "";
				FPR_DIV.style.visibility = "";
				// document.getElementById('FPLiframe').contentWindow.postMessage('goto=banner', FPLremoteDomain);
				// document.getElementById('FPRiframe').contentWindow.postMessage('goto=banner', FPRremoteDomain);
				// document.getElementById('FPTiframe').contentWindow.postMessage('goto=banner', FPTremoteDomain);
				// FPL_DIV.style.display = "block";
				// FPR_DIV.style.display = "block";
				document.getElementById("FPLiframe").src = FPLdir + FPLCappedhtml;
				document.getElementById("FPRiframe").src = FPRdir + FPRCappedhtml;
				// document.getElementById("FPRiframe").src = "https://s.yimg.com/cv/ae/tw/bwchou/fto_O-406449_160621a_374x210.html";
				// document.getElementById('TAKEOVERiframe').contentWindow.postMessage('goto=opening', FPRremoteDomain);
				// document.querySelector("#abu-live").style.display = "";
				// document.querySelector("#my-adsFPAD-base").style.marginTop = "";
				// clearInterval(hideRR);
				// document.querySelector("#abu-live").style.visibility = "";
				// 		if (document.querySelector(".yvp-flash-video") != null) {
				// 			document.querySelector(".yvp-flash-video").style.display = "";
				// 			document.querySelector(".yvp-flash-video").style.visibility = "";
				// 		}
				// 		if (document.querySelector(".yvp-html5-video") != null) {
				// 			document.querySelector(".yvp-html5-video").style.display = "";
				// 			document.querySelector(".yvp-html5-video").style.visibility = "";
				// 		}
				// 		if (document.querySelector(".yvp-html5-video.yvp-renderer-active") != null) {
				// 			document.querySelector(".yvp-html5-video.yvp-renderer-active").style.display = "";
				// 			document.querySelector(".yvp-html5-video.yvp-renderer-active").style.visibility = "";
				// 		}
					if (document.querySelector(".M-0.js-applet.breakingnews div") != null) {
						document.querySelector(".M-0.js-applet.breakingnews div").style.display = "block";
					}
			}
		}
	}
	fplmove = setInterval(waitingforMove, 20);
}


// function FPLcheckIframeUser(){
// 	FPLalert("FPLcheckIframeUser");
// 	// if (isCRAZYLoaded == true){
// 		FPLalert("CRAZY iFrame(s) User LOADED!");
// 		clearInterval(FPLcheckItUser);
// 		// FPLjp0(-4, 'crazy_adplay', '');
// 		document.getElementsByClassName('Col3 End-0')[0].style.zIndex = "9"; // IE9+
// 		// document.getElementById('Main').style.zIndex = "2";
// 		CRAZY_DIV.style.zIndex = "10";
// 		CRAZY_DIV.style.visibility = "";
// 		CRAZY_DIV.style.display = "";
// 		// CRAZY_DIV.style.top = "-224px";
// 		document.getElementById("FPR_fto_close").style.display = "none";
// 		document.getElementById("FPR_fto_replay").style.display = "none";
// 		document.getElementById('CRAZYiframe').contentWindow.postMessage('goto=first', FPLremoteDomain);
// 	// }
// }

// function FPLloadDetectionUser() {
// 	FPLalert("FPLloadDetectionUser");
// 	FPLcheckItUser = setInterval(FPLcheckIframeUser, 100);
// }

// function FPL_call(command, args){
// 	FPLalert("FPL_call"+"="+command+" / "+args);
// 	if (command == "crazy1") {
// 		isCRAZYLoaded = false;
// 		document.getElementById("CRAZYiframe").src = FPRdir + CRAZYhtml1a;
// 		document.getElementById('CRAZYiframe').onload = function() {
// 			isCRAZYLoaded = true;
// 		}
// 		FPLloadDetectionUser();
// 		FPLjp0(11, 'crazy1', '');
// 	}
// }


// handleFPLJumpingResponse = function(e) {
// 	// FPLalert("handleFPLJumpingResponse= "+e.data);
// 	if(e.origin == FPLremoteDomain) {
// 		// if(e.data == "done"){
// 		// 	FPL_call("done");
// 		// }
// 		if(e.data == "crazy1"){
// 			FPL_call("crazy1");
// 		}
// 	}
// }
// // window.addEventListener('message', handleFPLJumpingResponse, false);
// if (window.addEventListener) {
// 	window.addEventListener('message', handleFPLJumpingResponse, false);
// } else {
// 	window.attachEvent('onmessage', handleFPLJumpingResponse);
// }
FPLCookie();
var FPL_flashvars = "", FPL_clickTAG = "clickTAG";
for(var i=0; i < FPLURL.length; i++){
	// (i == 0) ? (FPL_flashvars += FPL_clickTAG + "=" + encodeURIComponent(FPLjp(3, "fpl_click", FPLURL[i])) + "&") : (FPL_flashvars += FPL_clickTAG + i + "=" + encodeURIComponent(FPLjp(30+Number(i), "fpl_click"+i, FPLURL[i])) + "&");
	// (i == 0) ? (CRAZY_flashvars += CRAZY_clickTAG + "=" + encodeURIComponent(FPLjp(6, "crazy_click", FPLURL[i])) + "&") : (CRAZY_flashvars += CRAZY_clickTAG + i + "=" + encodeURIComponent(FPLjp(60+Number(i), "crazy_click"+i, FPLURL[i])) + "&");
	i == 0 ? FPL_flashvars += '"' + FPL_clickTAG + '":"' + encodeURIComponent(FPLjp(3, "fpl_click", FPLURL[i]).replace(/&amp;/g, "&")) + '"' : FPL_flashvars += ',"' + FPL_clickTAG + (i + 1) + '":"' + encodeURIComponent(FPLjp(30+Number(i), "fpl_click", FPLURL[i]).replace(/&amp;/g, "&")) + '"';
	// i == 0 ? CRAZY_flashvars += '"' + CRAZY_clickTAG + '":"' + encodeURIComponent(FPLjp(7, "crazy_click", FPLURL[i]).replace(/&amp;/g, "&")) + '"' : CRAZY_flashvars += ',"' + CRAZY_clickTAG + (i + 1) + '":"' + encodeURIComponent(FPLjp(70+Number(i), "takeover_click", FPLURL[i]).replace(/&amp;/g, "&")) + '"';
}
if(FPLflag == 1){
	FPLjp0(-3, 'fpl_load_ad_html', '');
}
var FPLgetBody=document.getElementsByTagName('body')[0];
var FPLHnow = (FPLflag > FPLcaps) ? FPLcloseH : FPLopenH;
if(FPLshowAD() && FPLgetBody && (document.getElementById("my-adsFPL") != null)){
	if (FPLflag < 3){
		document.write("<div id=FPLdiv align=center style=visibility:hidden;position:relative;overflow:hidden;height:"+ FPLHnow + "px><iframe id=FPLiframe scrolling=no frameborder=0 style=left:50%;margin-left:-317px;position:absolute;border:0px;padding:0px; src=" + FPLdir + FPLAutohtml + " name='{" + FPL_flashvars + "}' width=635px height=" + FPLopenH + "px><\/iframe><\/div>");
	} else {
		document.write("<div id=FPLdiv align=center style=visibility:hidden;position:relative;overflow:hidden;height:"+ FPLHnow + "px><iframe id=FPLiframe scrolling=no frameborder=0 style=left:50%;margin-left:-317px;position:absolute;border:0px;padding:0px; src=" + FPLdir + FPLCappedhtml + " name='{" + FPL_flashvars + "}' width=635px height=" + FPLcloseH + "px><\/iframe><\/div>");
	}
	var FPL_DIV = document.getElementById("FPLdiv");
	document.getElementById('FPLiframe').onload = function() {
		isFPLLoaded = true;
	}
}else{
	if(FPLURL[0] != ""){
		document.write("<div style=\"margin: 0; height: "+FPLcloseH+"px; width: 100%; background: transparent url('"+ FPLdir + FPLaltimg +"') no-repeat center; overflow: hidden; cursor: pointer;\" onclick=\"window.open('"+FPLjp(2, "fpl_click_fpl_clicktagbackup", FPLURL[0])+"');\"><\/div>")
	}else{
		document.write("<img src=" + FPLdir+FPLaltimg + " width=100% height=" + FPLcloseH +" border=0>");
	}
}
