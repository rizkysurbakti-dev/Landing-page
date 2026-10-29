/* Coffe Yumaju. Harga di data menu dalam ribuan rupiah. */
var M={"Kopi":[["Black","Soft, medium, standard · espresso, americano, long black",29,"29–33"],["Yumaju Signature Black","Lemon atau honey",29,"29–32,5"],["Yumaju Fruity Black","Tropica, Rubos",35,"35"],["White","Cappuccino, latte, piccolo, flat white",33,"33–36"],["Black Magic","Black hole, moreno, leopoldon",38,"38–41"],["Flavor Coffee Shakes","Caramel, butterscotch, hazelnut",35,"35"],["Flavor Coffee","Caramel, butterscotch, hazelnut, vanilla, roast almond",40,"40–43"],["Dessert Coffee","Affogato, chocogato, matchagato",35,"35"],["Manual Brew","Single origin musiman",35,"35–50"]],
"Non-kopi":[["Matcha Shakes","",35,"35"],["Premium Matcha","Latte, dirty, tropical",45,"45"],["House Blend Chocolate","",37.5,"37,5"],["Milkshakes","Kopi, cokelat, vanilla",50,"50"],["Tea","Black, green, earl grey",32.5,"32,5"],["Artisan Tea","Scarlet green tea, mango mint, mint ice cream black tea, earl grey cream",40,"40–42"],["Tea Shakes","Tropical blue tea, ruby rose tea",35,"35"],["Seasonal Cold Press Juice","Tanya barista untuk varian",35,"35"],["Yumaju Kombucha","",30,"30"],["Coconut Water","Regular / besar",19,"19 / 32"],["Saferunner 250 ml","Latte, less sweet, cappuccino, allez",27,"27"],["Saferunner 500 ml","",54,"54"],["Cocoa x Coffee","",45,"45"]],
"Roti & croissant":[["Yumolen Du Banana","",15,"15"],["Butter Croissant","",20,"20"],["Cheese Roll","",15,"15"],["Chocolate Pepito","",27.5,"27,5"],["Yumaju Pain Au Chocolat","",27.5,"27,5"],["Salted Caramel","",27.5,"27,5"],["Almond Vanilla Danish","",28,"28"],["Cranberry Cheese Cream","",28,"28"],["Yumaju Chocolatine","",29.5,"29,5"],["Sausages Roll","",30,"30"],["Ontbijtkoek","",22.5,"22,5"],["Yumaju Bagel","Matcha, cheese, blueberry",21,"21–25"],["Orange Raisin Walnut Cheese Bun","",30,"30"],["Cranberry White Choco Pistachio","",31,"31"],["Yumaju Donut","Oreo, cheese, red velvet",10,"10–15"]],
"Coffee bag":[["Single Origin (per pcs)","Biji kopi untuk dibawa pulang",18,"18"],["Yumaju Blend (per pcs)","Biji kopi untuk dibawa pulang",15,"15"]]};
var $=function(i){return document.getElementById(i)},cart={},keys=Object.keys(M),cur=keys[0],TAX=.1,DISC=.1,promoOn=false,method='tunai';
function rp(n){return 'Rp'+Math.round(n).toLocaleString('id-ID')}
function rk(n){return rp(n*1000)}
/* Ubah teks harga data menu (ribuan) jadi rupiah penuh: "29–33" -> "Rp29.000–33.000", "19 / 32" -> "Rp19.000 / 32.000" */
function fp(s){var f=0;return String(s).replace(/\d+(?:,\d+)?/g,function(m){var v=parseFloat(m.replace(',','.'))*1000,t=Math.round(v).toLocaleString('id-ID');return f++?t:'Rp'+t})}
var WA='https://api.whatsapp.com/send/?phone=6289655550199&type=phone_number&app_absent=0&text=';
function wa(t){return WA+encodeURIComponent(t)}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function ld(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Gambar menu: urutan coba = 1) foto sendiri di images/menu/nama-menu.jpg, 2) foto asli dari Wikimedia Commons, 3) ilustrasi gelas (khusus minuman tanpa foto). */
var OWN=true,CM='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/0e/b8/8d/yumaju-coffee.jpg?w=1000&h=-1&s=1';
var PH={espresso:'Espresso_BW_1.jpg',latte:'Latte_macchiato_with_coffee_beans.jpg',matcha:'Matcha_tea_latte_with_rosetta_latte_art.jpg',croissant:'00_Croissant._Yum.jpg',pac:'Pain_au_chocolat_Luc_Viatour.jpg',goug:'Petites_gougères_apéritif.jpg',brioche:'Brioche_aux_pépites_de_chocolat.jpg',cup:'A_small_cup_of_coffee.JPG'};
var PAL={tea:['#c0702f','#e9b87a','#f7e3c3'],shake:['#d9a3a3','#f2cfcf','#fff0f0'],juice:['#e58a1f','#f4b34a','#fde0a0'],komb:['#b88a4f','#ddb97b','#f1dfb0'],coco:['#cfe0d0','#e6efe4','#fbfbf4'],choc:['#4a2f1f','#6b4630','#d9bfa0'],cara:['#c88a4a','#f0d3a5','#fff3dc'],des:['#7a4a2a','#f0e2c8','#fff8e8']};
function gl(a){return '<svg viewBox="0 0 100 120"><path d="M20 20h60l-6 92a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6z" fill="#fff" fill-opacity=".55" stroke="#cdbfb0" stroke-width="2"/><path d="M24 48h52l-4 62H28z" fill="'+a[1]+'"/><path d="M26 74h48l-2 36H28z" fill="'+a[0]+'"/><ellipse cx="50" cy="40" rx="30" ry="9" fill="'+a[2]+'"/></svg>'}
function pick(n){var R=[[/croissant|salted caramel|danish|sausages/i,'croissant'],[/pain au|chocolatine|pepito/i,'pac'],[/cheese roll/i,'goug'],[/banana|bun|bagel|donut|ontbijt|cranberry/i,'brioche'],[/matcha/i,'matcha'],[/\btea\b/i,'tea*'],[/kombucha/i,'komb*'],[/juice/i,'juice*'],[/coconut/i,'coco*'],[/milkshake/i,'shake*'],[/chocolate|cocoa/i,'choc*'],[/dessert/i,'des*'],[/shakes/i,'cara*'],[/white|latte|flavor|saferunner/i,'latte'],[/./,'espresso']];for(var i=0;i<R.length;i++)if(R[i][0].test(n))return R[i][1]}
function pa(n){var s=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),a=' data-n="'+n+'" data-il="1"';if(OWN)a+=' data-src="images/menu/'+s+'.jpg"';return a}
function load(el,u,i){if(i>=u.length){if(el.dataset.il){el.innerHTML=ill(el.dataset.n);el.classList.add('has')}return}var im=new Image();im.alt=el.dataset.n||'';im.onload=function(){el.innerHTML='';el.appendChild(im);el.classList.add('has')};im.onerror=function(){load(el,u,i+1)};im.src=u[i]}
function photos(root){(root||document).querySelectorAll('.ph[data-n]').forEach(function(el){if(el.dataset.busy)return;el.dataset.busy=1;var u=[],f=el.dataset.fb;if(el.dataset.src)u.push(el.dataset.src);if(f)u.push(PH[f]?CM+encodeURIComponent(PH[f])+'?width=480':f);load(el,u,0)})}

