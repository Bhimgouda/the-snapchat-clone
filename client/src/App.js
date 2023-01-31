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

function App() {
  // const [user, setUser] = useState({});
  const [socket, setSocket] = useState()
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  console.log(user);

  useEffect(()=>{
    const socketServer = io('')
    setSocket(socketServer);

    const getUser = async()=>{
      const {data} = await axios.get("/api/get-user")
      if(data){
        dispatch(login(data));
      }
    }
    getUser()

    return ()=>{
     socketServer.disconnect();            // Clean up function runs as soon as the component unmounts
    }
 },[])



  return ( 
    <div className='app'>
      <div className='app__body'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chats/view" element={<ChatView />} />
          <Route path='/chats' element={<Chats socket={socket} />} />
          <Route path='/' element={<WebcamCapture />} />
          <Route path="/preview" element={<Preview socket={socket} />} />          
        </Routes>
      </div>
    </div>
  );
}

export default App;
