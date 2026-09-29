'use client';
import {useEffect,useRef,useState} from 'react';
export default function ClubExperience(){
 const video=useRef<HTMLVideoElement>(null);
 const [paused,setPaused]=useState(true);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{if(media.matches){video.current?.pause();setPaused(true);}else{video.current?.play().catch(()=>setPaused(true));}};
  sync();media.addEventListener('change',sync);
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:.1});
  document.querySelectorAll('[data-reveal]').forEach(n=>observer.observe(n));
  return()=>{media.removeEventListener('change',sync);observer.disconnect();};
 },[]);
 function toggle(){if(!video.current)return;if(video.current.paused)video.current.play().catch(()=>setPaused(true));else video.current.pause();}
 return <section className="film-hero" id="people" aria-labelledby="hero-title"><div className="hero-film"><video ref={video} poster="/video/tmc-originals.jpg" muted loop playsInline preload="metadata" onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} aria-hidden="true"><source src="/video/tmc-originals-mobile.mp4" media="(max-width: 600px)" type="video/mp4"/><source src="/video/tmc-originals.mp4" type="video/mp4"/></video><div className="film-shade"/><div className="film-copy"><span className="film-kicker">tech marketing club</span><h1 id="hero-title">A home for tech's most <i>creative</i> marketers</h1><p>Good conversation, regular meetups, real friends.</p><a className="pill" href="#join">join the club</a></div><button className="film-pause" onClick={toggle} aria-label={paused?'Play background video':'Pause background video'}>{paused?'▶ play':'Ⅱ pause'}</button></div></section>;
}
