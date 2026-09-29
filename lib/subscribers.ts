import {env} from 'cloudflare:workers';
export async function addSubscriber(member:{email:string;fullName:string;workplace:string;role:string;location:string;strength:string}){
 if(!env.DB)throw new Error('Subscriber storage unavailable');
 await env.DB.prepare('INSERT INTO subscribers (email, joined_at, consent, full_name, workplace, role, location, strength) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO NOTHING').bind(member.email,new Date().toISOString(),'Tech marketing news and club updates by email; community connections and local meetup planning; signup v2',member.fullName,member.workplace,member.role,member.location,member.strength||null).run();
}
