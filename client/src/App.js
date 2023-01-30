import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chats from './Chats';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';
import queryString from "query-string";
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({});

  // Here we send the user to google auth page where he completes the login then
  // google sends the user to our given callbackUrl (server-side) // then we have to
  // run some fuctions on the server to get the user info 

  const query = queryString.stringify({
      client_id: "1030463715027-p7jmac6ju1iia3fbj6a09d6hnt866ec1.apps.googleusercontent.com",
      redirect_uri: 'http://localhost:5000/api/auth/google/callback',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
  })

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`

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
