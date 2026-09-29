'use client';
import {useEffect,useRef,useState} from 'react';
import ConnectionField from './ConnectionField';
const quotes=[
 {text:'Marketing is the generous act of helping someone solve a problem',author:'Seth Godin',source:'https://seths.blog/2025/12/building-blocks-of-marketing/'},
 {text:'Creativity is like breathing—pointers may help, but we do the process ourselves.',author:'Julia Cameron',source:'https://juliacameronlive.com/faq/'},
 {text:'Creativity is a fundamental aspect of being human.',author:'Rick Rubin',source:'https://www.penguinrandomhouseretail.com/book/?isbn=9780593652886'},
 {text:'If it doesn’t sell, it isn’t creative.',author:'David Ogilvy',source:'https://www.linkedin.com/business/marketing/blog/trends-tips/what-would-david-ogilvy-do-part-6-the-sole-purpose-of-advertising-is-to-sell'}
];
export default function ClubExperience(){
 const [paused,setPaused]=useState(false);const [quote,setQuote]=useState(0);const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const motion=matchMedia('(prefers-reduced-motion: reduce)');setPaused(motion.matches);const change=()=>setPaused(motion.matches);motion.addEventListener('change',change);const nodes=document.querySelectorAll<HTMLElement>('[data-reveal]');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}),{threshold:.12});nodes.forEach(n=>observer.observe(n));let raf=0;const update=()=>{raf=0;if(!root.current)return;const progress=Math.min(1,Math.max(0,window.scrollY/window.innerHeight));root.current.style.setProperty('--journey',String(motion.matches?0:progress));const total=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--read-progress',String(total>0?scrollY/total:0));};const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};window.addEventListener('scroll',scroll,{passive:true});update();return()=>{observer.disconnect();motion.removeEventListener('change',change);window.removeEventListener('scroll',scroll);cancelAnimationFrame(raf);};},[]);

 return <div ref={root} className={`experience ${paused?'motion-paused':''}`}>
 <section className="universe" id="people" aria-labelledby="hero-title">
 <div className="hero-kicker">tech marketing club <span>est. 2026</span></div>
 <h1 id="hero-title">A home-base for the world's most <i>creative</i> tech marketers</h1>
 <p className="hero-description">Good conversation, regular meetups, real friends.</p>
 <div className="universe-stage"><ConnectionField paused={paused} burst={0}/><a className="orbit-photo orbit-object" href="#about"><img src="/kashvi.jpg" width="1536" height="1152" alt="Meet Kashvi, the founder"/><span>the story</span></a><a className="orbit-logo orbit-object" href="#join"><img src="/brand/tmc-sub-logo.svg" width="676" height="290" alt="tech marketing club — join us"/></a><a className="orbit-ticket orbit-object" href="#gatherings"><span>the next hello</span><strong>02<span> / oct</span></strong><span>11th st bar · 5–7 pm</span></a></div>
 <div className="hero-bottom"><a href="#inspiration" className="scroll-cue"><span aria-hidden="true">↓</span> a little inspiration</a><a className="pill" href="#join">find your people</a><button className="motion-toggle" onClick={()=>setPaused(x=>!x)} aria-pressed={paused}>{paused?'motion off':'motion on'} <span aria-hidden="true">{paused?'○':'◉'}</span></button></div>
 </section>
 <section className="inspiration" id="inspiration" aria-label="Quotes on creativity and marketing"><div className="section-index"><span>01 / words to work by</span></div><div aria-live="polite" aria-atomic="true"><blockquote key={quote}><p>“{quotes[quote].text}”</p><cite><a href={quotes[quote].source} target="_blank" rel="noreferrer">{quotes[quote].author} ↗</a></cite></blockquote></div><div className="quote-controls"><button aria-label="Previous quote" onClick={()=>setQuote(x=>(x+quotes.length-1)%quotes.length)}>←</button><span>{quote+1} / {quotes.length}</span><button aria-label="Next quote" onClick={()=>setQuote(x=>(x+1)%quotes.length)}>→</button></div></section>
 </div>;
}
