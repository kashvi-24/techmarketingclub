import { addSubscriber } from '@/lib/subscribers';
export async function POST(request:Request){
const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Invalid origin'},{status:403});
if(Number(request.headers.get('content-length')||0)>2048)return Response.json({error:'Request too large'},{status:413});
let payload;try{payload=await request.json();}catch{return Response.json({error:'Invalid request'},{status:400});}
if(!payload||typeof payload!=='object')return Response.json({error:'Invalid request'},{status:400});
if(payload.website)return Response.json({ok:true});
const email=typeof payload.email==='string'?payload.email.trim().toLowerCase():'';
if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return Response.json({error:'Please enter a valid email address'},{status:400});
try{await addSubscriber(email);return Response.json({ok:true},{status:201});}catch(error){console.error('Signup storage unavailable',error instanceof Error?error.name:'Unknown');return Response.json({error:'Please try again shortly'},{status:503});}
}
