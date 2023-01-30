import React, { useCallback, useRef, useState } from 'react'
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useDispatch} from 'react-redux'
import { setCameraImage } from './slices/cameraSlice';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
}

function WebcamCapture() {
  const webcamRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const capture = useCallback(()=>{
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc))
    navigate("/preview")
  },[webcamRef])

  return (
    <div className='webcam-capture'>
      <Webcam 
      audio={false}
      height={videoConstraints.height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={videoConstraints.width}
      videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon className='webcam-capture__btn' onClick={capture} fontSize="large" />
    </div>
  )
}

export default WebcamCapture