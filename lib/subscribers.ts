import { env } from 'cloudflare:workers';
export async function addSubscriber(email:string){
if(!env.DB)throw new Error('Subscriber storage unavailable');
await env.DB.prepare('INSERT INTO subscribers (email, joined_at, consent) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING').bind(email,new Date().toISOString(),'Meetup news and club updates by email; signup v1').run();
}
