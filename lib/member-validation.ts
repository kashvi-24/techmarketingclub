export function validateMember(payload:Record<string,unknown>){
 const fields=[['fullName',120,'Please enter your first and last name.'],['email',254,'Please enter a valid email address.'],['workplace',160,'Tell us where you work.'],['role',160,'Tell us what you do.'],['location',160,'Tell us where you are based.']] as const;
 const value:Record<string,string>={};
 for(const [key,max,error] of fields){const text=typeof payload[key]==='string'?payload[key].trim():'';if(!text||text.length>max)return {error};value[key]=text;}
 value.email=value.email.toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))return {error:'Please enter a valid email address.'};
 if(payload.strength!==undefined&&typeof payload.strength!=='string')return {error:'Please enter a short answer for your strengths.'};
 value.strength=typeof payload.strength==='string'?payload.strength.trim():'';if(value.strength.length>600)return {error:'Keep your strengths answer under 600 characters.'};
 return {value:value as {fullName:string;email:string;workplace:string;role:string;location:string;strength:string}};
}
