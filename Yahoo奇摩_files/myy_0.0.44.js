YUI.add("type_myy",function(b,k){var f=400,l=b.one(".back-to-top"),d=b.one("#OpenWidgetsBtn"),i=b.one("#search-box"),g=b.one("#MasterWrapper"),e=40,j=+(new Date()),c=b.Object.getValue(YUI,["Env","My","settings","context"]),h=c.trendingNowOffScreen,a=b.Base.create("MyApp",b.Base,[b.Af.Applets,b.Af.Rapid],{initializer:function(m){var n;for(n in b.My.Extensions){if(b.Lang.isFunction(b.My.Extensions[n].init)){b.My.Extensions[n].NAME=n;b.later(Math.floor(Math.random()*20),b.My.Extensions[n],function(){this.init();});}}if(l){b.on("click",this.handleScrollTop,l);b.on("scroll",this.showScrollToTop);}if(d){b.on("touchstart",this.loadApps,d);}},handleScrollTop:function(m){b.config.win.scrollTo(0,0);},showScrollToTop:function(o){var m=+(new Date());var n=b.one("body").get("docScrollY");if(m-j<e){return;}if(n>f){l.addClass("show-top");l.removeClass("D-n");}else{l.addClass("D-n");}if(h){var p=b.one(".Col3 .js-applet.trending");if(p!==null){tnHeight=p.get("offsetHeight");tnOffsetY=p.getY();this.trendingnowOffscreenAmount=tnOffsetY+tnHeight-(b.one("#UH").get("offsetHeight"));}if(this.trendingnowOffscreenAmount){if(n>=this.trendingnowOffscreenAmount){b.Global.fire("Partner-TrendingNow:off_screen");}else{b.Global.fire("Partner-TrendingNow:on_screen");}}}j=m;},loadApps:function(n){var m=b.one("#Widgets");if(m){m.all('[data-applet-defer="when:custom"]').each(function(o){b.My.App.loadApplet(o,function(p){if(p){b.Af.Beacon.error(k,{},{code:"appldfail",appName:o.getData("applet-type")});}});});m.all('[data-applet-init="custom"]').each(function(o){b.My.App.initApplet(o);});}}},{});if(i&&g){i.on("touchstart",function(m){g.addClass("srch-focus");});i.on("blur",function(m){g.removeClass("srch-focus");});}b.namespace("My").App=a;},"0.0.1",{requires:["stencil","af-applets","base","af-rapid","af-beacon"]});/* Copyright (c) 2018, Yahoo! Inc.  All rights reserved. */
