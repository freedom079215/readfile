YUI.add("type_abu_video_manager",function(e,m){var w={article:"1",slideshow:"2",video:"3"};var r=e.Object.getValue(YUI,["Env","My","settings","context"]);var t=(r.videoAutoplay===1);var y="prod";var F=(r.videoBuffering===0);var u=(r.videoRelated===0);var c=(r.videoForcedError===1);var A=(r.videoFullscreen===1);var l=(r.videoHtml5===1);var h=(r.videoLooping===1);var E=r.videoMaxInstances||12;var j=r.videoMaxLoops||3;var o=r.videoSingleVideo||false;var p=(r.videoMinControls===1);var v=r.videoMute===1;var g=r.videoPausescreen;var z=r.videoQosRate||".1";var x=r.videoSSButton;var q=r.videoExpName||"default";var k=r.videoComscoreC4||"TW fp";var f=(r.videoAdBeaconsDisabled===1);var J=r.videoYwaRate||"0";var a=r.videoplayerUrl;e.VideoManager={STATE:{playerJs:"not-ready",isWindowFocused:true,isLightboxOpen:false},VIDEO_MAP:{},FAILED_VIDEO_MAP:{},init:function(){var K=this;e.Af.Event.on("content:init",K.onContentEvent,K);e.Af.Event.on("content:batch",K.onContentEvent,K);e.Af.Event.on("video_state:change",K.onVideoStateChange,K);e.Af.Event.on("video:hide",K.onVideoHide,K);e.Af.Event.on("video:show",K.onVideoShow,K);e.on("blur",K.onWindowBlur.bind(K),window);e.on("focus",K.onWindowFocus.bind(K),window);e.Af.Event.on("lightbox:show",K.onLightboxShow,K);e.Af.Event.on("lightbox:hide",K.onLightboxHide,K);K.activeVideosInit();},onContentEvent:function(P){var K;var M;var N=this.getContainerNodes(P.guid,P.list);var O;var Q;var L=this;destroyableVideos=this.findDestroyableVideos();if(destroyableVideos&&destroyableVideos.length>0){this.destroyVideos(destroyableVideos);}if(!N||!N.length){return;}K=function(){L.createVideos(N);};M=function(){L.initPlayerJs(K);};O=N[0];if(O&&typeof O.inViewportRegion==="function"){Q=O.inViewportRegion();}if(this.STATE.playerJs!=="ready"){if(Q){M();}else{e.one("window").once("scroll",M);}}else{if(Q){K();}else{e.one("window").once("scroll",K);}}},onVideoStateChange:function(K){if(!K){return;}if(K.isInViewport()&&K.isDestroyed()){this.createVideo(K.containerNode);}if(K.isPlayable()){if(o&&this.isAnyVideoPlaying()){return;}K.play();}else{if(!K.isLiveEvent()){K.pause();}else{if(K.isMute()){K.pause();}}if(o&&this.STATE.isWindowFocused&&!this.STATE.isLightboxOpen){guid=K.getGuid();videoGuids=this.findPlayableVideos();for(i=0;i<videoGuids.length;i++){if(guid===videoGuids[i]){continue;}playableVideo=this.VIDEO_MAP[videoGuids[i]];if(!playableVideo){continue;}playableVideo.play();break;}}}},onVideoShow:function(K){var L=this.VIDEO_MAP[K];if(!L){return;}L.show();},onVideoHide:function(K){var L=this.VIDEO_MAP[K];if(!L){return;}L.hide();},onWindowBlur:function(){this.STATE.isWindowFocused=false;this.disableAllVideos();},onWindowFocus:function(){this.STATE.isWindowFocused=true;this.enableAllVideos();},onLightboxShow:function(){this.STATE.isLightboxOpen=true;this.disableAllVideos();},onLightboxHide:function(){this.STATE.isLightboxOpen=false;this.enableAllVideos();},disableAllVideos:function(){var K=Object.keys(this.VIDEO_MAP);if(!K.length){return;}this.disableVideos(K);},enableAllVideos:function(){if(this.STATE.isLightboxOpen||!this.STATE.isWindowFocused){return;}var K=Object.keys(this.VIDEO_MAP);if(!K.length){return;}this.enableVideos(K);},initPlayerJs:function(M){var K=this;var L=function(){K.STATE.playerJs="ready";if(typeof M==="function"){M.call(K);}};if(this.STATE.playerJs==="not-ready"){if(this.isPlayerJsLoaded()){L();return;}this.STATE.playerJs="fetching";if(a&&!e.config.groups.videoplayer){yuiConfig={modules:{videoplayer:{group:"videoplayer",name:"videoplayer",type:"js",fullpath:a}},groups:{videoplayer:{name:"videoplayer",combine:false,filter:"min"}}};e.applyConfig(yuiConfig);}}e.use("videoplayer",L);},activeVideosInit:function(){var K=this;if(!window.VEX){return;}K.initPlayerJs(e.bind(K.videoModeInstancesInit,K));},videoModeInstancesInit:function(){var L=this;var Q;var K;var P;var M;var N;var O;if(!window.VEX){return;}e.Array.each(window.VEX.VideoModeInstances,function(R){Q=R&&R.getPlayerInfos&&R.getPlayerInfos();if(Q){K=Q.config||{};O=K.autoplay;P=e.one(Q.node);M=P.generateID();N=new e.Video(P,{isAutoplayable:O,isDestroyable:false,isMute:K.mute,isPlaying:O,isLiveEvent:true});N.videoPlayer=Q.instance;N.videoNode=P;N.guid=M;N.attachListeners();L.VIDEO_MAP[M]=N;}});},isPlayerJsLoaded:function(){return YAHOO&&YAHOO.VideoPlatform&&YAHOO.VideoPlatform.VideoPlayer;},getContainerNodes:function(O,L){var N=e.one("#applet_"+O);var M=[];var K=this;if(!N){return null;}e.Array.each(L,function(X){var V;var P=null;var R;var W;var U;var S;var Q;if(X&&X.type===w.video){P=N.one('[data-uuid="'+X.id+'"]');if(P){if(X.videoAdAssets){R=K.mapVideoAdAssets(X.videoAdAssets);U=R.videoUrl;}V=X.videoAdImage;W=X.videoAdBeacons;if(U){P.setData("videoUrl",U);if(f&&U){Q=Array.isArray(X.videoAdAssets)?e.Object.getValue(X,["videoAdAssets",0,"mediaInfo"]):X.videoAdAssets.mediaInfo;S={clickUrl:X.link,mediaInfo:Q};e.Array.each(S.mediaInfo,function T(Y){Y.height=parseInt(Y.height,10);Y.width=parseInt(Y.width,10);Y.bitrate=parseInt(Y.bitrate,10);Y.length=parseInt(Y.length,10);});if(W){e.Object.each(W,function(Z,Y){if(Array.isArray(Z)){W[Y]=Z;}else{W[Y]=[Z];}});}P.setData("geminiData",S);}}if(V){P.setData("imageUrl",V);}if(W){P.setData("videoBeacons",W);}if(X.videoAdRules){e.Object.each(X.videoAdRules,function(Z,Y){if(Array.isArray(Z)){e.Object.each(Z,function(aa){e.Object.each(aa,function(ac,ab){aa[ab]=parseInt(ac,10);});});}else{e.Object.each(Z,function(ab,aa){Z[aa]=parseInt(ab,10);});}});P.setData("videoRules",X.videoAdRules);}M.push(P);}}});if(M&&M.length>0){return M;}return null;},mapVideoAdAssets:function(K){var O={VIDEO_PRIMARY:{contentType:"video/mp4",assetName:"videoUrl"}};var P;var N={};var Q;var M;var L=function(T,R){var S=new RegExp(T);return S.test(R.contentType);};K=K?[].concat(K):[];K.forEach(function(R){var S=O[R.usageType];R.mediaInfo=R.mediaInfo?[].concat(R.mediaInfo):[];if(S){if(R.mediaInfo.length>1){M=R.mediaInfo.filter(L.bind(null,S.contentType))||[];}else{M=R.mediaInfo;}N[S.assetName]=M[0]&&M[0].url;}});return N;},createVideos:function(L){var K;if(!L||!L.length){return;}for(K=0;K<L.length;K++){this.createVideo(L[K]);}},createVideo:function(Z){var T;var ab;var K;var L;var R;var X=true;var O;var M;var V;var P;var U;var Y;var aa;var Q;var W;var S;var N;if(!Z||!Z.getDOMNode()){return;}S=Z.getData("videoManagerConfig")||{};W=Z.getData("videoConfig")||{};R=Z.getData("opts")||{};O={isAutoplayable:(typeof W.autoplay!=="undefined")?W.autoplay:t,isDestroyable:(typeof R.isDestroyable!=="undefined")?R.isDestroyable:true};Z.detachAll();Q=Z.getData("videoBeacons");N=Z.getData("videoUrl");ab=Z.getData("imageUrl");aa=new e.Video(Z,O);K=aa.isPlayable();if(o){X=!this.isAnyVideoPlaying()&&X;}X=O.isAutoplayable&&K&&X;W.autoplay=X;if(N){L=this.createMediaItemsByUrls([{videoUrl:N||"",imageUrl:ab||""}]);if(f){L=[{id:"6bf451fd-11f9-37f9-a54c-d73d795839f6",images:{thumbnail:ab}}];W.YVAP={standaloneAd:{gemini:Z.getData("geminiData"),rules:Z.getData("videoRules"),beacons:Q}};}}else{Y=aa.getUuid();if(!Y){return;}L=this.createMediaItemsByUuids([Y]);}W=this.createVideoConfig(W,L);if(N){W.disableRecoverer=true;}aa&&aa.createVideoPlayerByConfig(W);P=(typeof S.uiControl!=="undefined")?W.uiControl:p;V=!!aa.containerNode.one(".js-cstm-end-screen")||P;if(V){U=new B(aa,{shouldShowOverlayButtons:P});U.setUp();}e.Global.fire("video-manager:create_player_instance",aa);if(R.createVideoOnly){return;}T=Z&&Z.generateID();if(T){this.VIDEO_MAP[T]=aa;}},createMediaItemsByUuids:function(N){var M;var K;var L=[];if(!N||!N.length){return;}for(M=0;M<N.length;M++){K={id:N[M]};L.push(K);}return L;},createMediaItemsByUrls:function(O){var N;var K;var M=[];var L;if(!O||!O.length){return;}for(N=0;N<O.length;N++){L=O[N];K={streams:[{url:L.videoUrl}],images:{thumbnail:L.imageUrl}};M.push(K);}return M;},createVideoConfig:function(M,L){var N;var K;N={autoplay:t,comscoreC4:k,continuousPlay:false,disableCasting:true,expBucket:e.Af.Config.getContext("bucket"),expName:q,expType:"strm-inline",fullscreenBtn:A,html5:l,lang:e.Af.Config.getContext("lang")||"en-US",loop:h,mute:v,pageSpaceId:e.Af.Config.get("spaceid"),pausescreen:g,playlist:{mediaItems:L},preload:true,qosSamplingRate:parseFloat(z),region:e.Af.Config.getContext("region")||"US",replayonlyendscreen:u,stopBufferingOnPause:F,settingscreen:false,site:"frontpage",startscreen:{showButton:x,showDesc:false,showProvider:false,showTitle:false},CMS:{env:y,suppressAdContext:true},videoapps:false,ywaSamplingRate:parseFloat(J)};if(M&&typeof M==="object"){K=e.merge(N,M);}return K;},isAnyVideoPlaying:function(){var N=Object.keys(this.VIDEO_MAP);var K;var M=false;var L;for(K=0;K<N.length;K++){guid=N[K];L=this.VIDEO_MAP[guid];M=L&&L.isPlaying();if(M){return M;}}return M;},findPlayableVideos:function(){var O=Object.keys(this.VIDEO_MAP);var K;var L;var N=[];var M;for(L=0;L<O.length;L++){K=O[L];M=this.VIDEO_MAP[K];if(M&&M.isPlayable()){N.push(K);}}return N;},findDestroyableVideos:function(){var O=[];var N=Object.keys(this.VIDEO_MAP);var K;var L;var M;for(L=0;L<N.length;L++){K=N[L];M=this.VIDEO_MAP[K];if(!M){O.push(K);continue;}if((M.isDestroyable()&&O.length===0)||M.isDOMNodeRemoved()){O.push(K);}}return O;},disableVideos:function(K){var L;var M;var N;for(M=0;M<K.length;M++){L=K[M];N=this.VIDEO_MAP[L];N&&N.disable();}},enableVideos:function(K){var L;var M;var N;for(M=0;M<K.length;M++){L=K[M];N=this.VIDEO_MAP[L];N&&N.enable();}},destroyVideos:function(K){var L;var M;var N;for(M=0;M<K.length;M++){L=K[M];N=this.VIDEO_MAP[L];N&&N.destroy();N=null;delete this.VIDEO_MAP[L];}}};e.VideoManager.init();var G="ui-wrapper";var b="ui-mute-btn";var n="ui-expand-btn";var C="ui-state-is-mute";var d="ui-state-is-expanded";var s="ui-overlay-btns";var I="D-n";var H={isMute:C,isExpanded:d};var D={shouldShowOverlayButtons:false};var B=function B(L,K){this.video=L;this.wrapperNode=null;this.containerNode=this.video&&this.video.containerNode;this.options=K||D;};B.prototype.setUp=function(){if(this.options.shouldShowOverlayButtons){this._createOverlayButtons();}if(!this.containerNode||!this.containerNode.getDOMNode()){return;}this.containerNode.on("video_state:change",this._onVideoStateChange,this);};B.prototype._createOverlayButtons=function(){var N;var K;var M;var L;if(!this.video){return;}L=this.video.videoNode;if(!L||!L.getDOMNode()){return;}M=L.one(".yvp-custom-controls");if(!M){return;}this.wrapperNode=e.Node.create('<div class="'+G+'"></div>');N=e.Node.create('<span class="'+b+'"><i></i></span>');K=e.Node.create('<span class="'+n+'"><i></i></span>');M.addClass(s);M.append(this.wrapperNode);this.wrapperNode.append(N);this.wrapperNode.append(K);this.wrapperNode.delegate("click",this._onMuteBtnClick,"."+b,this);this.wrapperNode.delegate("click",this._onExpandBtnClick,"."+n,this);this._onVideoStateChange("isMute",this.video.isMute());};B.prototype._onMuteBtnClick=function(){if(!this.video){return;}this.video.setMute(!this.video.isMute());};B.prototype._onExpandBtnClick=function(){if(!this.video||!this.containerNode){return;}this.containerNode.fire("video_expand",!this.video.isExpanded());};B.prototype._onVideoStateChange=function(L,N){if(!this.containerNode||!this.containerNode.getDOMNode()){return;}var M=H[L];if(M){if(N){if(!this.containerNode.hasClass(M)){this.containerNode.addClass(M);}}else{this.containerNode.removeClass(M);}}var K;var O;if(L==="isOnEndScreen"){K=this.containerNode.one(".js-cstm-end-screen");if(K){if(N===false){K.hide();}else{O=this.containerNode.one(".yvp-bottom-bar");if(O){K.remove();this.containerNode.insert(K,O);if(K.hasClass(I)){K.removeClass(I);}K.show();}}}}};},"0.0.1",{requires:["af-content","af-event","base","event-custom","type_abu_event","type_abu_video","node-core"]});/* Copyright (c) 2018, Yahoo! Inc.  All rights reserved. */
