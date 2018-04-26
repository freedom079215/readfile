YUI.add("af-content",function(e,t){"use strict";var n=e.Lang,i=e.Af.Utils,o=e.Af.Config,r=e.Af.Dom,s=e.Mjata.REST.HTTP,p=n.isFunction,a=n.isNumber,l=n.isObject,c=n.isString,u=i.objectGetValue,d="replace_content",m=".js-applet",h="appletsinit";e.namespace("Af").Content={simple:function(t,n,o){return t=e.one(t),o=o||i.noop,t&&n&&n.html?(r.setHTML(t,n.html),n.js&&r.jsAttach(n.js),o(null),this):(o("invalid param"),this)},applet:function(t,n,o,r){return r=r||i.noop,t&&n&&o?(n=e.one(n))?void(c(t)?(s=u(e,t))?this._initApplet(s,o,{node:n,where:d},r):e.onceAfter(h,function(e){this._initApplet(e.applets,o,{node:n,where:d},r)},this):l(t)?this._initApplet(t,o,{node:n,where:d},r):e.onceAfter(h,function(e){this._initApplet(e.applets,o,{node:n,where:d},r)},this)):r("invalid node"):r("invalid param");var s},remoteApplet:function(t,n,i){n=n||{};var r,s=o.get("context")||{},p=o.get("td")||{},l=e.merge(n.params,{initApplet:0,initStencil:0,m_id:n.type,m_mode:"json"}),c=n.placement&&n.placement.node,u=n.placement&&n.placement.where,d={};return n.type?(c=e.one(c))?(a(u)||(u=u||"replace"),"https:"===window.location.protocol?l.ssl=1:l.ssl=0,!l.site&&s.site&&(l.site=s.site),!l.lang&&s.lang&&(l.lang=s.lang),!l.region&&s.region&&(l.region=s.region),!l.xhr_path&&p.api&&(l.xhr_path=p.api),n.guid&&(l.instance_id=n.guid),r=n.uri||p.remote||"/_remote",a(n.timeout)&&n.timeout>0&&(d.timeout=n.timeout),void this["post"===n.method?"_post":"_get"](t,r,l,c,u,d,i)):i&&i("missing options.placement.node"):i&&i("missing options.type")},_get:function(t,n,i,o,r,p,a){var l=this;n+="?"+e.QueryString.stringify(i),s.get(n,{},p||{},function(e,n){l._parseContent(t,void 0,o,r,a,e,n)})},_post:function(e,t,n,i,o,r,p){var a=this;t+="?m_id="+encodeURIComponent(n.m_id),n.ctrl&&(t+="&ctrl="+encodeURIComponent(n.ctrl)),s.post(t,{},n,r||{},function(t,n){a._parseContent(e,void 0,i,o,p,t,n)})},_parseContent:function(t,n,i,o,r,s,p){if(s)return r&&r(s);if(!p||!p.responseText)return r&&r("empty content");try{n=e.JSON.parse(p.responseText),this._initApplet(t,n,{node:i,where:o},r)}catch(a){return r&&r("invalid json content:"+a.message)}},_initApplet:function(t,n,i,o){return p(t.initApplet)?(i=e.merge({where:"replace"},i),n&&(i.where===d&&(s=(s=e.Node.create(n.html)).one("div.js-applet")||s,n.html=s.getHTML(),i.where="replace"),r=this._insert(n,i)),r?(e.use("stencil",function(e){var t=e.Stencil;t&&t.initAll&&t.initAll(r)}),void e.later(5,null,function(){t.initApplet(r,!0),o(null)})):o("missing applet node")):o("missing initApplet()");var r,s},_insert:function(t,n){var i,o;switch(n.node.insert(t.html,n.where),n.where){case"before":i=n.node.previous(m);break;case"after":i=n.node.next(m);break;case"replace":i=n.node.one(m)||n.node;break;default:e.Lang.isNumber(n.where)&&(i=n.node.get("children").item(n.where))}return i&&(o=t.js||t.assets)&&r.jsAttach(o),i},rmp:function(t){e.use("media-rmp",function(e){e.Media.RMP.load(t)})}}},"@VERSION@",{requires:["af-config","af-dom","af-utils","json-parse","mjata-rest-http","node-pluginhost","querystring-stringify"]});