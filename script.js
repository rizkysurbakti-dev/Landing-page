/* Coffe Yumaju. Harga di data menu dalam ribuan rupiah. */
var M={"Kopi":[["Black","Soft, medium, standard · espresso, americano, long black",29,"29–33"],["Yumaju Signature Black","Lemon atau honey",29,"29–32,5"],["Yumaju Fruity Black","Tropica, Rubos",35,"35"],["White","Cappuccino, latte, piccolo, flat white",33,"33–36"],["Black Magic","Black hole, moreno, leopoldon",38,"38–41"],["Flavor Coffee Shakes","Caramel, butterscotch, hazelnut",35,"35"],["Flavor Coffee","Caramel, butterscotch, hazelnut, vanilla, roast almond",40,"40–43"],["Dessert Coffee","Affogato, chocogato, matchagato",35,"35"],["Manual Brew","Single origin musiman",35,"35–50"]],
"Non-kopi":[["Matcha Shakes","",35,"35"],["Premium Matcha","Latte, dirty, tropical",45,"45"],["House Blend Chocolate","",37.5,"37,5"],["Milkshakes","Kopi, cokelat, vanilla",50,"50"],["Tea","Black, green, earl grey",32.5,"32,5"],["Artisan Tea","Scarlet green tea, mango mint, mint ice cream black tea, earl grey cream",40,"40–42"],["Tea Shakes","Tropical blue tea, ruby rose tea",35,"35"],["Seasonal Cold Press Juice","Tanya barista untuk varian",35,"35"],["Yumaju Kombucha","",30,"30"],["Coconut Water","Regular / besar",19,"19 / 32"],["Saferunner 250 ml","Latte, less sweet, cappuccino, allez",27,"27"],["Saferunner 500 ml","",54,"54"],["Cocoa x Coffee","",45,"45"]],
"Roti & croissant":[["Yumolen Du Banana","",15,"15"],["Butter Croissant","",20,"20"],["Cheese Roll","",15,"15"],["Chocolate Pepito","",27.5,"27,5"],["Yumaju Pain Au Chocolat","",27.5,"27,5"],["Salted Caramel","",27.5,"27,5"],["Almond Vanilla Danish","",28,"28"],["Cranberry Cheese Cream","",28,"28"],["Yumaju Chocolatine","",29.5,"29,5"],["Sausages Roll","",30,"30"],["Ontbijtkoek","",22.5,"22,5"],["Yumaju Bagel","Matcha, cheese, blueberry",21,"21–25"],["Orange Raisin Walnut Cheese Bun","",30,"30"],["Cranberry White Choco Pistachio","",31,"31"],["Yumaju Donut","Oreo, cheese, red velvet",10,"10–15"]],
"Coffee bag":[["Single Origin (per pcs)","Biji kopi untuk dibawa pulang",18,"18"],["Yumaju Blend (per pcs)","Biji kopi untuk dibawa pulang",15,"15"]]};
var $=function(i){return document.getElementById(i)},cart={},keys=Object.keys(M),cur=keys[0],TAX=.1,DISC=.1,promoOn=false,method='tunai';
function rp(n){return 'Rp'+Math.round(n).toLocaleString('id-ID')}
function rk(n){return rp(n*1000)}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function ld(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Gambar menu: urutan coba = 1) foto sendiri di images/menu/nama-menu.jpg, 2) foto asli dari Wikimedia Commons, 3) ilustrasi gelas (khusus minuman tanpa foto). */
var OWN=true,CM='https://commons.wikimedia.org/wiki/Special:FilePath/';
var PH={espresso:'Espresso_BW_1.jpg',latte:'Latte_macchiato_with_coffee_beans.jpg',matcha:'Matcha_tea_latte_with_rosetta_latte_art.jpg',croissant:'00_Croissant._Yum.jpg',pac:'Pain_au_chocolat_Luc_Viatour.jpg',goug:'Petites_gougères_apéritif.jpg',brioche:'Brioche_aux_pépites_de_chocolat.jpg'};
var PAL={tea:['#c0702f','#e9b87a','#f7e3c3'],shake:['#d9a3a3','#f2cfcf','#fff0f0'],juice:['#e58a1f','#f4b34a','#fde0a0'],komb:['#b88a4f','#ddb97b','#f1dfb0'],coco:['#cfe0d0','#e6efe4','#fbfbf4'],choc:['#4a2f1f','#6b4630','#d9bfa0'],cara:['#c88a4a','#f0d3a5','#fff3dc'],des:['#7a4a2a','#f0e2c8','#fff8e8']};
function gl(a){return '<svg viewBox="0 0 100 120"><path d="M20 20h60l-6 92a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6z" fill="#fff" fill-opacity=".55" stroke="#cdbfb0" stroke-width="2"/><path d="M24 48h52l-4 62H28z" fill="'+a[1]+'"/><path d="M26 74h48l-2 36H28z" fill="'+a[0]+'"/><ellipse cx="50" cy="40" rx="30" ry="9" fill="'+a[2]+'"/></svg>'}
function pick(n){var R=[[/croissant|salted caramel|danish|sausages/i,'croissant'],[/pain au|chocolatine|pepito/i,'pac'],[/cheese roll/i,'goug'],[/banana|bun|bagel|donut|ontbijt|cranberry/i,'brioche'],[/matcha/i,'matcha'],[/\btea\b/i,'tea*'],[/kombucha/i,'komb*'],[/juice/i,'juice*'],[/coconut/i,'coco*'],[/milkshake/i,'shake*'],[/chocolate|cocoa/i,'choc*'],[/dessert/i,'des*'],[/shakes/i,'cara*'],[/white|latte|flavor|saferunner/i,'latte'],[/./,'espresso']];for(var i=0;i<R.length;i++)if(R[i][0].test(n))return R[i][1]}
function pa(n){var k=pick(n),s=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),a=' data-n="'+n+'"';if(OWN)a+=' data-src="images/menu/'+s+'.jpg"';return a+(k.slice(-1)=='*'?' data-pal="'+k.slice(0,-1)+'"':' data-fb="'+k+'"')}
function load(el,u,i){if(i>=u.length){var p=el.dataset.pal;if(p){el.innerHTML=gl(PAL[p]);el.classList.add('has')}return}var im=new Image();im.alt=el.dataset.n||'';im.onload=function(){el.innerHTML='';el.appendChild(im);el.classList.add('has')};im.onerror=function(){load(el,u,i+1)};im.src=u[i]}
function photos(root){(root||document).querySelectorAll('.ph[data-n]').forEach(function(el){if(el.dataset.busy)return;el.dataset.busy=1;var u=[],f=el.dataset.fb;if(el.dataset.src)u.push(el.dataset.src);if(f)u.push(PH[f]?CM+encodeURIComponent(PH[f])+'?width=480':f);load(el,u,0)})}

