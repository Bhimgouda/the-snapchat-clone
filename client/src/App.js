import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chats from './Chats';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';
import ChatView from './ChatView';
import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './slices/appSlice';
import Login from './Login';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

function App() {
  const [socket, setSocket] = useState()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    const socketServer = io('')
    setSocket(socketServer);

    const getUser = async()=>{
      const {data} = await axios.get("/api/get-user")
      if(data){
        dispatch(login(data));
      }
      setLoading(false)
    }
    getUser()

    return ()=>{
     socketServer.disconnect();            // Clean up function runs as soon as the component unmounts
    }
 },[])

  if(loading) return (
    <div className='login'>
    <div className="login__container">
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
    </div>
  </div>
  )

  

  return ( 
    <div className='app'>
        <Routes>
          <Route path="/chats/view" element={<PrivateRoute element={<ChatView />} />} />
          <Route path='/chats' element={<PrivateRoute element={<Chats socket={socket} />} />} />
          <Route path="/preview" element={<PrivateRoute element={<Preview socket={socket} />} />} />          
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<PrivateRoute element={<WebcamCapture />} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
