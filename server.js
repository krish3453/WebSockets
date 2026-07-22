import http from 'node:http'
import{websocketServer} from 'ws'

const port=process.env.PORT ??9000

const server=http.createServer((req,res)=>{
})

const wsServer=new websocketServer({server:server})

wsServer.on('connection',(socket)=>{
    console.log('Client connected')
    websocketServer.on('message',(data)=>{
        console.log(`Received message: ${data}`)
        
    })

})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})