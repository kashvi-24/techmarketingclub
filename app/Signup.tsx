'use client';
import {useState,type FormEvent} from 'react';
export default function Signup(){
 const [status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle');
 const [error,setError]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));setStatus('loading');try{const response=await fetch('/api/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!response.ok){const body=await response.json();throw new Error(body.error||'Please try again.');}setStatus('success');}catch(err){setError(err instanceof Error?err.message:'Please try again.');setStatus('error');}}
 return <div className="signup-wrap member-signup">{status==='success'?<div className="success" role="status"><strong>you're on the list.</strong><p>glad you're here. we'll email you when there's something to share.</p></div>:<form onSubmit={submit}><div className="member-fields">
 <label htmlFor="full-name">First + last name<input id="full-name" name="fullName" autoComplete="name" required maxLength={120}/></label>
 <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" required maxLength={254}/></label>
 <label htmlFor="workplace">Where do you work?<input id="workplace" name="workplace" autoComplete="organization" placeholder="Company, freelance, between things…" required maxLength={160}/></label>
 <label htmlFor="role">What do you do?<input id="role" name="role" placeholder="Social, brand, growth, founder…" required maxLength={160}/></label>
 <label className="field-wide" htmlFor="location">Where are you based?<input id="location" name="location" autoComplete="address-level2" placeholder="City + country" required maxLength={160}/></label>
 <label className="field-wide" htmlFor="strength">What are you unusually good at? <span className="field-optional">(optional)</span><span className="field-hint" id="strength-hint">internet culture, founder comms, making technical things make sense, throwing dinners, memes, paid growth, whatever.</span><textarea id="strength" name="strength" rows={3} maxLength={600} aria-describedby="strength-hint"/></label>
 </div><div className="honeypot" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div><button className="button" disabled={status==='loading'}>{status==='loading'?'joining…':'join the club'}</button><p className="consent">by joining, you agree to receive tech marketing news and club updates by email. we'll use your details to help connect the community and plan local meetups.</p>{status==='error'&&<p role="alert" className="error">{error}</p>}</form>}</div>;
}
