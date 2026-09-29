'use client';
import { useEffect, useRef, useState } from 'react';

type Tile = { id:number; word:string; good:boolean } | null;
type Phase = 'ready'|'playing'|'paused'|'done';
const jargon=['synergy','circle back','disrupt','leverage','10x','ideate','move the needle','thought leader','low-hanging fruit'];
const ideas=['good idea','honest feedback','a real person'];
let nextId=0;
function newBoard():Tile[]{
 const safe=new Set<number>();while(safe.size<2)safe.add(Math.floor(Math.random()*6));
 return Array.from({length:6},(_,i)=>{const good=safe.has(i);const words=good?ideas:jargon;return {id:++nextId,word:words[Math.floor(Math.random()*words.length)],good};});
}
export default function BuzzwordGame(){
 const [open,setOpen]=useState(false);const [phase,setPhase]=useState<Phase>('ready');
 const [board,setBoard]=useState<Tile[]>(Array(6).fill(null));const tiles=useRef<Tile[]>(Array(6).fill(null));
 const [score,setScore]=useState(0);const points=useRef(0);const [best,setBest]=useState<number|null>(null);
 const [remaining,setRemaining]=useState(20);const timeLeft=useRef(20000);const deadline=useRef(0);
 const [feedback,setFeedback]=useState('');const arena=useRef<HTMLDivElement>(null);const active=useRef(false);
 const replace=()=>{tiles.current=newBoard();setBoard(tiles.current);};
 function finish(){active.current=false;timeLeft.current=0;setRemaining(0);setPhase('done');setBest(previous=>Math.max(previous??0,points.current));setFeedback('time! your inbox is marginally less annoying.');}
 function play(){points.current=0;setScore(0);timeLeft.current=20000;setRemaining(20);deadline.current=performance.now()+20000;active.current=true;replace();setFeedback('bonk the jargon. leave the good stuff.');setPhase('playing');arena.current?.focus();}
 function pause(){if(!active.current)return;timeLeft.current=Math.max(0,deadline.current-performance.now());active.current=false;setRemaining(Math.ceil(timeLeft.current/1000));setPhase('paused');setFeedback('take your time. the jargon can wait.');}
 function resume(){deadline.current=performance.now()+timeLeft.current;active.current=true;setPhase('playing');setFeedback('back to bonking.');arena.current?.focus();}
 function hit(index:number){if(!active.current)return;if(performance.now()>=deadline.current){finish();return;}const tile=tiles.current[index];if(!tile)return;tiles.current=tiles.current.map((item,i)=>i===index?null:item);setBoard(tiles.current);points.current=Math.max(0,points.current+(tile.good?-3:2));setScore(points.current);setFeedback(tile.good?'hey, we needed that. −3':`${tile.word}? bonked. +2`);}
 useEffect(()=>{if(phase!=='playing')return;const tick=setInterval(()=>{const ms=deadline.current-performance.now();if(ms<=0)finish();else setRemaining(Math.ceil(ms/1000));},100);const spawn=setInterval(()=>{if(active.current&&performance.now()<deadline.current)replace();},1700);const visibility=()=>{if(document.hidden)pause();};document.addEventListener('visibilitychange',visibility);return()=>{clearInterval(tick);clearInterval(spawn);document.removeEventListener('visibilitychange',visibility);};},[phase]);
 function toggle(){if(open){active.current=false;setPhase('ready');setFeedback('');}setOpen(!open);}
 return <section className="game-secret" id="play"><button className="game-trigger" aria-expanded={open} aria-controls="buzzword-game" onClick={toggle}><span aria-hidden="true">✳</span> this meeting could've been a game <span aria-hidden="true">{open?'−':'+'}</span></button>
 {open&&<div id="buzzword-game" className="game-card"><div className="game-top"><span>tmc break room / 001</span><button onClick={toggle} className="game-close" aria-label="Close game">close ×</button></div><div className="game-heading"><h2>buzzword<br/><i>bonk.</i></h2><p>tap the jargon. spare the good ideas.<br/>20 seconds. absolutely no KPIs.</p></div>
 <div className="game-stats"><span>score <b>{score}</b></span><span>time <b>{remaining}s</b></span><span>session best <b>{best??'—'}</b></span></div>
 <div className="game-arena" ref={arena} tabIndex={0} role="group" aria-label="Buzzword board. Press keys 1 through 6 to hit matching tiles." onKeyDown={event=>{if(event.repeat)return;if(/^[1-6]$/.test(event.key)){event.preventDefault();hit(Number(event.key)-1);}}}>
 {board.map((tile,i)=><button key={i} className={`game-tile ${tile?'occupied':''} ${tile?.good?'good':'jargon'}`} disabled={phase!=='playing'||!tile} onClick={()=>hit(i)} aria-label={tile?`${i+1}: ${tile.word}, ${tile.good?'spare this, minus 3 points':'bonk this, plus 2 points'}`:`${i+1}: empty`}><span className="tile-number">{i+1}</span><span className="tile-word">{phase==='playing'||phase==='paused'?tile?.word??'·':'✳'}</span>{tile&&phase==='playing'&&<span className="tile-kind">{tile.good?'keep':'bonk'}</span>}</button>)}
 </div>
 <p className="game-feedback" role="status">{feedback||'jargon +2 / good ideas −3'}</p>
 <div className="game-controls">{phase==='ready'&&<button className="button" onClick={play}>i have 20 seconds</button>}{phase==='playing'&&<button className="button" onClick={pause}>pause</button>}{phase==='paused'&&<button className="button" onClick={resume}>back to it</button>}{phase==='done'&&<><p className="game-result">{score>=50?'dangerously good at avoiding work.':score>=25?'you’ve saved at least one meeting.':'let’s circle back. kidding.'}</p><button className="button" onClick={play}>one more round</button></>}</div>
 <p className="game-help">tap a tile or focus the board and use keys 1–6.</p></div>}
 </section>;
}
