import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { socketContext } from "../context/SocketContext"
import UserFeedPlayer from "../components/UserFeedPlayer"

const Room = () => {
    const {id}=useParams()
    const {socket,user,stream,peers}=useContext(socketContext)

   

    useEffect(()=>{

       if(user){
        console.log('new user',user._id, 'has joined room', id)
       socket.emit('joined-room',{roomId:id,peerId:user._id})
      
      }


    },[id,user,socket])
  return (
    <div>
        Room {id}
        Your own userfeed
        <UserFeedPlayer stream={stream}/>

        <div>
          Other user feed
        {Object.keys(peers).map((peerId)=>(
          <>
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream}/>
          </>
        ))}
        </div>
    </div>
  )
}

export default Room



