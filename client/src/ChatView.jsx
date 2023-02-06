import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { selectSelectedImage } from './slices/appSlice'
import {CountdownCircleTimer} from "react-countdown-circle-timer"

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!selectedImage){
            exit()
        }
    },[selectedImage])

    const exit = ()=>{
      navigate("/chats", {replace:true}) 
    }

  return (
    <div className='chat-view'>
        <img onClick={exit} src={selectedImage.replace("/upload/", `/upload/w_${document.body.clientWidth > 425 ? 250 : document.body.clientWidth}/`)} alt="" />
        <div className='chat-view__timer'>
        <CountdownCircleTimer
        isPlaying
        duration={10}
        strokeWidth={6}
        size={50}
        color={"#004777"}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        >
        {({ remainingTime }) =>{
          if(remainingTime === 0) return <Navigate to="/chats" replace />;
          return remainingTime
        }}
        </CountdownCircleTimer>
        </div>
    </div>
  )
}

export default ChatView