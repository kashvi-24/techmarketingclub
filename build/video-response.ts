/** Serve byte ranges explicitly; the static asset service may ignore Range. */
export async function videoResponse(request: Request, assets: {fetch(request: Request): Promise<Response>}) {
 const headers=new Headers(request.headers);
 headers.delete('range');headers.delete('if-range');
 const response=await assets.fetch(new Request(request,{headers}));
 if(response.status!==200)return response;
 const resultHeaders=new Headers(response.headers);
 resultHeaders.set('Accept-Ranges','bytes');
 const range=request.headers.get('range');
 const ifRange=request.headers.get('if-range');
 if(!range||request.method==='HEAD'||(ifRange&&ifRange!==response.headers.get('etag')&&ifRange!==response.headers.get('last-modified'))){return new Response(response.body,{status:response.status,headers:resultHeaders});}
 const match=/^bytes=(\d*)-(\d*)$/.exec(range);
 if(!match||(!match[1]&&!match[2]))return new Response(response.body,{status:200,headers:resultHeaders});
 const body=await response.arrayBuffer();const size=body.byteLength;
 const start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
 const end=match[1]?(match[2]?Math.min(Number(match[2]),size-1):size-1):size-1;
 if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>=size||end<start){return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`,'Accept-Ranges':'bytes'}});}
 resultHeaders.set('Content-Range',`bytes ${start}-${end}/${size}`);resultHeaders.set('Content-Length',String(end-start+1));resultHeaders.delete('Content-Encoding');
 return new Response(body.slice(start,end+1),{status:206,headers:resultHeaders});
}
