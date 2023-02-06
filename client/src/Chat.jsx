import { Avatar } from '@mui/material';
import React from 'react'
import StopIcon from '@mui/icons-material/Stop';
import ReacTimeago from 'react-timeago'
import { useDispatch, useSelector } from 'react-redux';
import { selectImage, selectSocket, selectUser } from './slices/appSlice';
import { useNavigate } from 'react-router-dom';


function Chat({post, socket}) {
    const {_id, username, timestamp, read, imageUrl, profilePic} = post;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const open = ()=>{
        if(!read[user && user._id]) {
            dispatch(selectImage(imageUrl))
            socket.emit('read-post', _id, user._id)
            navigate("/chats/view")
        }
    }

  return (
    <div onClick={open} className='chat'>
        <Avatar src={profilePic} />
        <div className="chat__info">
            <h4>{username && username.split(" ")[0]}</h4>
            <p>{!read[user && user._id] && "Tap to view - " || " "}<ReacTimeago date={timestamp} /></p>
        </div>

        {!read[user && user._id] && <StopIcon className='chat__read-icon'/>}
    </div>
  )
}

export default Chat