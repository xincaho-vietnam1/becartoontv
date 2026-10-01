import React,{useCallback,useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import './ben-welcome.css';

export default function BenWelcome({onComplete}){
 const layer=useRef(null),finished=useRef(false);
 const [wink,setWink]=useState(false),[ready,setReady]=useState(false);
 const [vi]=useState(()=>{try{return localStorage.getItem('becartoon-language')==='vi'}catch{return false}});
 const finish=useCallback(()=>{if(finished.current)return;finished.current=true;onComplete()},[onComplete]);
 // A welcome animation, not a loading gate: even missing assets cannot block entry.
 useEffect(()=>{const fallback=setTimeout(finish,10000);return()=>clearTimeout(fallback)},[finish]);
 useGSAP(()=>{
  if(!ready)return;
  const website=document.querySelector('.website-entry-content');
  const radius=Math.hypot(window.innerWidth,window.innerHeight)/2+24;
  const timeline=gsap.timeline({onComplete:finish});
  timeline.from('.ben-welcome-head',{scale:.65,y:30,rotation:-9,opacity:0,duration:.65,ease:'back.out(1.8)'})
   .from('.ben-welcome-greeting',{y:15,opacity:0,duration:.4},'-=.2')
   .to('.ben-welcome-head',{rotation:-13,x:-8,duration:.2,ease:'sine.inOut'},.95)
   .to('.ben-welcome-head',{rotation:13,x:8,duration:.22,repeat:2,yoyo:true,ease:'sine.inOut'},1.15)
   .to('.ben-welcome-head',{rotation:0,x:0,duration:.2},1.82)
   .call(()=>setWink(true),[],2.2)
   .call(()=>setWink(false),[],2.75)
   .to('.ben-welcome-head',{scale:.6,opacity:0,duration:.55,ease:'back.in(1.2)'},3)
   .to('.ben-welcome-greeting',{opacity:0,y:15,duration:.4},3)
   .to('.ben-welcome-sun',{scale:.45,opacity:0,duration:.5},3)
   .to(layer.current,{opacity:0,duration:.3},3.45)
   .fromTo(website,{clipPath:'circle(0px at 50vw 50vh)'},{clipPath:`circle(${radius}px at 50vw 50vh)`,duration:1.85,ease:'sine.inOut'},3.45);

 },{scope:layer,dependencies:[ready],revertOnUpdate:true});
 return <div ref={layer} className="ben-welcome" role="status" aria-live="polite" aria-label={vi?'Ben chào bạn':'Ben says hello'}><div className="ben-welcome-content"><div className="ben-welcome-sun" aria-hidden="true"/><div className={`ben-welcome-head ${wink?'is-winking':''}`} aria-hidden="true"><img src={`${import.meta.env.BASE_URL}art/ben-welcome-sprite.png`} alt="" onLoad={()=>setReady(true)} onError={finish} fetchPriority="high"/></div><div className="ben-welcome-greeting"><h2>{vi?'Xin chào!':'Hello, friend!'}</h2><p>BeCartoonTV</p></div></div></div>
}