/* Intro: biji kopi jatuh satu kali, lalu diam */
var bp=[[4,8],[14,70],[24,22],[44,88],[58,6],[72,80],[84,18],[93,62]],fx='';
bp.forEach(function(p,i){fx+='<svg width="'+(18+i%3*7)+'" height="'+(25+i%3*9)+'" viewBox="0 0 24 32" style="--i:'+i+';left:'+p[0]+'%;top:'+p[1]+'%;transform:rotate('+(i*47)+'deg);opacity:.55"><use href="#bn"/></svg>'});
$('fx').innerHTML=fx;
$('mq').innerHTML=['Fresh Beans','Premium Taste','Cozy Space','Croissant Segar','Seduh Manual','Single Origin'].map(function(t){return '<span>'+t+'</span>'}).join('<span style="color:#e0a15a">✦</span>');
setTimeout(function(){var e=$('intro');if(e)e.remove()},2700);

/* Menu */
function tabs(){$('tabs').innerHTML=keys.map(function(k){return '<button class="tab" role="tab" aria-selected="'+(k==cur)+'" data-k="'+k+'">'+k+'</button>'}).join('')}
function list(){$('list').innerHTML=M[cur].map(function(it,i){return '<div class="item"><div class="th ph"'+pa(it[0])+'></div><div class="tx"><b>'+it[0]+'</b>'+(it[1]?'<small>'+it[1]+'</small>':'')+'</div><div class="pr"><span>'+it[3]+'</span><button class="add" data-i="'+i+'" aria-label="Tambah '+it[0]+'">+</button></div></div>'}).join('');photos($('list'))}
$('tabs').onclick=function(e){var k=e.target.dataset.k;if(k){cur=k;tabs();list()}};
$('list').onclick=function(e){var i=e.target.dataset.i;if(i==null)return;var it=M[cur][i];cart[it[0]]=cart[it[0]]||{q:0,p:it[2]};cart[it[0]].q++;draw();$('okC').textContent=''};

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
else if(i=='ord'){cart[a[0]]=cart[a[0]]||{q:0,p:a[1]};cart[a[0]].q+=sq;draw();$('okG').textContent=sq+' x '+a[0]+' masuk ke pesanan.';sq=1;$('qn').textContent=1}};

/* Keranjang */
function sub(){var t=0;for(var k in cart)t+=cart[k].q*cart[k].p*1000;return t}
function draw(){var ks=Object.keys(cart),n=0;$('lines').innerHTML=ks.length?ks.map(function(k){var c=cart[k];n+=c.q;return '<div class="ln"><span>'+esc(k)+'<br><small style="color:var(--mute)">'+rk(c.p)+'</small></span><span style="display:flex;gap:8px;align-items:center"><button data-d="'+esc(k)+'" aria-label="Kurangi">−</button>'+c.q+'<button data-u="'+esc(k)+'" aria-label="Tambah">+</button></span></div>'}).join(''):'<p style="color:var(--mute)">Belum ada pesanan. Tambahkan dari menu.</p>';$('cnt').textContent=n;$('total').textContent=rp(sub())}
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
var r=function(a,b){return '<div class="srow"><span>'+a+'</span><b>'+b+'</b></div>'},h='<p style="margin:0 0 8px;color:var(--mute)">Pesanan YJ-'+String(Date.now()).slice(-5)+' atas nama <b>'+esc(nm)+'</b> ('+$('ty').value+')</p>';
Object.keys(cart).forEach(function(k){h+=r(cart[k].q+' x '+esc(k),rk(cart[k].q*cart[k].p))});
h+=r('Subtotal',rp(c.s));if(c.d)h+=r('Diskon promo','−'+rp(c.d));h+=r('Pajak 10%',rp(c.x))+r('<b>Total bayar</b>',rp(c.t));
h+=tunai?r('Tunai',rp(cash))+r('Kembalian',rp(cash-c.t)):r('Metode','QRIS');
if($('nt').value.trim())h+='<p style="color:var(--mute);margin:10px 0 0">Catatan: '+esc($('nt').value.trim())+'</p>';
if(gift)h+='<div class="gift">Terima kasih sudah memesan pertama kali! Ini kode promo untuk pesanan berikutnya:<b>'+gift+'</b>Diskon '+DISC*100+'%, berlaku satu kali. Simpan kodenya.</div>';
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