/* Ilustrasi menu (SVG). Dipakai jika foto sendiri di images/menu/ belum ada. */
function sh(){return '<ellipse cx="60" cy="112" rx="36" ry="5" fill="#000" fill-opacity=".12"/>'}
function cup(s,a,tg){var o=sh()+(tg?'':'<path d="M48 44c-6-6 6-10 0-18M62 44c-6-6 6-10 0-18M76 44c-6-6 6-10 0-18" stroke="#b9a999" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>')+'<ellipse cx="60" cy="98" rx="44" ry="9" fill="#efe5d9" stroke="#d8cabb" stroke-width="2"/><path d="M94 62c16-2 16 20-2 22" fill="none" stroke="#e5d9cb" stroke-width="6" stroke-linecap="round"/><path d="M24 56h72c0 28-14 44-36 44S24 84 24 56z" fill="#fff" stroke="#d8cabb" stroke-width="2"/><ellipse cx="60" cy="56" rx="36" ry="8" fill="'+s+'"/>';
if(a=='heart')o+='<path d="M60 61c-12-7-14-11-8-13 4-1 6 1 8 3 2-2 4-4 8-3 6 2 4 6-8 13z" fill="#8a5a35"/>';
if(a=='leaf')o+='<path d="M46 56c6-7 22-7 28 0-6 5-22 5-28 0z" fill="#f3e2c8"/><path d="M60 52v8" stroke="#8a5a35" stroke-width="2"/>';
if(tg)o+='<path d="M60 56L48 34" stroke="#9a7458" stroke-width="2"/><rect x="38" y="22" width="16" height="14" rx="2" fill="#f4e4c1" stroke="#c9a87a"/>';
return o}
function xl(y){return 30+7*(y-28)/76}function xr(y){return 90-7*(y-28)/76}
function glass(L,o){o=o||{};var s=sh()+'<path d="M30 28h60l-7 76a6 6 0 0 1-6 6H43a6 6 0 0 1-6-6z" fill="#fff" fill-opacity=".5"/>';
L.forEach(function(l){var a=l[0],b=Math.min(l[1],104);s+='<path d="M'+xl(a)+' '+a+'H'+xr(a)+'L'+xr(b)+' '+b+'H'+xl(b)+'z" fill="'+l[2]+'"/>'});
if(o.ice)s+='<rect x="40" y="50" width="17" height="17" rx="4" transform="rotate(-12 48 58)" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-opacity=".7"/><rect x="62" y="66" width="17" height="17" rx="4" transform="rotate(10 70 74)" fill="#fff" fill-opacity=".4" stroke="#fff" stroke-opacity=".7"/>';
s+='<path d="M30 28h60l-7 76a6 6 0 0 1-6 6H43a6 6 0 0 1-6-6z" fill="none" stroke="#cdbfb0" stroke-width="2"/>';
if(o.cream)s+='<path d="M32 30c-2-16 18-22 28-22s30 6 28 22c0 4-10 6-28 6S32 34 32 30z" fill="#fff8ea" stroke="#eadcc6" stroke-width="2"/>';
if(o.scoop)s+='<circle cx="60" cy="30" r="21" fill="'+o.scoop+'" stroke="#e5d6bd" stroke-width="2"/><path d="M46 24q14 9 28 0" stroke="#6b4630" stroke-width="3" fill="none" stroke-linecap="round"/>';
if(o.straw)s+='<path d="M72 6L62 88" stroke="'+o.straw+'" stroke-width="5" stroke-linecap="round"/>';
var g=o.garnish;
if(g=='lemon')s+='<circle cx="90" cy="30" r="13" fill="#f7d75a" stroke="#e0b82a" stroke-width="2"/><path d="M90 19v22M79 30h22M82 22l16 16M98 22L82 38" stroke="#fff3b0" stroke-width="1.5"/>';
if(g=='mint')s+='<path d="M80 26c6-14 20-10 20-10-2 11-11 15-20 10z" fill="#5fa45f"/><path d="M76 28c0-13-11-15-11-15-2 9 2 15 11 15z" fill="#79b86f"/>';
if(g=='cherry')s+='<circle cx="58" cy="10" r="7" fill="#c8283c"/><path d="M58 4c0-6 9-8 12-5" stroke="#4d7a3a" stroke-width="2" fill="none"/>';
if(g=='berry')s+='<circle cx="86" cy="28" r="6" fill="#c8283c"/><circle cx="96" cy="35" r="6" fill="#a81f33"/>';
return s}
function bottle(c){return sh()+'<path d="M50 14h20v14c0 8 14 12 14 28v48a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6V56c0-16 14-20 14-28z" fill="#fff" fill-opacity=".55" stroke="#cdbfb0" stroke-width="2"/><path d="M38 60h44v46a4 4 0 0 1-4 4H42a4 4 0 0 1-4-4z" fill="'+c+'"/><rect x="48" y="6" width="24" height="9" rx="2" fill="#7b5a43"/><rect x="42" y="74" width="36" height="26" rx="4" fill="#fff" fill-opacity=".88"/><path d="M52 87h16" stroke="#7b5a43" stroke-width="3" stroke-linecap="round"/>'}
function coco(){return sh()+'<circle cx="60" cy="72" r="38" fill="#7b5a43" stroke="#5a3f2d" stroke-width="2"/><ellipse cx="60" cy="46" rx="24" ry="10" fill="#fff8e8" stroke="#e5d8bd" stroke-width="2"/><ellipse cx="60" cy="47" rx="17" ry="5" fill="#eadfc4"/><path d="M68 6L58 48" stroke="#e8853a" stroke-width="5" stroke-linecap="round"/><circle cx="46" cy="76" r="3" fill="#5a3f2d"/><circle cx="60" cy="84" r="3" fill="#5a3f2d"/><circle cx="74" cy="76" r="3" fill="#5a3f2d"/>'}
function tcup(c,t){return sh()+'<rect x="32" y="12" width="56" height="11" rx="5" fill="#5a4636"/><rect x="37" y="23" width="46" height="7" fill="#4a3a2d"/><path d="M36 30h48l-6 76a4 4 0 0 1-4 4H46a4 4 0 0 1-4-4z" fill="#fff" stroke="#d8cabb" stroke-width="2"/><path d="M38 54h44l-4 44H42z" fill="'+c+'"/><circle cx="60" cy="76" r="11" fill="#fff" fill-opacity=".92"/><text x="60" y="80" text-anchor="middle" font-size="10" font-weight="700" font-family="sans-serif" fill="'+c+'">'+t+'</text>'}
function v60(){return sh()+'<path d="M28 100h64v6a4 4 0 0 1-4 4H32a4 4 0 0 1-4-4z" fill="#efe5d9"/><path d="M32 64h56l-5 36H37z" fill="#fff" stroke="#d8cabb" stroke-width="2"/><path d="M35 86h50l-2 14H37z" fill="#3a2216"/><path d="M22 18h76L72 52H48z" fill="#fbf9f7" stroke="#cdbfb0" stroke-width="2"/><path d="M28 22h64" stroke="#9a7458" stroke-width="4" stroke-linecap="round"/><rect x="56" y="52" width="8" height="9" fill="#cdbfb0"/><path d="M60 64q-3 5 0 7 3-2 0-7z" fill="#3a2216"/>'}
function croi(d){var g='fill="#e3a445" stroke="#b9772a" stroke-width="2"';return sh()+'<ellipse cx="22" cy="86" rx="9" ry="15" transform="rotate(55 22 86)" '+g+'/><ellipse cx="98" cy="86" rx="9" ry="15" transform="rotate(-55 98 86)" '+g+'/><ellipse cx="38" cy="70" rx="13" ry="20" transform="rotate(30 38 70)" '+g+'/><ellipse cx="82" cy="70" rx="13" ry="20" transform="rotate(-30 82 70)" '+g+'/><ellipse cx="60" cy="60" rx="16" ry="25" '+g+'/><path d="M52 42c-2 10-2 24 0 36M68 42c2 10 2 24 0 36" stroke="#f2c470" stroke-width="3" fill="none" stroke-linecap="round"/>'+(d?'<path d="M28 64q8-8 16 0t16 0t16 0t16 0" stroke="'+d+'" stroke-width="4" fill="none" stroke-linecap="round"/>':'')}
function pac(ch,x){var s=sh()+'<rect x="12" y="44" width="96" height="54" rx="24" fill="#e0a14b" stroke="#b9772a" stroke-width="2"/><path d="M36 46c-4 16-4 34 0 50M52 46c-3 16-3 34 0 50M68 46c3 16 3 34 0 50M84 46c4 16 4 34 0 50" stroke="#f0c070" stroke-width="3" fill="none"/><rect x="12" y="58" width="12" height="26" rx="6" fill="'+ch+'"/><rect x="96" y="58" width="12" height="26" rx="6" fill="'+ch+'"/>';
if(x=='sugar')s+='<circle cx="40" cy="58" r="2" fill="#fff"/><circle cx="56" cy="52" r="2" fill="#fff"/><circle cx="72" cy="60" r="2" fill="#fff"/><circle cx="48" cy="72" r="2" fill="#fff"/><circle cx="66" cy="76" r="2" fill="#fff"/><circle cx="84" cy="68" r="2" fill="#fff"/>';
if(x=='drizzle')s+='<path d="M30 56l18 22M50 56l18 22M70 56l18 22" stroke="'+ch+'" stroke-width="4" stroke-linecap="round"/>';return s}
function dan(f,t){var s=sh()+'<rect x="22" y="32" width="76" height="76" rx="14" fill="#e0a14b" stroke="#b9772a" stroke-width="2"/><path d="M24 46l36 24 36-24M24 94l36-24 36 24" stroke="#f0c070" stroke-width="3" fill="none"/><circle cx="60" cy="70" r="18" fill="'+f+'" stroke="#e5d3b0" stroke-width="2"/>';
if(t=='almond')s+='<ellipse cx="52" cy="64" rx="6" ry="3" transform="rotate(-30 52 64)" fill="#f4e1b8" stroke="#d3b179"/><ellipse cx="68" cy="64" rx="6" ry="3" transform="rotate(30 68 64)" fill="#f4e1b8" stroke="#d3b179"/><ellipse cx="60" cy="74" rx="6" ry="3" fill="#f4e1b8" stroke="#d3b179"/>';
if(t=='cran')s+='<circle cx="53" cy="65" r="4" fill="#b8283c"/><circle cx="67" cy="66" r="4" fill="#b8283c"/><circle cx="60" cy="76" r="4" fill="#b8283c"/>';return s}
function bun(t,d){var P=[[44,64],[62,54],[78,68],[54,76],[70,80],[36,78]],s=sh()+'<ellipse cx="60" cy="94" rx="46" ry="12" fill="#c98a3a"/><path d="M14 90c0-36 20-56 46-56s46 20 46 56z" fill="'+t+'" stroke="#b9772a" stroke-width="2"/><path d="M32 56c6-9 15-13 28-13" stroke="#fff" stroke-opacity=".35" stroke-width="5" fill="none" stroke-linecap="round"/>';
P.forEach(function(p,i){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+d[i%d.length]+'"/>'});return s}
function ring(ic,sp){var s=sh()+'<circle cx="60" cy="72" r="38" fill="#c98a3a"/><circle cx="60" cy="66" r="38" fill="#e0a85c" stroke="#b9772a" stroke-width="2"/>';
if(ic)s+='<circle cx="60" cy="66" r="34" fill="'+ic+'" fill-opacity="'+(sp?1:.6)+'"/>';
s+='<circle cx="60" cy="66" r="12" fill="#f3ece3" stroke="#b9772a" stroke-width="2"/>';
(sp||[]).forEach(function(c,i){var a=i*1.05;s+='<rect x="'+(60+Math.cos(a)*23-4)+'" y="'+(66+Math.sin(a)*23-1.5)+'" width="8" height="3" rx="1.5" fill="'+c+'" transform="rotate('+(i*60)+' '+(60+Math.cos(a)*23)+' '+(66+Math.sin(a)*23)+')"/>'});return s}
function roll(k){var s=sh()+'<rect x="14" y="46" width="92" height="50" rx="25" fill="#e6b060" stroke="#b9772a" stroke-width="2"/>';
if(k=='c')s+='<path d="M34 52l8 24M54 50l8 26M74 50l8 26M92 54l-6 22" stroke="#f6d25a" stroke-width="6" stroke-linecap="round"/>';
else s+='<ellipse cx="16" cy="71" rx="7" ry="15" fill="#b4552f"/><ellipse cx="104" cy="71" rx="7" ry="15" fill="#b4552f"/><path d="M34 52c4 10 4 20 0 30M54 50c4 10 4 22 0 32M74 50c4 10 4 22 0 32M92 52c4 10 4 20 0 30" stroke="#f0c070" stroke-width="3" fill="none"/>';return s}
function loaf(){return sh()+'<rect x="22" y="34" width="64" height="62" rx="8" transform="rotate(-8 54 65)" fill="#6b4630" stroke="#4a2f1f" stroke-width="3"/><rect x="34" y="42" width="60" height="58" rx="8" transform="rotate(6 64 71)" fill="#8a5a35" stroke="#4a2f1f" stroke-width="3"/><rect x="42" y="50" width="44" height="42" rx="4" transform="rotate(6 64 71)" fill="#a8703f"/><circle cx="56" cy="62" r="3" fill="#5a3623"/><circle cx="72" cy="70" r="3" fill="#5a3623"/><circle cx="60" cy="80" r="3" fill="#5a3623"/>'}
function bag(c){return sh()+'<path d="M30 18h60l10 16v70a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6V34z" fill="'+c+'" stroke="#00000030" stroke-width="2"/><rect x="20" y="32" width="80" height="8" fill="#000" fill-opacity=".15"/><circle cx="60" cy="76" r="22" fill="#f4e9dc"/><use href="#bn" x="48" y="61" width="24" height="31"/>'}
var K='#3a2216',IL={
"Black":function(){return cup(K)},
"Yumaju Signature Black":function(){return glass([[36,52,'#d9a441'],[52,104,'#3b2418']],{ice:1,straw:'#9c6b3c',garnish:'lemon'})},
"Yumaju Fruity Black":function(){return glass([[36,62,'#f08a3c'],[62,104,'#3b2418']],{ice:1,straw:'#d9822b',garnish:'berry'})},
"White":function(){return cup('#f3e2c8','heart')},
"Black Magic":function(){return glass([[36,52,'#f3e2c8'],[52,74,'#8a5a35'],[74,104,'#2a170e']],{straw:'#7b4a2a'})},
"Flavor Coffee Shakes":function(){return glass([[40,104,'#c99a6a']],{cream:1,straw:'#7b4a2a'})},
"Flavor Coffee":function(){return glass([[36,62,'#e6c58f'],[62,104,'#7a4a2a']],{ice:1,straw:'#7b4a2a'})},
"Dessert Coffee":function(){return glass([[52,104,'#4a2f1f']],{scoop:'#f6ead3'})},
"Manual Brew":v60,
"Matcha Shakes":function(){return glass([[40,104,'#9ec27a']],{cream:1,straw:'#5f8a3f'})},
"Premium Matcha":function(){return glass([[36,60,'#f1ead7'],[60,104,'#7aa653']],{ice:1,straw:'#5f8a3f'})},
"House Blend Chocolate":function(){return cup('#5a3623','leaf')},
"Milkshakes":function(){return glass([[40,104,'#f4dcdc']],{cream:1,garnish:'cherry',straw:'#c8283c'})},
"Tea":function(){return cup('#c8782c','',1)},
"Artisan Tea":function(){return glass([[36,64,'#e57b6a'],[64,104,'#f4c27a']],{ice:1,straw:'#d9822b',garnish:'mint'})},
"Tea Shakes":function(){return glass([[38,104,'#a9c6ee']],{cream:1,straw:'#6f94c9'})},
"Seasonal Cold Press Juice":function(){return glass([[34,104,'#f0a030']],{ice:1,straw:'#e8853a',garnish:'lemon'})},
"Yumaju Kombucha":function(){return bottle('#d9a441')},
"Coconut Water":coco,
"Saferunner 250 ml":function(){return tcup('#9a7458','250')},
"Saferunner 500 ml":function(){return tcup('#7b5a43','500')},
"Cocoa x Coffee":function(){return glass([[36,58,'#f3e2c8'],[58,104,'#5a3623']],{cream:1,straw:'#7b4a2a'})},
"Yumolen Du Banana":function(){return bun('#e2b465',['#f5d96b','#f0c94a'])},
"Butter Croissant":function(){return croi()},
"Cheese Roll":function(){return roll('c')},
"Chocolate Pepito":function(){return pac('#4a2f1f','sugar')},
"Yumaju Pain Au Chocolat":function(){return pac('#4a2f1f')},
"Salted Caramel":function(){return croi('#c07a2a')},
"Almond Vanilla Danish":function(){return dan('#fff3d6','almond')},
"Cranberry Cheese Cream":function(){return dan('#f7f0e0','cran')},
"Yumaju Chocolatine":function(){return pac('#3a2216','drizzle')},
"Sausages Roll":function(){return roll('s')},
"Ontbijtkoek":loaf,
"Yumaju Bagel":function(){return ring('#9ec27a',0)},
"Orange Raisin Walnut Cheese Bun":function(){return bun('#e0a24d',['#5a3623','#f6d25a','#a8703f'])},
"Cranberry White Choco Pistachio":function(){return bun('#d9a04c',['#b8283c','#fff8ea','#8fb86a'])},
"Yumaju Donut":function(){return ring('#e9a8b8',['#fff','#f4d35e','#6fb1e8','#fff','#f4d35e','#6fb1e8'])},
"Single Origin (per pcs)":function(){return bag('#c9a47c')},
"Yumaju Blend (per pcs)":function(){return bag('#4a2f1f')}},
AL={"Croissant":"Butter Croissant","Matcha":"Premium Matcha","White (Latte)":"White","Flavor Coffee Caramel":"Flavor Coffee"};
function ill(n){var f=IL[n]||IL[AL[n]]||IL.Black;return '<svg viewBox="0 0 120 120" role="img" aria-label="'+esc(n)+'">'+f()+'</svg>'}

