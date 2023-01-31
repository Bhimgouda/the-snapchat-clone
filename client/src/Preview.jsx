import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { resetCameragImage, selectCameraImage } from './slices/cameraSlice'
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { addPost } from './services/post'

function Preview({socket}) {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!cameraImage){
      navigate('/', {replace: true})
    }
  },[cameraImage, navigate])

  const closePreview = ()=>{
    dispatch(resetCameragImage())
  }

  const sendPost = async()=>{
    const post = {
      imageUrl: cameraImage,
      username: 'Bhimgouda Patil',
      read: false,
      timestamp: new Date().toUTCString(),
      // profilePic
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