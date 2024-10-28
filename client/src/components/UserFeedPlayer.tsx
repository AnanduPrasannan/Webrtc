import { useEffect, useRef } from "react"

const UserFeedPlayer:React.FC<{stream?:MediaStream}>=({stream})=> {

    const videoRef=useRef<HTMLVideoElement>(null)

    useEffect(()=>{

            if(videoRef.current && stream){
                videoRef.current.srcObject=stream
            }
    },[stream])
  return (
    <div>
        <video src="" ref={videoRef} muted={true} style={{width:'300px', height:'300px'}} autoPlay></video>
    </div>
  )
}

export default UserFeedPlayer