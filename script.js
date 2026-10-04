'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('#header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){header.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Menü öffnen');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';header.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.classList.contains('menu-open')){closeMenu();menuButton.focus();}});
navigation.addEventListener('keydown',event=>{if(event.key!=='Tab'||!header.classList.contains('menu-open'))return;const last=navigation.querySelector('a:last-child');if(!event.shiftKey&&document.activeElement===last){event.preventDefault();menuButton.focus();}});
menuButton.addEventListener('keydown',event=>{if(event.key==='Tab'&&event.shiftKey&&header.classList.contains('menu-open')){event.preventDefault();navigation.querySelector('a:last-child').focus();}});
const hero = document.querySelector('.hero');
new IntersectionObserver(entries=>header.classList.toggle('solid',!entries[0].isIntersecting),{rootMargin:'-80px 0px 0px 0px',threshold:0}).observe(hero);
window.addEventListener('scroll',()=>header.classList.toggle('solid',window.scrollY>40),{passive:true});
window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu();});
document.body.classList.add('js-ready');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.06});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));
const videos=[...document.querySelectorAll('video')];
const nearby=new Set();let manuallyPaused=reducedMotion.matches;
const motionButton=document.querySelector('.motion-toggle');
function syncVideos(){const paused=manuallyPaused;document.body.dataset.paused=String(paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.innerHTML=paused?'Filme abspielen <span aria-hidden="true">▷</span>':'Filme pausieren <span aria-hidden="true">Ⅱ</span>';videos.forEach(video=>{if(paused||!nearby.has(video)||document.hidden)video.pause();else video.play().catch(()=>{});});}
videos.forEach(video=>{video.muted=true;video.addEventListener('loadedmetadata',()=>{video.style.setProperty('--ratio',`${video.videoWidth}/${video.videoHeight}`);});video.addEventListener('error',()=>{video.classList.add('video-unavailable');});});
const videoObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{const video=entry.target;if(entry.isIntersecting){nearby.add(video);if(video.dataset.src){video.src=video.dataset.src;delete video.dataset.src;video.preload='metadata';video.load();}}else nearby.delete(video);});syncVideos();},{rootMargin:'150px 0px',threshold:0});
videos.forEach(video=>videoObserver.observe(video));
motionButton.addEventListener('click',()=>{manuallyPaused=!manuallyPaused;syncVideos();});
reducedMotion.addEventListener('change',()=>{manuallyPaused=reducedMotion.matches;syncVideos();});document.addEventListener('visibilitychange',syncVideos);syncVideos();
const gallery=[...document.querySelectorAll('.gallery-item')];const lightbox=document.querySelector('.lightbox');let currentPhoto=0;let previousFocus;
function showPhoto(index){currentPhoto=(index+gallery.length)%gallery.length;const item=gallery[currentPhoto];const image=document.querySelector('#lightbox-image');image.src=`Klaus-Blankenese-Website/images/${item.dataset.photo}`;image.alt=item.querySelector('img').alt;document.querySelector('#lightbox-caption').textContent=item.dataset.caption;document.querySelector('#photo-counter').textContent=`${String(currentPhoto+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}`;}
gallery.forEach((item,index)=>item.addEventListener('click',()=>{previousFocus=item;showPhoto(index);lightbox.showModal();document.body.classList.add('scroll-locked');document.querySelector('#close-lightbox').focus();}));
document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());document.querySelector('#previous-photo').addEventListener('click',()=>showPhoto(currentPhoto-1));document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(currentPhoto+1));
lightbox.addEventListener('close',()=>{document.body.classList.remove('scroll-locked');previousFocus?.focus();});
lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(currentPhoto-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(currentPhoto+1);}});
let touchStart=0;lightbox.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX;},{passive:true});lightbox.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>60)showPhoto(currentPhoto+(delta<0?1:-1));},{passive:true});
const form=document.querySelector('#anfrage-form');let inquiryText='';
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);if(!String(data.get('name')).trim()||!String(data.get('period')).trim()||!String(data.get('message')).trim()){const field=[form.elements.namedItem("name"),form.elements.namedItem("period"),form.elements.namedItem("message")].find(input=>!input.value.trim());field.setCustomValidity('Bitte füllen Sie dieses Feld aus.');field.reportValidity();field.addEventListener('input',()=>field.setCustomValidity(''),{once:true});return;}inquiryText=`Aufenthaltsanfrage · Kapitänshaus Blankenese\n\nName: ${data.get('name')}\nE-Mail: ${data.get('email')}\nGewünschter Zeitraum: ${data.get('period')}\nAnzahl der Gäste: ${data.get('guests')}\n\n${data.get('message')}\n\nDemo-Vorschau – nicht versendet.`;document.querySelector('#inquiry-preview').textContent=inquiryText;const result=document.querySelector('#inquiry-result');result.hidden=false;result.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest'});});
document.querySelector('#download-inquiry').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([inquiryText],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='Aufenthaltsanfrage-Kapitaenshaus.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
