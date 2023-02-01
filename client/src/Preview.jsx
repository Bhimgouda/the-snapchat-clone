import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { resetCameraImage, selectCameraImage } from './slices/cameraSlice'
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { selectUser } from './slices/appSlice'

function Preview({socket}) {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(()=>{
    if(!cameraImage){
      navigate('/', {replace: true})
     }
  },[cameraImage, navigate])

  const closePreview = ()=>{
    dispatch(resetCameraImage())
  }

  const sendPost = async()=>{
    const post = {
      imageUrl: cameraImage,
      username: user.name,
      timestamp: new Date().toUTCString(),
      read: {[user._id]: false},
      profilePic: user.profilePic
    }
    socket.emit('add-post', post)
    navigate("/chats", {replace: true})
  }

  return (
    <div className='preview'>
      <CloseIcon className='preview__close' onClick={closePreview} />
      <div className="preview__toolbar-right">
          <TextFieldsIcon />
          <CreateIcon />
          <NoteIcon />
          <MusicNoteIcon />
          <AttachFileIcon />
          <CropIcon />
          <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className='preview__send-icon' />
      </div>
    </div>

  )
}

export default Preview