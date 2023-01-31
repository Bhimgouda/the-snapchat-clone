import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chats from './Chats';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';
import queryString from "query-string";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  // const [user, setUser] = useState({});

  // console.log(user);

  // // Here we send the user to google auth page where he completes the login then
  // // google sends the user to our given callbackUrl (server-side) // then we have to
  // // run some fuctions on the server to get the user info
  // // then server sets JWT cookies or session and redirects to client "/" and the client sends a get request and if the user has cookies
  // // then server sends user or no user is sent and then user is added to a global or local state by the client

  // const query = queryString.stringify({
  //     client_id: "131835320590-hfo9670vchkcu1po8olfa16rk8grp294.apps.googleusercontent.com",
  //     redirect_uri: 'http://localhost:5000/api/auth/google/callback',
  //     scope: [
  //       'https://www.googleapis.com/auth/userinfo.email',
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //     ].join(' '), // space seperated string
  //     response_type: 'code',
  //     access_type: 'offline',
  //     prompt: 'consent',
  // })

  // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`

  // useEffect(()=>{
  //   const getUser = async()=>{
  //     const {data} = await axios.get("/api/get-user")
  //     if(data){
  //       setUser(data)
  //     }
  //   }
  //   getUser()
  // },[])

  return ( 
    <div className='app'>
      <a href={googleLoginUrl}>Google Login</a>
      <div className='app__body'>
        <Routes>
          <Route path='/chats' element={<Chats />} />
          <Route path='/' element={<WebcamCapture />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
