const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpeg':'image/jpeg','.jpg':'image/jpeg','.mp4':'video/mp4','.mov':'video/quicktime','.json':'application/json'};
http.createServer((req,res)=>{
  let file; try { file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0])); } catch {res.writeHead(400).end();return;}
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.stat(file,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404).end('Not found');return;}
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
    const range=req.headers.range;
    if(range){const match=/bytes=(\d+)-(\d*)/.exec(range);if(!match){res.writeHead(416).end();return;}const start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):stat.size-1,stat.size-1);if(start>end){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return;}res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${stat.size}`});fs.createReadStream(file,{start,end}).pipe(res);}
    else {res.writeHead(200,{...headers,'Content-Length':stat.size});fs.createReadStream(file).pipe(res);}
  });
}).listen(4173,'127.0.0.1',()=>console.log('Website: http://127.0.0.1:4173'));
