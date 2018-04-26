var yad_richmedia={};
yad_richmedia.lang=yad_richmedia.lang||{};(function(){var A=yad_richmedia.lang,C=["toString","valueOf"],B={isArray:function(D){if(D){return A.isNumber(D.length)&&A.isFunction(D.splice);}return false;},isBoolean:function(D){return typeof D==="boolean";},isFunction:function(D){return typeof D==="function";},isNull:function(D){return D===null;},isNumber:function(D){return typeof D==="number"&&isFinite(D);},isObject:function(D){return(D&&(typeof D==="object"||A.isFunction(D)))||false;},isString:function(D){return typeof D==="string";},isUndefined:function(D){return typeof D==="undefined";},augmentObject:function(H,G){if(!G||!H){throw new Error("Absorb failed, verify dependencies.");}var D=arguments,F,I,E=D[2];if(E&&E!==true){for(F=2;F<D.length;F=F+1){H[D[F]]=G[D[F]];}}else{for(I in G){if(E||!(I in H)){H[I]=G[I];}}}},dump:function(D,I){var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";if(!A.isObject(D)){return D+"";}else{if(D instanceof Date||("nodeType" in D&&"tagName" in D)){return D;}else{if(A.isFunction(D)){return E;}}}I=(A.isNumber(I))?I:3;if(A.isArray(D)){K.push("[");for(F=0,H=D.length;F<H;F=F+1){if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}if(K.length>1){K.pop();}K.push("]");}else{K.push("{");for(F in D){if(A.hasOwnProperty(D,F)){K.push(F+G);if(A.isObject(D[F])){K.push((I>0)?A.dump(D[F],I-1):L);}else{K.push(D[F]);}K.push(J);}}if(K.length>1){K.pop();}K.push("}");}return K.join("");},isValue:function(D){return(A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));}};A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){return D&&D.hasOwnProperty(E);}:function(D,E){return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];};B.augmentObject(A,B,true);})();
yad_richmedia.Cookie={_createCookieString:function(B,D,C,A){var F=yad_richmedia.lang;var E=encodeURIComponent(B)+"="+(C?encodeURIComponent(D):D);if(F.isObject(A)){if(A.expires instanceof Date){E+="; expires="+A.expires.toGMTString();}if(F.isString(A.path)&&A.path!=""){E+="; path="+A.path;}if(F.isString(A.domain)&&A.domain!=""){E+="; domain="+A.domain;}if(A.secure===true){E+="; secure";}}return E;},_createCookieHashString:function(B){var D=yad_richmedia.lang;if(!D.isObject(B)){throw new TypeError("Cookie._createCookieHashString(): Argument must be an object.");}var C=new Array();for(var A in B){if(D.hasOwnProperty(B,A)&&!D.isFunction(B[A])&&!D.isUndefined(B[A])){C.push(encodeURIComponent(A)+"="+encodeURIComponent(String(B[A])));}}return C.join("&");},_parseCookieHash:function(E){var D=E.split("&");var F=null;var C=new Object();for(var B=0,A=D.length;B<A;B++){F=D[B].split("=");C[decodeURIComponent(F[0])]=decodeURIComponent(F[1]);}return C;},_parseCookieString:function(I,A){var J=new Object();if(yad_richmedia.lang.isString(I)&&I.length>0){var B=(A===false?function(K){return K;}:decodeURIComponent);if(/[^=]+=[^=;]?(?:; [^=]+=[^=]?)?/.test(I)){var G=I.split(/;\s/g);var H=null;var C=null;var E=null;for(var D=0,F=G.length;D<F;D++){E=G[D].match(/([^=]+)=/i);if(E instanceof Array){H=decodeURIComponent(E[1]);C=B(G[D].substring(H.length+1));}else{H=decodeURIComponent(G[D]);C=H;}J[H]=C;}}}return J;},get:function(A,B){var D=yad_richmedia.lang;var C=this._parseCookieString(document.cookie);if(!D.isString(A)||A===""){throw new TypeError("Cookie.get(): Cookie name must be a non-empty string.");}if(D.isUndefined(C[A])){return null;}if(!D.isFunction(B)){return C[A];}else{return B(C[A]);}},getSub:function(A,C,B){var E=yad_richmedia.lang;var D=this.getSubs(A);if(D!==null){if(!E.isString(C)||C===""){throw new TypeError("Cookie.getSub(): Subcookie name must be a non-empty string.");}if(E.isUndefined(D[C])){return null;}if(!E.isFunction(B)){return D[C];}else{return B(D[C]);}}else{return null;}},getSubs:function(A){if(!yad_richmedia.lang.isString(A)||A===""){throw new TypeError("Cookie.getSubs(): Cookie name must be a non-empty string.");}var B=this._parseCookieString(document.cookie,false);if(yad_richmedia.lang.isString(B[A])){return this._parseCookieHash(B[A]);}return null;},remove:function(B,A){if(!yad_richmedia.lang.isString(B)||B===""){throw new TypeError("Cookie.remove(): Cookie name must be a non-empty string.");}A=A||{};A.expires=new Date(0);return this.set(B,"",A);},set:function(B,C,A){var E=yad_richmedia.lang;if(!E.isString(B)){throw new TypeError("Cookie.set(): Cookie name must be a string.");}if(E.isUndefined(C)){throw new TypeError("Cookie.set(): Value cannot be undefined.");}var D=this._createCookieString(B,C,true,A);document.cookie=D;return D;},setSub:function(B,D,C,A){var F=yad_richmedia.lang;if(!F.isString(B)||B===""){throw new TypeError("Cookie.setSub(): Cookie name must be a non-empty string.");}if(!F.isString(D)||D===""){throw new TypeError("Cookie.setSub(): Subcookie name must be a non-empty string.");}if(F.isUndefined(C)){throw new TypeError("Cookie.setSub(): Subcookie value cannot be undefined.");}var E=this.getSubs(B);if(!F.isObject(E)){E=new Object();}E[D]=C;return this.setSubs(B,E,A);},setSubs:function(B,C,A){var E=yad_richmedia.lang;if(!E.isString(B)){throw new TypeError("Cookie.setSubs(): Cookie name must be a string.");}if(!E.isObject(C)){throw new TypeError("Cookie.setSubs(): Cookie value must be an object.");}var D=this._createCookieString(B,this._createCookieHashString(C),false,A);document.cookie=D;return D;}};
var yad_cookie = yad_richmedia.Cookie;
var FPRCookie = function() {
	if (typeof(yad_richmedia) != "undefined") {
		if (yad_cookie.get(FPRad) == null) {
			FPRflag = 1;
			var now = new Date();
			var tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000 * FPRexpireDay);
			yad_cookie.set(FPRad, FPRad, { expires: tomorrow });
			yad_cookie.set(FPRad + ".adTimes", 1, { expires: tomorrow });
			yad_cookie.set(FPRad + ".adExpire", tomorrow, { expires: tomorrow });
		} else {
			FPRflag = yad_cookie.get(FPRad + ".adTimes");
			if (FPRflag <= FPRcaps) {
				FPRflag++;
				var tomorrow = new Date(yad_cookie.get(FPRad + ".adExpire"));
				yad_cookie.set(FPRad + ".adTimes", FPRflag, { expires: tomorrow });
			}
		}
		return FPRflag;
	}
};
var FPRdomain = document.domain;
var myBrw = "";
var FPRflag = 0;
var FPRmaxURL = 10;
var FPRv_sequence = 0;
var FPRreplay = false;
// var isTAKEOVERLoaded = false;
var isFPRLoaded = false;
var isCRAZYLoaded = false;
// var isFPRVideoLoaded = false;
// var hasCounted0 = false;
// var hasCounted25 = false;
// var hasCounted50 = false;
// var hasCounted75 = false;
// var hasCounted100 = false;

if (navigator.userAgent && navigator.userAgent.indexOf("Windows") >= 0) {
	if ((navigator.userAgent.indexOf("MSIE") >= 0) || navigator.userAgent.indexOf("Trident/7.0") >= 0) {
		if (navigator.userAgent.indexOf("Trident/7.0") >= 0) {
			myBrw = "ie11";
		} else if (navigator.userAgent.indexOf("Trident/6.0") >= 0) {
			myBrw = "ie10";
		} else if (navigator.userAgent.indexOf("Trident/5.0") >= 0) {
			myBrw = "ie9";
		} else {
			myBrw = "ie";
		}
	} else if (navigator.userAgent.indexOf("Firefox") >= 0) {
		myBrw = "firefox";
	} else if (navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome") >= 0) {
		myBrw = "chrome";
	} else if (navigator.userAgent.indexOf("Safari") >= 0) {
		myBrw = "safari";
	}
} else if (navigator.userAgent && navigator.userAgent.indexOf("Mac") >= 0) {
	if (navigator.userAgent.indexOf("Firefox") >= 0) {
		myBrw = "firefox";
	} else if (navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome") >= 0) {
		myBrw = "chrome";
	} else if (navigator.userAgent.indexOf("Safari") >= 0) {
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

function FPRalert(args) {
	if (FPRoxBug == true) {
		if (typeof(console) != "undefined") {
			console.log(args);
		} else {
			alert(args);
		}
	}
}

function FPRshowAD() {
	if (!isMobile.any() && (myBrw == "ie10" || myBrw == "ie11" || myBrw == "firefox" || myBrw == "chrome" || myBrw=="safari")) {
		return true;
	}
}

function FPRjp0(n, s, u) {
	if (FPRr0 != null) {
		var seedNumber = Math.floor(Math.random() * 100000).toString();
		var img = new Image;
		img.src = FPRbeap[0] + 'seq$' + n + ',label$' + s + ",type$click" + FPRbeap[1] + "&uniqueVal=" + seedNumber;
		if (FPRoxBug) {
			FPRalert(img.src);
		}
	}
	return u;
}

function FPRjp(r, s, u) {
	var h = "";
	if (FPRr0 != null) {
		if (FPRoxBug) {
			FPRalert("R= " + r + " / id= " + s);
		} else {
			if (document.getElementById("my-adsFPR") != null) {
				if (FPRrB && FPRrB.indexOf("))/*") != -1) {
					var i = FPRrB.indexOf("))/*"); //if so, check to see if the ClientSideEditable string has "))/*http" in it.
					if (i != -1) {
						i += 2;
						h = FPRrB.substring(0, i) + "&id=" + s + "&r=" + r + "/*" + u; //if ClientSideEditable is in the format we want, then extract the first half or it and generate the redirect string with the id and label
					} else {
						h = FPRr0.substring(0, FPRr0.length - 9) + "R=" + r + "/X=3/id=" + s + "/*" + u; //if the ClientSideEditable string is unrecognizable, then APT did something weird and just re-format FPLr0 the way we used to and risk double-tracking
					}
					return h;
				}
			} else {
				return u; // for click when preview in APT
			}
		}
	}
	return u; // return h;
}


function FPR_call(command, args) {
	FPRalert("FPR_call" + "=" + command + " / " + args);
	if (command == "btn_fpr_replay") {
		// hasCounted0 = false;
		// hasCounted25 = false;
		// hasCounted50 = false;
		// hasCounted75 = false;
		// hasCounted100 = false;
		// document.getElementById('Navigation').style.backgroundImage = "url(https://s.yimg.com/cv/ae/tw/bwchou/opacity_90.png)";
		document.getElementById("FPR_fto_replay").style.display = "none";
		// document.getElementById("FPLiframe").src = "";
		if (FPLStop) {
			moveIt(true);
			FPRjp0(4, 'fpr_click_fpr_replay', '');
		}
		// CRAZY_DIV.style.display = "";
		// document.getElementById("FPRvideo").currentTime = 0;
	} else if (command == "btn_fpr_done") {
		// document.getElementById('Navigation').style.backgroundImage = "";
		moveIt(false);
		FPRjp0(-4, 'fpr_view_fpr_done', '');
	}
}

function CRAZY_call(command, args) {
	FPRalert("CRAZY_call=" + command + "/ args=" + args);
	if (command == "btn_crazy_close") {
		FPRreplay = true;
		document.getElementById("FPR_fto_close").style.display = "none";
		moveIt(false);
		FPRjp0(5, 'fpr_click_crazy_close', '');
	} else if (command == "crazy_done") {
		FPRreplay = true;
		document.getElementById("FPR_fto_close").style.display = "none";
		moveIt(false);
		FPRjp0(-6, 'fpr_view_crazy_done', '');
	} else if (command == "crazy_empty") {
		FPRreplay = true;
		document.getElementById("FPR_fto_close").style.display = "none";
		moveIt(false);
		FPRjp0(7, 'fpr_click_crazy_empty', '');
	}
}


function FPRcheckIframe() {
	FPRalert("FPRcheckIframe");
	// if (isFPLLoaded == true && isFPRLoaded == true && isFPTLoaded == true && isCRAZYLoaded == true){
	// 	FPRalert("FTO iFrame(s) LOADED!");
	// 	clearInterval(FPRcheckIt);
	if (FPRflag > 0 && FPRflag <= FPRcaps) {
		if (isFPLLoaded == true && isFPRLoaded == true && isCRAZYLoaded == true) {
			// if (isCRAZYLoaded == true){
			clearInterval(FPRcheckIt);
			FPRalert("FTO iFrame(s) LOADED!");
			FPRjp0(-2, 'fpr_load_float_start', '');
			if (document.querySelector(".M-0.js-applet.breakingnews div") != null) {
				document.querySelector(".M-0.js-applet.breakingnews div").style.display = "none";
			}
			CRAZY_DIV.style.zIndex = "999";
			CRAZY_DIV.style.visibility = "";
			FPL_DIV.style.visibility = "";
			FPR_DIV.style.visibility = "";
			document.getElementById("FPR_fto_close").style.display = "block";

			document.getElementsByClassName('Col3 End-0')[0].style.zIndex = "9"; // IE9+

			// document.getElementById("EMPTYdiv").style.display = "";
			// if (SPapproved) {
			// 	document.getElementById('abu-today').getElementsByTagName('div')[0].style.display = "none";
			// 	document.getElementById('my-adsFPL').style.paddingTop = "170px";
			// 	document.getElementById('Aside').getElementsByTagName('div')[0].style.height = "37px";
			// 	document.getElementById('Aside').getElementsByTagName('div')[0].style.overflow = "hidden";
			// 	document.getElementById('Aside').getElementsByTagName('div')[0].style.zIndex = "9999"
			// 	document.getElementById('my-adsFPR').style.paddingTop = "170px";
			}
	} else {
		if (isFPLLoaded == true && isFPRLoaded == true) {
			FPRalert("FTO iFrame(s) LOADED!");
			clearInterval(FPRcheckIt);

			document.getElementById('FPLiframe').src = FPLdir + FPLCappedhtml;
			document.getElementById('FPRiframe').src = FPRdir + FPRCappedhtml;
			FPL_DIV.style.visibility = "";
			FPR_DIV.style.visibility = "";

			document.getElementById("FPR_fto_replay").style.display = "block";
			CRAZY_DIV.style.zIndex = "-999";
			CRAZY_DIV.style.visibility = "hidden";
		}
	}
	// }
}

var CRAZY_createObj = function(scope, type, id, pos, top, left, marginleft, width, height, zIndex) {
	var obj = scope.document.createElement(type);
	obj.id = id;
	obj.style.position = pos;
	obj.style.top = top + "px";
	obj.style.left = left + "%";
	obj.style.marginLeft = marginleft + "px";
	obj.style.width = width + "px";
	obj.style.height = height + "px";
	// obj.style.zIndex = zIndex;
	obj.style.visibility = "hidden";
	obj.style.zIndex = "-999";
	return obj;
}

handleCRAZYJumpingResponse = function(e) {
		// FPRalert("handleCRAZYJumpingResponse= "+e.data);
		if (e.origin == FPRremoteDomain) {
			if (e.data == "crazy_done") {
				CRAZY_call("crazy_done");
			} else if (e.data == "crazy_empty") {
				CRAZY_call("crazy_empty");
			}
		}
	}
	//window.addEventListener('message', handleCRAZYJumpingResponse, false);
if (window.addEventListener) {
	window.addEventListener('message', handleCRAZYJumpingResponse, false);
} else {
	window.attachEvent('onmessage', handleCRAZYJumpingResponse);
}

FPRCookie();
var FPR_flashvars = "",
	CRAZY_flashvars = "",
	FPR_clickTAG = "clickTAG",
	CRAZY_clickTAG = "clickTAG";
for (var i = 0; i < FPRURL.length; i++) {
	i == 0 ? FPR_flashvars += '"' + FPR_clickTAG + '":"' + encodeURIComponent(FPRjp(3, "fpr_click", FPRURL[i]).replace(/&amp;/g, "&")) + '"' : FPR_flashvars += ',"' + FPR_clickTAG + (i + 1) + '":"' + encodeURIComponent(FPRjp(30 + Number(i), "fpr_click", FPRURL[i]).replace(/&amp;/g, "&")) + '"';
	i == 0 ? CRAZY_flashvars += '"' + CRAZY_clickTAG + '":"' + encodeURIComponent(FPRjp(6, "crazy_click", FPRURL[i]).replace(/&amp;/g, "&")) + '"' : CRAZY_flashvars += ',"' + CRAZY_clickTAG + (i + 1) + '":"' + encodeURIComponent(FPRjp(60 + Number(i), "crazy_click", FPRURL[i]).replace(/&amp;/g, "&")) + '"';
}
if (FPRflag == 1) {
	FPRjp0(-3, 'fpr_load_ad_html', '');
}
var FPRgetBody = document.getElementsByTagName('body')[0];

if (FPRshowAD() && FPRgetBody && document.getElementById("my-adsFPR") != null) {
	document.write('<div id=FPR_pos>');
	// document.getElementById('Main').style.zIndex = "2"; /*ä¸­é–“æ¬„æé«˜*/
	var getFPR = document.getElementById('FPR_pos');



	// if (SPapproved) {
	// 		if (document.querySelector(".M-0.js-applet.breakingnews div") == null) {
	// 			getFPR.insertBefore(CRAZY_createObj(this, "div", "CRAZYdiv", "absolute", -224, 50, -998, 1200, 600, 11), getFPR.firstChild);
	// 		} else {
	// 			getFPR.insertBefore(CRAZY_createObj(this, "div", "CRAZYdiv", "absolute", -70, 50, -998, 1200, 600, 11), getFPR.firstChild);
	// 		}
	// } else {
			if (document.querySelector(".M-0.js-applet.breakingnews div") == null) {
				getFPR.insertBefore(CRAZY_createObj(this, "div", "CRAZYdiv", "absolute", -278, 50, -998, 1200, 600, 11), getFPR.firstChild);
			} else {
				getFPR.insertBefore(CRAZY_createObj(this, "div", "CRAZYdiv", "absolute", -278, 50, -998, 1200, 600, 11), getFPR.firstChild);
			}
	// }
	var CRAZY_DIV = document.getElementById("CRAZYdiv");
	// // CRAZY_DIV.innerHTML = '<iframe id=CRAZYiframe scrolling=no frameborder=0 style=border:0px;padding:0px; src=' + FPRdir + CRAZYhtml + '?' + CRAZY_flashvars + ' width=1200px height=600px></iframe>';
	CRAZY_DIV.innerHTML = "<iframe id=CRAZYiframe scrolling=no frameborder=0 style=border:0px;padding:0px; src=" + FPRdir + CRAZYhtml + " name='{" + CRAZY_flashvars + "}' width=1200px height=500px><\/iframe>";
	document.getElementById('CRAZYiframe').onload = function() {
		isCRAZYLoaded = true;
	}

	document.write('</div>');
	// if (FPRr0 == "${CLICKURL}") {
	// 	document.getElementById('FPRVideoClick').href = FPRURL[0];
	// } else {
	// 	document.getElementById('FPRVideoClick').href = FPRr0 + FPRURL[0];
	// }
	// var FPRVIDEO_DIV = document.getElementById("FPRVideodiv");
	// document.getElementById('TAKEOVERiframe').onload = function() {
	// 	isTAKEOVERLoaded = true;
	// }
	// document.write('<div id=FPRdiv align=center style="position:relative;overflow:hidden;height:'+ FPRH + 'px"><iframe id=FPRiframe scrolling=no frameborder=0 style=left:50%;margin-left:-187px;position:absolute;border:0px;padding:0px; src=' + FPRdir + FPRhtml + '?' + FPR_flashvars + ' width=374px height=210px></iframe></div>');
	if(FPRflag < 3){
		document.write("<div id=FPRdiv align=center style=visibility:hidden;position:relative;overflow:hidden;height:" + FPRH + "px><iframe id=FPRiframe scrolling=no frameborder=0 style=left:50%;margin-left:-187px;position:absolute;border:0px;padding:0px; src=" + FPRdir + FPRAutohtml + " name='{" + FPR_flashvars + "}' width=374px height=226px><\/iframe><\/div>");
	} else {
		document.write("<div id=FPRdiv align=center style=visibility:hidden;position:relative;overflow:hidden;height:" + FPRH + "px><iframe id=FPRiframe scrolling=no frameborder=0 style=left:50%;margin-left:-187px;position:absolute;border:0px;padding:0px; src=" + FPRdir + FPRCappedhtml + " name='{" + FPR_flashvars + "}' width=374px height=226px><\/iframe><\/div>");
	}
	var FPR_DIV = document.getElementById("FPRdiv");
	document.getElementById('FPRiframe').onload = function() {
		isFPRLoaded = true;
	}
	var FPRcheckIt;

	function FPRloadDetection() {
		FPRcheckIt = setInterval(FPRcheckIframe, 100);
	}
	FPRloadDetection();
} else {
	if (FPRURL[0] != "") {
		document.write("<div style=\"margin: 0; height:226px; width: 100%; background: transparent url('" + FPRdir + FPRaltimg + "') no-repeat center; overflow: hidden; cursor: pointer;\" onclick=\"window.open('" + FPRjp(2, "fpr_click_fpr_clicktagbackup", FPRURL[0]) + "');\"><\/div>")
	} else {
		document.write("<img src=" + FPRdir + FPRaltimg + " width=100% height=226px border=0>");
	}
}
