'use client';
import {useEffect,useState} from 'react';
export default function ThemeToggle(){
 const [dark,setDark]=useState(false);
 useEffect(()=>{const query=matchMedia('(prefers-color-scheme: dark)');let saved:string|null=null;try{saved=localStorage.getItem('tmc-theme');}catch{}const apply=(value:boolean)=>{setDark(value);document.documentElement.dataset.theme=value?'dark':'light';};apply(saved?saved==='dark':query.matches);const change=()=>{try{if(localStorage.getItem('tmc-theme'))return;}catch{}apply(query.matches);};query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);
 function toggle(){const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('tmc-theme',next?'dark':'light');}catch{}}
 return <button className="theme-toggle" onClick={toggle} aria-label={dark?'Switch to light mode':'Switch to dark mode'} title={dark?'Light mode':'Dark mode'}><span aria-hidden="true">{dark?'☀':'☾'}</span></button>;
}
