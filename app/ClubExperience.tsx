'use client';
import {useEffect,useRef} from 'react';
export default function ClubExperience(){
 const video=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const element=video.current;
  const play=()=>{if(element){element.muted=true;element.defaultMuted=true;element.play().catch(()=>{});}};
  const visible=()=>{if(document.visibilityState==='visible')play();};
  play();
  element?.addEventListener('canplay',play);
  document.addEventListener('visibilitychange',visible);
  document.addEventListener('touchstart',play,{passive:true});
  document.addEventListener('pointerdown',play,{passive:true});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:.1});
  document.querySelectorAll('[data-reveal]').forEach(n=>observer.observe(n));
  return()=>{observer.disconnect();element?.removeEventListener('canplay',play);document.removeEventListener('visibilitychange',visible);document.removeEventListener('touchstart',play);document.removeEventListener('pointerdown',play);};
 },[]);
 return <><link rel="preload" as="image" href="/video/tmc-community.jpg" fetchPriority="high"/><section className="film-hero" id="people" aria-labelledby="hero-title"><div className="hero-film"><video ref={video} poster="/video/tmc-community.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/video/tmc-web-mobile-v2.mp4?delivery=3" media="(max-width: 600px)" type="video/mp4"/><source src="/video/tmc-web-desktop-v2.mp4?delivery=3" type="video/mp4"/></video><div className="film-shade"/><div className="film-copy"><span className="film-kicker">tech marketing club</span><h1 id="hero-title">A home for tech's most <i>creative</i> marketers</h1><p>Good conversation, regular meetups, real friends.</p><a className="pill" href="#join">join the club</a></div></div></section></>;
}
