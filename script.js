(function(){
  var c=document.getElementById('fx'),x=c.getContext('2d'),W,H,P=[],still=matchMedia('(prefers-reduced-motion: reduce)').matches,
  light=matchMedia('(prefers-color-scheme: light)').matches;
  var GREEN=light?['31,157,90','20,107,59','60,180,120']:['79,242,143','154,247,189','60,200,120'],YELLOW=light?'230,170,20':'255,214,74';
  function size(){var r=devicePixelRatio||1;W=innerWidth;H=innerHeight;c.width=W*r;c.height=H*r;x.setTransform(r,0,0,r,0,0)}
  function make(){var n=Math.max(14,Math.min(32,Math.round(W*H/30000)));P=[];
    for(var i=0;i<n;i++){var k=i%3;P.push({t:k,x:Math.random()*W,y:Math.random()*H,r:k==0?8+Math.random()*7:k==1?7+Math.random()*6:2.5+Math.random()*3,
      vx:(Math.random()-.5)*.3,vy:-.12-Math.random()*.3,a:light?.5:.55+Math.random()*.3,p:Math.random()*6,rot:Math.random()*6.28,vr:(Math.random()-.5)*.012,c:k==1?YELLOW:GREEN[i%3]})}}
  function clover(r){x.beginPath();for(var i=0;i<4;i++){x.rotate(1.5708);x.moveTo(0,0);x.bezierCurveTo(-r*.9,-r*.3,-r*.8,-r*1.1,0,-r*.7);x.bezierCurveTo(r*.8,-r*1.1,r*.9,-r*.3,0,0)}x.fill()}
  function star(r){x.beginPath();for(var i=0;i<10;i++){var a=i*Math.PI/5-Math.PI/2,q=i%2?r*.45:r;x.lineTo(Math.cos(a)*q,Math.sin(a)*q)}x.closePath();x.fill()}
  function draw(t){x.clearRect(0,0,W,H);
    P.forEach(function(d){
      if(!still){d.x+=d.vx+Math.sin(t/2200+d.p)*.15+(d.ix||0);d.y+=d.vy+(d.iy||0);d.rot+=d.vr+(d.n||0)*.06;
        var dx=d.x-M.x,dy=d.y-M.y,ds=Math.hypot(dx,dy),R=150;
        if(ds<R&&ds>.1){var f=1-ds/R;d.ix=(d.ix||0)+dx/ds*f*.25;d.iy=(d.iy||0)+dy/ds*f*.25;d.n=f}else d.n=(d.n||0)*.9;
        d.ix=(d.ix||0)*.92;d.iy=(d.iy||0)*.92;
        if(d.y<-24){d.y=H+24;d.x=Math.random()*W}if(d.x<-24)d.x=W+24;if(d.x>W+24)d.x=-24}
      x.save();x.translate(d.x,d.y);x.rotate(d.rot);var s=1+(d.n||0)*.7;x.scale(s,s);x.fillStyle='rgba('+d.c+','+Math.min(1,d.a+(d.n||0)*.35)+')';
      if(!light){x.shadowColor='rgba('+d.c+',.9)';x.shadowBlur=14}
      if(d.t==0)clover(d.r);else if(d.t==1)star(d.r);else{x.beginPath();x.arc(0,0,d.r,0,6.283);x.fill()}
      x.restore()});
    drawTrail();if(!still)requestAnimationFrame(draw)}
  size();make();requestAnimationFrame(draw);
  addEventListener('resize',function(){size();make();if(still)draw(0)});
  
  var T=[],M={x:-999,y:-999};
  var nav=document.querySelector('.top nav'),links=[].slice.call(nav.querySelectorAll('a')),pill=document.createElement('div'),act=null,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  pill.className='pill';nav.appendChild(pill);
  function go(a){links.forEach(function(l){l.classList.toggle('hot',l===a)});if(!a){pill.style.opacity=0;return}pill.style.width=a.offsetWidth+'px';pill.style.transform='translateX('+a.offsetLeft+'px)';pill.style.opacity=1}
  links.forEach(function(a){
    a.addEventListener('mouseenter',function(){go(a)});a.addEventListener('focus',function(){go(a)});a.addEventListener('blur',function(){go(act)});
    if(fine&&!still){a.addEventListener('mousemove',function(e){var r=a.getBoundingClientRect();a.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});a.addEventListener('mouseleave',function(){a.style.transform=''})}});
  nav.addEventListener('mouseleave',function(){go(act)});
  var PROJECTS={
    arduino:[
      {title:'IR-Based Object Detection and Alert System',
       desc:'Sistem pendeteksi objek berbasis Arduino menggunakan IR sensor yang dilengkapi buzzer dan LED sebagai indikator serta servo motor sebagai indikator serta servo motor sebagai penggerak mekanisme otomatis ketika objek terdeteksi',
       tags:['Arduino Uno','IR Sensor','Buzzer','Servo','LED','Breadboard'],
       img:'assets/arduino-1.png',
       pdf:'assets/skema-arduino-1.pdf'},
      {title:'Traffic Light',
       desc:'Simulasi sistem lampu lalu lintas persimpangan empat arah berbasis Arduino menggunakan LED sebagai indikator lampu dan 7-Segmen Display untuk menampilkan hitungan mundur pergantian lampu secara otomatis.',
       tags:['Arduino Uno','7 Segmen Display','Jumper','LED traffic light','Breadboard','Resistor'],
       img:'assets/traffic-light.png',
       pdf:'assets/skema-traffic-light.pdf'},
       {title: 'Automatic Gate System With Arduino',
        desc: 'Sistem palang otomatis berbasis arduino yang menggunakan sensor IR dan sensor ultrasonik untuk mendeteksi objek. Ketika objek terdeteksi, servo motor akan menggerakkan palang secara otomatis, disertai LED dan buzzer sebagai indikator.',
        tags:['Arduino Uno', 'Sensor Ultrasonic','IR Sensor','LED','Buzzer', 'Jumper','Breadboard','Servo'],
        img:'assets/arduino-3.png',
        pdf:'assets/skema-arduino-3.pdf'
       }
    ],
    cisco:[
      {title: 'Router-Based Network Simulation',
        desc:'Membuat dan mengonfigurasi simulasi jaringan komputer yang dihubungkan menggunakan router, dengan beberapa PC, switch, dan server.',
        tags:['PC','Switch','Router','Server'],
        img:'assets/cisco-1.png'},
      {title:'Computer Network & Web Server',
        desc:'Membuat simulasi jaringan komputer menggunakan Cisco Packet Tracer yang menghubungkan dua jaringan LAN melalui router dan switch.',
        tags:['Server','PC','Switch','Laptop','Router','Wireless router'],
        img:'assets/cisco-2.png'
      }
     ]
  };
  var slots=[].slice.call(document.querySelectorAll('.slot')),pd=document.getElementById('pjd'),pdt=pd.querySelector('.pd-t'),pdb=pd.querySelector('.pd-b'),TITLES={arduino:'Arduino',cisco:'Cisco Packet Tracer'};
  function el(t,c,s){var e=document.createElement(t);if(c)e.className=c;if(s)e.textContent=s;return e}
  slots.forEach(function(b){var n=PROJECTS[b.dataset.k].length;b.querySelector('.cnt').textContent=n?n+(n>1?' projects':' project'):'coming soon'});
  function render(k){var L=PROJECTS[k];pdt.textContent=TITLES[k];pdb.textContent='';
    if(!L.length){pdb.appendChild(el('div','em','Projects will be added soon.'));return}
    L.forEach(function(p){var a=el('article','pc');
      if(p.img){var im=el('img');im.alt=p.title;im.addEventListener('error',function(){im.remove()});im.src=p.img;a.appendChild(im)}
      a.appendChild(el('h4','',p.title));a.appendChild(el('p','',p.desc));
      if(p.tags&&p.tags.length){var t=el('div','tg');p.tags.forEach(function(s){t.appendChild(el('span','',s))});a.appendChild(t)}
      if(p.link||p.pdf){var q=el('div','bt');[[p.link,'View project ↗','f'],[p.pdf,(p.pdfLabel||'View schematic (PDF)')+' ↗','']].forEach(function(it){if(it[0]){var l=el('a','b s bx'+(it[2]?' f':''),it[1]);l.href=it[0];l.target='_blank';l.rel='noopener';q.appendChild(l)}});a.appendChild(q)}
      pdb.appendChild(a)})}
  slots.forEach(function(b){b.addEventListener('click',function(){render(b.dataset.k);pd.showModal();pdb.scrollTop=0})});
  pd.addEventListener('click',function(e){if(e.target===pd)pd.close()});
  pd.querySelector('.x').addEventListener('click',function(){pd.close()});
  addEventListener('resize',function(){go(act)});
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){act=links[secs.indexOf(e.target)];go(act)}})},{rootMargin:'-40% 0px -55% 0px'});secs.forEach(function(s){if(s)io.observe(s)})}
  addEventListener('pointermove',function(e){M.x=e.clientX;M.y=e.clientY});
  addEventListener('pointerup',function(e){if(e.pointerType!='mouse'){M.x=M.y=-999}});
  document.documentElement.addEventListener('mouseleave',function(){M.x=M.y=-999});
  if(!still)addEventListener('click',function(e){P.forEach(function(d){var dx=d.x-e.clientX,dy=d.y-e.clientY,ds=Math.hypot(dx,dy);if(ds<280&&ds>.1){var f=1-ds/280;d.ix=(d.ix||0)+dx/ds*f*9;d.iy=(d.iy||0)+dy/ds*f*9}})});
  function spawn(px,py,b){var k=Math.floor(Math.random()*3);T.push({x:px,y:py,vx:(Math.random()-.5)*(b?4:.9),vy:(Math.random()-.5)*(b?4:.9)-.2,r:k==2?2+Math.random()*2:5+Math.random()*5,t:k,rot:Math.random()*6.28,l:1,c:k==1?YELLOW:GREEN[Math.floor(Math.random()*GREEN.length)]});if(T.length>70)T.shift()}
  function drawTrail(){for(var i=T.length-1;i>=0;i--){var d=T[i];d.l-=.025;if(d.l<=0){T.splice(i,1);continue}d.x+=d.vx;d.y+=d.vy;d.rot+=.04;d.vx*=.97;d.vy*=.97;
    x.save();x.translate(d.x,d.y);x.rotate(d.rot);x.fillStyle='rgba('+d.c+','+(d.l*.85)+')';if(!light){x.shadowColor='rgba('+d.c+',.9)';x.shadowBlur=10}
    var r=d.r*(.4+d.l*.6);if(d.t==0)clover(r);else if(d.t==1)star(r);else{x.beginPath();x.arc(0,0,r,0,6.283);x.fill()}x.restore()}}
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!still){
    var cd=document.getElementById('cd'),cr=document.getElementById('cr'),mx=0,my=0,rx=0,ry=0,lx=0,ly=0,on=false,root=document.documentElement;
    addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;
      if(!on){on=true;rx=lx=mx;ry=ly=my;root.classList.add('has-cursor')}
      cd.style.transform='translate('+mx+'px,'+my+'px)';
      if(Math.hypot(mx-lx,my-ly)>16){lx=mx;ly=my;spawn(mx,my,false)}
      cr.classList.toggle('h',!!(e.target.closest&&e.target.closest('a,button')))});
    addEventListener('mousedown',function(){cr.classList.add('d')});
    addEventListener('mouseup',function(){cr.classList.remove('d')});
    addEventListener('click',function(e){for(var i=0;i<9;i++)spawn(e.clientX,e.clientY,true)});
    root.addEventListener('mouseleave',function(){on=false;root.classList.remove('has-cursor')});
    (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;cr.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop)})();
  }
  var dlg=document.getElementById('cert');
  if(dlg){var cimg=dlg.querySelector('img');
    cimg.addEventListener('error',function(){dlg.classList.add('miss')});
    cimg.addEventListener('load',function(){dlg.classList.remove('miss')});
    [].slice.call(document.querySelectorAll('[data-cert]')).forEach(function(b){
      b.addEventListener('click',function(){var u=b.dataset.cert;if(/\.pdf($|\?)/i.test(u)){window.open(u,'_blank','noopener');return}dlg.classList.remove('miss');cimg.alt=b.dataset.alt||'Certificate';cimg.src=b.dataset.cert;dlg.showModal()})});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
    dlg.querySelector('.x').addEventListener('click',function(){dlg.close()});
  }
})();