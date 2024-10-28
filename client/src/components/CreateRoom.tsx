import { useContext } from "react"
import { socketContext } from "../context/SocketContext"

const CreateRoom:React.FC = () => {
    const {socket}=useContext(socketContext)
    const initRoom=()=>{
        socket.emit('create-room')
    }
  return (
    <div>
        <button onClick={initRoom} className="p-2 bg-red-400">Start a new Meeting</button>
    </div>
  )
}

export default CreateRoom