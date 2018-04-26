YUI.add("stencil-bquery",function(e){"use strict";function i(t){var n=t.host._node||t.host,r=n.getAttribute("data-bquery")||"max-width:450px=BreakPoint",i=e.one(n.getAttribute("data-bquery-target")||n.getAttribute("data-target"));this.query=this.constructor.parseQuery(r),this.node=n,this.target=i?i._node:null,this.constructor.superclass.constructor.call(this,t),this.addResizeListener(n,e.bind(this.handleResize,this)),this.handleResize()}var t=e.Object.owns,n=e.DOM,r=e.config.doc;e.extend(i,e.Stencil.BasePlugin,{throttle:50,lastTime:0,handleResize:function(){var r=+(new Date),i,s,o,u,a,f,l,c,h,p;if(!this.lastTime||r-this.lastTime>this.throttle){this.lastTime=r,u=this.query,a=this.target||this.node,f=this.node.offsetWidth,this.resizeSupport||(i=this.expandEl,s=i.firstChild,o=this.contractEl,l=parseInt(f+100,0),c=parseInt(a.offsetHeight+100,0),s.style.cssText="width:"+l+"px;height:"+c+"px;",i.scrollLeft=l,i.scrollTop=c,o.scrollLeft=o.scrollWidth+100,o.scrollTop=o.scrollHeight+100);for(h=u.length-1;h>=0;h-=1)if(t(u[h],"min-width")&&f>=u[h]["min-width"]){e.fire("bquery:breakpoint",{type:"min-width",node:a});for(p=u[h].classesA.length-1;p>=0;p-=1)n.addClass(a,u[h].classesA[p])}else if(t(u[h],"max-width")&&f<=u[h]["max-width"]){e.fire("bquery:breakpoint",{type:"max-width",node:a});for(p=u[h].classesA.length-1;p>=0;p-=1)n.addClass(a,u[h].classesA[p])}else{e.fire("bquery:breakpoint",{type:"remove",node:a});for(p=u[h].classesA.length-1;p>=0;p-=1)n.removeClass(a,u[h].classesA[p])}}},addResizeListener:function(t){var i=e.UA.ie&&e.UA.ie<11,s,o,u,a,f,l;this.resizeSupport=i,i?(t.style.zoom=1,t.attachEvent?t.attachEvent("onresize",e.bind(this.handleResize,this)):t.addEventListener&&t.addEventListener("resize",e.bind(this.handleResize,this))):(n.getComputedStyle(t,"position")==="static"&&(t.style.position="relative"),s="position:absolute;top:0;left:0;width:100%;height:100%;overflow:scroll;visibility:hidden;z-index:-1",l=r.createDocumentFragment(),o=r.createElement("div"),o.style.cssText=s,u=r.createElement("div"),u.style.cssText="width:200%;height:200%;",o.appendChild(u),a=r.createElement("div"),a.style.cssText=s,f=r.createElement("div"),a.appendChild(f),o.addEventListener("scroll",e.bind(this.handleResize,this)),a.addEventListener("scroll",e.bind(this.handleResize,this)),this.contractEl=o,this.expandEl=a,l.appendChild(a),l.appendChild(o),t.appendChild(l))}},{NS:"StencilBquery",defaultTriggerEvents:[],requiresInit:!0,parseQuery:function(e){var t=[],n,r=/(min-width|max-width):([0-9]+)(px)=((?:(?:[\-a-zA-Z0-9]+)(?:\,)?)+)/,i,s;e=e.split(" ");for(n=e.length-1;n>=0;n-=1)i=r.exec(e[n]),i&&(s={},s[i[1]]=parseInt(i[2],10),s.unit=i[3],s.classesA=i[4].split(","),t.push(s));return t}}),e.Stencil.registerPlugin(i,"Bquery")},"@VERSION@",{requires:["stencil-base","yui-base","dom-base","dom-style","node-base","node-pluginhost"]});
