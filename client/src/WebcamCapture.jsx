import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useDispatch} from 'react-redux'
import { setCameraImage } from './slices/cameraSlice';
import { useNavigate } from 'react-router-dom';


function WebcamCapture() {
  const webcamRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bodyWidth, setBodyWidth] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  
  useEffect(() => {
    if(document.body.clientWidth > 425){
      setBodyWidth(250)
      setBodyHeight(400)
    }
    else{
      setBodyWidth(document.body.clientWidth)
      setBodyHeight(document.body.clientHeight - 5);
    }
    window.addEventListener('resize', () => {
      if(document.body.clientWidth > 425){
        setBodyWidth(250)
        setBodyHeight(400)
      }
      else{
        setBodyWidth(document.body.clientWidth)
        setBodyHeight(document.body.clientHeight);
      }
    });
  }, []);

  const videoConstraints = {
    width:  bodyWidth,
    height: bodyHeight,
    facingMode: "user"
  }
  
  const capture = useCallback(()=>{
    const width = document.body.clientWidth > 425 ? 250 : document.body.clientWidth
    const height = document.body.clientWidth > 425 ? 400 : document.body.clientHeight-5

    const imageSrc = webcamRef.current.getScreenshot({width, height});
    dispatch(setCameraImage(imageSrc))
    navigate("/preview");
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