'use client';
import {useEffect,useRef} from 'react';
export default function ClubExperience(){
 const video=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  video.current?.play().catch(()=>{});
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:.1});
  document.querySelectorAll('[data-reveal]').forEach(n=>observer.observe(n));
  return()=>{observer.disconnect();};
 },[]);
 return <section className="film-hero" id="people" aria-labelledby="hero-title"><div className="hero-film"><video ref={video} poster="/video/tmc-community.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/video/tmc-community-mobile.mp4" media="(max-width: 600px)" type="video/mp4"/><source src="/video/tmc-community.mp4" type="video/mp4"/></video><div className="film-shade"/><div className="film-copy"><span className="film-kicker">tech marketing club</span><h1 id="hero-title">A home for tech's most <i>creative</i> marketers</h1><p>Good conversation, regular meetups, real friends.</p><a className="pill" href="#join">join the club</a></div></div></section>;
}
