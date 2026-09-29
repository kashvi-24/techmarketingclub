import {addSubscriber} from '@/lib/subscribers';
import {validateMember} from '@/lib/member-validation';
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Invalid origin'},{status:403});
 if(Number(request.headers.get('content-length')||0)>8192)return Response.json({error:'Request too large'},{status:413});
 let payload;try{const raw=await request.text();if(new TextEncoder().encode(raw).length>8192)return Response.json({error:'Request too large'},{status:413});payload=JSON.parse(raw);}catch{return Response.json({error:'Invalid request'},{status:400});}
 if(!payload||typeof payload!=='object'||Array.isArray(payload))return Response.json({error:'Invalid request'},{status:400});
 if(payload.website)return Response.json({ok:true});
 const result=validateMember(payload);if(result.error||!result.value)return Response.json({error:result.error},{status:400});
 try{await addSubscriber(result.value);return Response.json({ok:true},{status:201});}catch(error){console.error('Signup storage unavailable',error instanceof Error?error.name:'Unknown');return Response.json({error:"Couldn't save your details just now. Please try again."},{status:503});}
}
