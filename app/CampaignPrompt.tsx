'use client';
import {useEffect,useRef,useState} from 'react';
import {nextBrief} from './campaign-briefs';
type Brief=ReturnType<typeof nextBrief>;
export default function CampaignPrompt(){
 const [brief,setBrief]=useState<Brief|null>(null);const current=useRef<Brief|null>(null);const seen=useRef<number[]>([]);
 function next(){const fresh=nextBrief(current.current,seen.current);current.current=fresh;seen.current=[...seen.current,fresh.id].slice(-100);setBrief(fresh);try{localStorage.setItem('tmc-brief-history',JSON.stringify({last:fresh,seen:seen.current}));}catch{}}
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('tmc-brief-history')||'null');if(saved&&Array.isArray(saved.seen)){seen.current=saved.seen.filter((x:unknown)=>Number.isInteger(x)).slice(-100);current.current=saved.last;}}catch{}next();},[]);
 return <section className="campaign-lab" aria-labelledby="campaign-title"><div className="campaign-heading"><div><span className="eyebrow">a little creative stretch</span><h2 id="campaign-title">What would you make?</h2></div><img src="/brand/sparkle.svg" width="48" height="48" alt=""/></div><p className="campaign-brief" aria-live="polite" aria-atomic="true">{brief?.text||'Your next creative challenge is coming up.'}</p><button className="pill" onClick={next}>Give me a new brief <span aria-hidden="true">↗</span></button></section>
}
