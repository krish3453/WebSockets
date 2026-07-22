import http from 'node:http'
import { WebSocketServer } from "ws";
import fs from "fs/promises";
import path from 'path'
const port=process.env.PORT ??9000

const server=http.createServer(async function(req,res){
    const filepath=await fs.readFile(path.resolve('./index.html'), 'utf8')
    res.setHeader('Content-Type','text/html')
    return res.end(filepath)
})

const wsServer=new WebSocketServer({server:server})

wsServer.on('connection',(socket)=>{
    console.log('Client connected')
    socket.on('message',(data)=>{
        console.log(`Received message: ${data}`,data.toString())
        wsServer.clients.forEach(client=>{
            client.send(data.toString())
        })
    })

})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})