/* Intro: biji kopi jatuh satu kali, lalu diam */
var bp=[[4,8],[14,70],[24,22],[44,88],[58,6],[72,80],[84,18],[93,62]],fx='';
bp.forEach(function(p,i){fx+='<svg width="'+(18+i%3*7)+'" height="'+(25+i%3*9)+'" viewBox="0 0 24 32" style="--i:'+i+';left:'+p[0]+'%;top:'+p[1]+'%;transform:rotate('+(i*47)+'deg);opacity:.55"><use href="#bn"/></svg>'});
$('fx').innerHTML=fx;
var mi=['Fresh Beans','Premium Taste','Cozy Space','Croissant Segar','Seduh Manual','Single Origin'].map(function(t){return '<span>'+t+'</span>'}).join('<span>✦</span>')+'<span>✦</span>';
$('mq').innerHTML='<div class="mqt">'+mi+mi+'</div>';
var ie=$('intro');
(function(){var hc=document.querySelector('.hero .circ'),u=['images/coffee-bg.jpg',hc&&hc.dataset.src,CM+encodeURIComponent(PH.latte)+'?width=900'].filter(Boolean),g='linear-gradient(rgba(47,35,29,.72),rgba(47,35,29,.9))';
function t(i){if(!ie||i>=u.length)return;var im=new Image();im.onload=function(){if($('intro'))ie.style.background=g+',url("'+u[i]+'") 65% 60%/cover'};im.onerror=function(){t(i+1)};im.src=u[i]}t(0)})();
var it=setTimeout(function(){if(ie)ie.remove()},3600);
if(ie)ie.onclick=function(){clearTimeout(it);document.documentElement.style.setProperty('--t','0s');ie.style.animation='out .3s forwards';setTimeout(function(){ie.remove()},300)};

