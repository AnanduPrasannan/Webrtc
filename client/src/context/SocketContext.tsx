
import SocketIoClient from 'socket.io-client'

import  { createContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Peer from 'peerjs'
import { peerReducer } from '../Reducers/PeerReducer'
import { addPeerAction } from '../Actions/PeerAction'


const socket=SocketIoClient('http://localhost:8000',{
    withCredentials: false,
    transports: ["polling", "websocket"]
})

export const socketContext=createContext<null | any>(null)

interface Props{
    children:React.ReactNode
}

export const SocketProvider:React.FC<Props>=({children})=>{
    const navigate=useNavigate()

    // state variale to store userId
    const [user,setUser]=useState<Peer>()
    const [stream,setStream]=useState<MediaStream>()

    const [peers,dispatch]=useReducer(peerReducer,{})

    const fetchParticipantList=({roomId,participants}:{roomId:string,participants:string[]})=>{
        console.log('fetch room participants')
        console.log(roomId,participants)
    }


    const fetchUserFeed=async()=>{

      const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
      setStream(stream)
    }

    useEffect(()=>{

        const userId=Date.now()
        const newPeer=new Peer(userId.toString(),{
            host:'localhost',
            port:9000,
            path:'/myapp'
        })
        setUser(newPeer)

        fetchUserFeed()

        const enterRoom=({roomId}:{roomId:string})=>{

            navigate(`/room/${roomId}`)

        }
        socket.on('room-created',enterRoom)

        socket.on('get-users',fetchParticipantList)

    },[])


    useEffect(()=>{

        if(!user || !stream) return

        socket.on('user-joined',({peerId})=>{
           const call= user.call(peerId,stream)
           console.log('hello peerid',peerId)
           call.on('stream',()=>{

            dispatch(addPeerAction(peerId,stream))
           })
        })

        user.on('call',(call)=>{
            console.log('receiving a call')
            call.answer(stream)
            call.on('stream',()=>{
                dispatch(addPeerAction(call.peer,stream))

            })
        })

        socket.emit('ready')

    },[user,stream])
    return(
        <socketContext.Provider value={{socket, user,stream,peers}}>
        {children}
        </socketContext.Provider>
    )
}