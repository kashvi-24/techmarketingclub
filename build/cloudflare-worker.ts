import handler from 'vinext/server/fetch-handler';
import {videoResponse} from './video-response';
export default {
 async fetch(request:Request,env:any,ctx:any){
  if(new URL(request.url).pathname.startsWith('/video/')&&new URL(request.url).pathname.endsWith('.mp4')&&['GET','HEAD'].includes(request.method))return videoResponse(request,env.ASSETS);
  return handler.fetch(request,env,ctx);
 }
};
