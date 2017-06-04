function initSVG(e,t){var i=$(".device-outer[data-device-id="+e+"]"),a=i.find(".device-image")[0]
$(a).svg()
var n=$(a).svg("get")
return n}function addImage(e,t,i,a,n,d){for(var o=$(".device-outer[data-device-id="+e+"]"),r=o.find(".device-image-container");r[0].firstChild;)r[0].removeChild(r[0].firstChild)
var l=$("<img src='"+t+"' height='100%' width='100%' class='device-image' />")
r.append(l[0])}function drawThermometer(e,t,i,a,n,d){var o=initSVG(e,t)
void 0!==o&&o.load(t,{onLoad:function(){updateThermometer(e,i,a,n,d)}})}function drawBulb(e,t,i,a,n,d){var o=initSVG(e,t)
void 0!==o&&o.load(t,{onLoad:function(){updateBulb(e,i,a,n,d)}})}function drawCam(e,t,i,a,n,d){var o=initSVG(e,t)
void 0!==o&&o.load(t,{onLoad:function(){updateCam(e,i,a,n,d)}})}function drawShutter(e,t,i,a,n,d){var o=initSVG(e,t)
void 0!==o&&o.load(t,{onLoad:function(){updateShutter(e,i,a,n,d)}})}function updateThermometer(e,t,i,a,n){var d=$(".device-outer[data-device-id="+e+"]"),o=d.find("title:contains(min_label)").parent().find("tspan"),r=d.find("title:contains(max_label)").parent().find("tspan")
if(void 0!==d&&void 0!==o&&void 0!==r){o.text(t),r.text(i)
var l=d.find("title:contains(max_temp)").parent().attr("y")+1,v=d.find("title:contains(min_temp)").parent().attr("y")+1,c=i-t,f=Math.abs(v-l)/c,s=Math.round(1e5*(v-f*(Math.abs(t)+a)))/1e5,h=d.find("title:contains(cur_temp)").parent()
if(void 0!==h){var u=h.attr("d")
void 0!==u&&(u=u.replace(u.split(" ")[4],s),h.attr("d",u))}}}function updateBulb(e,t,i,a,n){var d=$(".device-outer[data-device-id="+e+"]"),o=d.find("svg")
if(void 0!==o&&void 0!==d){var r=o.attr("style"),l=r.split(";"),v=1==a
v&&(l.length<2||2==l.length&&!l[1].trim())?r+="fill:orange;":!v&&l.length>=2&&(r=l[0]+";"),o.attr("style",r)}}function updateCam(e,t,i,a,n){var d=$(".device-outer[data-device-id="+e+"]"),o=d.find($("circle").has("title:contains(lens)")),r=d.find($("path").has("title:contains(lens_reflection)"))
if(void 0!==d&&void 0!==o&&void 0!==r){var l=1==a,v=o.parent(),c=o.clone(),f=r.clone()
if(l)var s="fill:#42a5f5;",h="fill:#90caf9"
else var s="fill:#000000;",h="fill:#ffffff"
c.attr("style",s),f.attr("style",h),o.remove(),r.remove(),v.append(c),v.append(f)}}function updateShutter(e,t,i,a,n){var d=$(".device-outer[data-device-id="+e+"]"),o=d.find("path")
if(void 0!==d&&void 0!==o){var r=o.has("title:contains(level_2)"),l=o.has("title:contains(level_3)"),v=o.has("title:contains(level_4)"),c=n[a]
switch(c){case"offen":r.hide(),l.hide(),v.hide()
break
case"halb geöffnet":r.show(),l.hide(),v.hide()
break
case"geschlossen":r.show(),l.show(),v.show()}}}