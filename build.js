/*
: MIT
: MIT
: MIT
*/
(function(b){var c=null;try{c=b.module("rmaps-utils")}catch(m){c=b.module("rmaps-utils",[])}["load","error"].forEach(function(b){return c.directive("rmapsOn"+b,function(){return{scope:!1,link:function(d,c,g){var h;h=d.$eval(g["rmapsOn"+b]);return c.on(b,function(a){a=h(a);d.$evalAsync(function(){});return a})},restrict:"A"}})})})(angular);
(function(b){var c=null;try{c=b.module("rmaps-utils")}catch(m){c=b.module("rmaps-utils",[])}var n,d,e,g,h,a,f,k,p;k={};g=/([\:\-\_]+(.))/g;d=/^moz([A-Z])/;e=/^((?:x|data)[\:\-_])/i;h=function(a){return a.replace(g,function(a,b,c,d){return d?c.toUpperCase():c}).replace(d,"Moz$1")};f=function(a){return h(a.replace(e,""))};a=function(a){return a.replace(/^./,function(a){return a.toUpperCase()})};p={blur:!0,focus:!0};n=function(a,c){var b;b=void 0;a.split(".").forEach(function(a){return b=(b?b:c)[a]});
return b};"click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" ").forEach(function(b){var c,d;c=f("rmaps-"+b);d="rmapsValueName"+a(b);return k[c]=["$parse","$rootScope","$log",function(a,f,g){return{restrict:"A",link:function(a,e,h){var k;k=e.scope();e.on("destroy",function(){return e.unbind(b)});return e.bind(b,function(m){var l,q;l=h[c];(q=n(l,k))||g.error("failed to find function for "+c+" to prop "+
l);l=function(){return q(n(h[d],e.scope()),{$event:m})};return p[b]&&f.$$phase?a.$evalAsync(l):a.$apply(l)})}}}]});c.directive(k)})(angular);
(function(b){var c=null;try{c=b.module("rmaps-utils")}catch(m){c=b.module("rmaps-utils",[])}c.directive("rmapsPostRepeat",["$log",function(c){var d;d={};return{scope:{options:"="},link:function(e,g,h){var a,f;g=e.$parent;f=g.$parent;g.$first&&(d[f.$id]={lastTime:new Date},f.$on("$destroy",function(){return delete d[f.$id]}));null!=e.options&&(a=e.options,null!=a.init&&b.isFunction(a.init)&&a.init(d[f.$id],e));if(g.$last)return e.$evalAsync(function(){c.debug("## DOM rendering list took: "+(new Date-
d[f.$id].lastTime)+" ms");if(a&&null!=a.doDeleteLastTime?a.doDeleteLastTime:1)return delete d[f.$id]})}}}])})(angular);