/* Menu */
function tabs(){$('tabs').innerHTML=keys.map(function(k){return '<button class="tab" role="tab" aria-selected="'+(k==cur)+'" data-k="'+k+'">'+k+'</button>'}).join('')}
function list(){$('list').innerHTML=M[cur].map(function(it,i){return '<div class="item"><div class="th ph"'+pa(it[0])+'></div><div class="tx"><b>'+it[0]+'</b>'+(it[1]?'<small>'+it[1]+'</small>':'')+'</div><div class="pr"><span class="hg">'+fp(it[3])+'</span><button class="add" data-i="'+i+'" aria-label="Tambah '+it[0]+'">+</button></div></div>'}).join('');photos($('list'))}
$('tabs').onclick=function(e){var k=e.target.dataset.k;if(k){cur=k;tabs();list()}};
$('list').onclick=function(e){var i=e.target.dataset.i;if(i==null)return;var it=M[cur][i];cart[it[0]]=cart[it[0]]||{q:0,p:it[2]};cart[it[0]].q++;draw();$('okC').textContent='';notify(it[0],1)};

/* Signature drinks */
var SG={"Kopi":[["Yumaju Signature Black",29,"signature-black"],["White (Latte)",33,"latte"],["Flavor Coffee Caramel",40,"caramel-coffee"]],
"Teh":[["Artisan Tea",40,"artisan-tea"],["Tea Shakes",35,"tea-shake"],["Yumaju Kombucha",30,"kombucha"]],
"Non-kopi":[["Premium Matcha",45,"matcha"],["House Blend Chocolate",37.5,"chocolate"],["Milkshakes",50,"milkshake"]],
"Roti":[["Butter Croissant",20,"croissant"],["Yumaju Pain Au Chocolat",27.5,"pain-au-chocolat"],["Yumaju Bagel",21,"bagel"]]};
var sc=Object.keys(SG)[0],si=0,sq=1;
function stabs(){$('stabs').innerHTML=Object.keys(SG).map(function(k){return '<button class="tab" role="tab" aria-selected="'+(k==sc)+'" data-k="'+k+'">'+k+'</button>'}).join('')}
function slide(){var a=SG[sc][si];$('sslide').innerHTML='<button class="arr l" id="pv" aria-label="Sebelumnya">‹</button><button class="arr r" id="nx" aria-label="Berikutnya">›</button><div class="vis"><div class="blob"></div><div class="circ ph" '+pa(a[0])+'></div></div><span class="eyb">Pilihan kami</span><h3>'+a[0]+'</h3><div class="stars" aria-label="Bintang 5">★★★★★</div><div class="price">'+rk(a[1])+'</div><div class="buy"><div class="qty"><button id="qm" aria-label="Kurangi">−</button><span id="qn">'+sq+'</span><button id="qp" aria-label="Tambah">+</button></div><button class="btn" id="ord">Order Now →</button></div><div class="ok" id="okG" role="status"></div>';photos($('sslide'))}
$('stabs').onclick=function(e){var k=e.target.dataset.k;if(k){sc=k;si=0;sq=1;stabs();slide()}};
$('sslide').onclick=function(e){var i=e.target.id,n=SG[sc].length,a=SG[sc][si];
if(i=='pv'){si=(si+n-1)%n;sq=1;slide()}else if(i=='nx'){si=(si+1)%n;sq=1;slide()}
else if(i=='qm'){sq=Math.max(1,sq-1);$('qn').textContent=sq}else if(i=='qp'){sq++;$('qn').textContent=sq}
else if(i=='ord'){cart[a[0]]=cart[a[0]]||{q:0,p:a[1]};cart[a[0]].q+=sq;draw();$('okG').textContent=sq+' x '+a[0]+' masuk ke pesanan.';notify(a[0],sq);sq=1;$('qn').textContent=1}};

