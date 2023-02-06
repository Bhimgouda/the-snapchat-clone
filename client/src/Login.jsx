import React from 'react'
import { Button } from '@mui/material'
import queryString from "query-string";
import { redirect, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()

  // Here we send the user to google auth page where he completes the login then
  // google sends the user to our given callbackUrl (server-side) // then we have to
  // run some fuctions on the server to get the user info
  // then server sets JWT cookies or session and redirects to client "/" and the client sends a get request and if the user has cookies
  // then server sends user or no user is sent and then user is added to a global or local state by the client

  const query = queryString.stringify({
      client_id: "131835320590-hfo9670vchkcu1po8olfa16rk8grp294.apps.googleusercontent.com",
      redirect_uri: 'https://snapchat-clone.bhim.me/api/auth/google/callback', // changes on production before commit to http://localhost:5000/api/auth/google/callback
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
  })

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`

// window.location is just used for styling purpose
// as the link was affecting styles

  return (
    <div className='login'>
        <div className="login__container">
            <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
              <Button style={{"color": "black"}} variant='outlined' onClick={(()=>window.location.assign(googleLoginUrl))}>Sign in</Button>   
        </div>
    </div>
  )
}

export default Login