'use client';
import {useEffect,useRef} from 'react';
export default function ConnectionField({paused,burst}:{paused:boolean;burst:number}){
 const canvas=useRef<HTMLCanvasElement>(null);const pauseRef=useRef(paused);const burstRef=useRef(burst);
 useEffect(()=>{pauseRef.current=paused;},[paused]);useEffect(()=>{burstRef.current=burst;},[burst]);
 useEffect(()=>{const el=canvas.current;if(!el)return;const ctx=el.getContext('2d');if(!ctx)return;const media=matchMedia('(prefers-reduced-motion: reduce)');let reduced=media.matches;let width=0,height=0,frame=0,angle=0,last=0,visible=true,seenBurst=burstRef.current,pulse=0;const pointer={x:0,y:0};
 const count=560;const dots=Array.from({length:count},(_,i)=>{const y=1-i/(count-1)*2;const r=Math.sqrt(1-y*y);const a=i*Math.PI*(3-Math.sqrt(5));return{x:Math.cos(a)*r,y,z:Math.sin(a)*r,seed:i};});
 const resize=()=>{const box=el.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(devicePixelRatio||1,2);el.width=width*dpr;el.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};const observer=new ResizeObserver(resize);observer.observe(el);
 const move=(e:PointerEvent)=>{const b=el.getBoundingClientRect();pointer.x=(e.clientX-b.left)/b.width-.5;pointer.y=(e.clientY-b.top)/b.height-.5;};const leave=()=>{pointer.x=0;pointer.y=0;};el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});intersection.observe(el);const preference=()=>{reduced=media.matches;};media.addEventListener('change',preference);
 function draw(now:number){frame=requestAnimationFrame(draw);if(now-last<32||!visible||document.hidden)return;const dt=Math.min(now-last,50);last=now;if(!pauseRef.current&&!reduced)angle+=dt*.000075;if(seenBurst!==burstRef.current){seenBurst=burstRef.current;pulse=1;}if(!pauseRef.current&&!reduced)pulse*=.97;else pulse=0;
 ctx!.clearRect(0,0,width,height);const radius=Math.min(width*.43,height*.43);const a=angle+(reduced||pauseRef.current?0:pointer.x*.38),tilt=-.2+(reduced||pauseRef.current?0:pointer.y*.25);const ca=Math.cos(a),sa=Math.sin(a),ct=Math.cos(tilt),st=Math.sin(tilt);
 const points=dots.map(p=>{const x=p.x*ca+p.z*sa;const z=-p.x*sa+p.z*ca;const y=p.y*ct-z*st;const zz=p.y*st+z*ct;const scale=1+zz*.16;const spread=1+pulse*.13*Math.sin(p.seed*1.3);return{x:width/2+x*radius*scale*spread,y:height/2+y*radius*scale*spread,z:zz,seed:p.seed};});
 ctx!.strokeStyle='rgba(86,99,61,.13)';ctx!.lineWidth=.65;for(let i=0;i<points.length;i+=5){const p=points[i];for(let offset=1;offset<=3;offset++){const q=points[(i+offset*21)%points.length];if(p.z<-.25||q.z<-.25)continue;const dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<radius*.30){ctx!.beginPath();ctx!.moveTo(p.x,p.y);ctx!.lineTo(q.x,q.y);ctx!.stroke();}}}
 points.sort((a,b)=>a.z-b.z).forEach(p=>{const alpha=.16+(p.z+1)*.36;ctx!.fillStyle=`rgba(64,78,43,${alpha})`;const r=1.2+(p.z+1)*.9;ctx!.beginPath();ctx!.arc(p.x,p.y,r,0,Math.PI*2);ctx!.fill();if(p.seed%83===0&&p.z>0){ctx!.strokeStyle='rgba(64,78,43,.3)';ctx!.beginPath();ctx!.arc(p.x,p.y,7+pulse*8,0,Math.PI*2);ctx!.stroke();}});
 }resize();frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();media.removeEventListener('change',preference);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);};},[]);
 return <canvas className="connection-canvas" ref={canvas} aria-hidden="true"/>;
}