/* Keranjang */
function sub(){var t=0;for(var k in cart)t+=cart[k].q*cart[k].p*1000;return t}
function draw(){var ks=Object.keys(cart),n=0;$('lines').innerHTML=ks.length?ks.map(function(k){var c=cart[k];n+=c.q;return '<div class="ln"><span>'+esc(k)+'<br><small style="color:var(--mute)">'+rk(c.p)+'</small></span><span style="display:flex;gap:8px;align-items:center"><button data-d="'+esc(k)+'" aria-label="Kurangi">−</button>'+c.q+'<button data-u="'+esc(k)+'" aria-label="Tambah">+</button></span></div>'}).join(''):'<p style="color:var(--mute)">Belum ada pesanan. Tambahkan dari menu.</p>';var wl=ks.map(function(k){return '• '+cart[k].q+' x '+k+' — '+rk(cart[k].q*cart[k].p)});$('waCart').hidden=!ks.length;$('waCart').href=wa('*Pesanan Coffe Yumaju*\n'+wl.join('\n')+'\nSubtotal: '+rp(sub())+'\n\nMohon dikonfirmasi ya, terima kasih.');$('cnt').textContent=n;$('total').textContent=rp(sub());$('fabN').textContent=n+' item';$('fabT').textContent=rp(sub());$('fab').hidden=!n}
var tt;
function notify(nm,q){var t=$('toast');$('toastT').textContent='✓ '+q+' x '+nm+' ditambahkan ke pesanan';t.classList.add('show');
['cnt','fab'].forEach(function(i){var e=$(i);e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')});
clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show')},2600)}
$('toastGo').onclick=function(){$('toast').classList.remove('show');$('drawer').classList.add('open')};
$('fab').onclick=function(){$('drawer').classList.add('open')};
$('lines').onclick=function(e){var d=e.target.dataset;if(d.u)cart[d.u].q++;if(d.d&&--cart[d.d].q<1)delete cart[d.d];draw()};
$('openCart').onclick=function(){$('drawer').classList.add('open')};
$('closeCart').onclick=function(){$('drawer').classList.remove('open')};

/* Pembayaran */
function calc(){var s=sub(),d=promoOn?Math.round(s*DISC):0,x=Math.round((s-d)*TAX);return{s:s,d:d,x:x,t:s-d+x}}
function chg(){$('chg').textContent=rp(Math.max(0,(+$('cash').value||0)-calc().t))}
function sum(){var c=calc();$('sSub').textContent=rp(c.s);$('rDisc').hidden=!c.d;$('sDisc').textContent='−'+rp(c.d);$('sTax').textContent=rp(c.x);$('sTot').textContent=rp(c.t);chg()}
function setM(m){method=m;document.querySelectorAll('.mt').forEach(function(b){b.classList.toggle('on',b.dataset.m==m)});$('cashBox').hidden=m!='tunai';$('qris').hidden=m!='qris'}
$('goPay').onclick=function(){if(!Object.keys(cart).length){$('okC').textContent='Tambahkan menu dulu.';return}promoOn=false;$('promo').value='';$('promoMsg').textContent='';$('payErr').textContent='';setM('tunai');sum();$('drawer').classList.remove('open');$('pay').classList.add('open');photos($('pay'))};
document.querySelectorAll('.chips button').forEach(function(b){b.onclick=function(){var t=$('nt'),v=b.textContent.replace('+ ','');t.value+=(t.value?', ':'')+v}});
document.querySelectorAll('.mt').forEach(function(b){b.onclick=function(){setM(b.dataset.m)}});
$('cash').oninput=chg;
$('promo').oninput=function(){if(promoOn){promoOn=false;$('promoMsg').textContent='';sum()}};
$('usePromo').onclick=function(){var c=$('promo').value.trim().toUpperCase(),p=ld('yj_promo');
if(c&&p&&!p.used&&c===p.code){promoOn=true;$('promoMsg').textContent='Kode promo dipakai. Diskon '+DISC*100+'% untuk pesanan ini.'}else{promoOn=false;$('promoMsg').textContent='Kode promo tidak valid atau sudah dipakai.'}sum()};
function closeAll(){['pay','done'].forEach(function(i){$(i).classList.remove('open')})}
$('payNo').onclick=closeAll;$('doneOk').onclick=closeAll;
document.addEventListener('keydown',function(e){if(e.key=='Escape'){closeAll();$('drawer').classList.remove('open')}});
function code(){var a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',s='YUMAJU';for(var i=0;i<4;i++)s+=a[Math.floor(Math.random()*a.length)];return s}
$('payOk').onclick=function(){var nm=$('pn').value.trim(),c=calc(),cash=+$('cash').value||0,tunai=method=='tunai',E=$('payErr');
if(!nm){E.textContent='Isi nama pemesan.';$('pn').focus();return}
if(tunai&&cash<c.t){E.textContent='Uang diterima kurang dari total bayar.';$('cash').focus();return}
E.textContent='';
var n=(ld('yj_orders')||0)+1,p=ld('yj_promo'),gift='';
if(promoOn&&p){p.used=true;sv('yj_promo',p)}
if(n==1&&!p){gift=code();sv('yj_promo',{code:gift,used:false})}
sv('yj_orders',n);
var oid='YJ-'+String(Date.now()).slice(-5);
var r=function(a,b){return '<div class="srow"><span>'+a+'</span><b>'+b+'</b></div>'},h='<p style="margin:0 0 8px;color:var(--mute)">Pesanan '+oid+' atas nama <b>'+esc(nm)+'</b> ('+$('ty').value+')</p>';
Object.keys(cart).forEach(function(k){h+=r(cart[k].q+' x '+esc(k),rk(cart[k].q*cart[k].p))});
h+=r('Subtotal',rp(c.s));if(c.d)h+=r('Diskon promo','−'+rp(c.d));h+=r('Pajak 10%',rp(c.x))+r('<b>Total bayar</b>',rp(c.t));
h+=tunai?r('Tunai',rp(cash))+r('Kembalian',rp(cash-c.t)):r('Metode','QRIS');
if($('nt').value.trim())h+='<p style="color:var(--mute);margin:10px 0 0">Catatan: '+esc($('nt').value.trim())+'</p>';
if(gift)h+='<div class="gift">Terima kasih sudah memesan pertama kali! Ini kode promo untuk pesanan berikutnya:<b>'+gift+'</b>Diskon '+DISC*100+'%, berlaku satu kali. Simpan kodenya.</div>';
var wm=['*Pesanan Coffe Yumaju*','No: '+oid,'Nama: '+nm,'Jenis: '+$('ty').value,''];
Object.keys(cart).forEach(function(k){wm.push('• '+cart[k].q+' x '+k+' — '+rk(cart[k].q*cart[k].p))});
wm.push('','Subtotal: '+rp(c.s));if(c.d)wm.push('Diskon promo: −'+rp(c.d));wm.push('Pajak 10%: '+rp(c.x),'*Total bayar: '+rp(c.t)+'*','Pembayaran: '+(tunai?'Tunai':'QRIS'));
if($('nt').value.trim())wm.push('Catatan: '+$('nt').value.trim());
$('waBtn').href=wa(wm.join('\n'));
$('rcpt').innerHTML=h;cart={};draw();['pn','nt','cash'].forEach(function(i){$(i).value=''});
$('pay').classList.remove('open');$('done').classList.add('open')};

/* Testimoni */
var T=[["Kopinya mantap dan croissant-nya masih hangat. Tempatnya nyaman untuk kerja seharian.","Dina"],["Pelayanan ramah dan cepat. Yumaju jadi tempat favorit sebelum berangkat kerja!","Mega"],["Matcha-nya pas, tidak terlalu manis. Mohon tambah varian caramel lagi ya.","Raka"],["Suka sekali manual brew single origin-nya. Baristanya paham betul soal kopi.","Bayu"]];
function tcard(t){var d=document.createElement('div');d.className='tc';d.innerHTML='<div class="stars">★★★★★</div><p></p><b></b>';d.children[1].textContent='“'+t[0]+'”';d.children[2].textContent=t[1];return d}
T.forEach(function(t){$('tst').appendChild(tcard(t))});
$('fSaran').onsubmit=function(e){e.preventDefault();var d=tcard([$('st').value.trim(),$('sn').value.trim()]);$('tst').appendChild(d);d.scrollIntoView({behavior:reduce?'auto':'smooth',inline:'center',block:'nearest'});$('okS').textContent='Terima kasih, ulasanmu sudah tampil di atas.';e.target.reset()};

/* Lokasi & footer */
$('copyAddr').onclick=function(){var a='Jl. Ir. H. Juanda No.119a, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132';try{navigator.clipboard.writeText(a).then(function(){$('okA').textContent='Alamat disalin.'},function(){$('okA').textContent=a})}catch(e){$('okA').textContent=a}};
$('fSub').onsubmit=function(e){e.preventDefault();$('okU').textContent='Terima kasih, kamu sudah terdaftar.';e.target.reset()};
tabs();list();stabs();slide();draw();photos();
