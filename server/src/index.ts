import express from 'express'
import { Server } from "socket.io";
import http from 'http'
import cors from 'cors'
import roomHandler from './handler/roomHandler';

const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:'*',
        methods: ["GET", "POST"]
    }
})
app.use(cors())

io.on('connection',(socket)=>{
    console.log('new user connected')
    roomHandler(socket)

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

})


server.listen(8000,()=>{
    console.log("running")
})