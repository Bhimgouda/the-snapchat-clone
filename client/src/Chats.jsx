import React from 'react'
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useState } from 'react';
import { useEffect } from 'react';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './slices/appSlice';
import http from './services/httpService';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './slices/cameraSlice';



function Chats({socket}) {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Here we get only all posts and is not dependent on posts    
    useEffect(()=>{
        if(!socket) return

        socket.emit('get-posts')
        
        socket.on('send-posts', (allPosts)=>{
            setPosts([...allPosts])
        })
        
        return ()=>{
            socket.off('send-posts')
        }
    },[socket]);

    // Here we get only 1 updated post from socket event and have to update the posts state, hence dependent on posts and socket    
    useEffect(()=>{
        if(!socket) return

        socket.on("update-posts", (newPost)=>{
            const updatedPosts = [newPost, ...posts];
            setPosts(updatedPosts)
        })

        return ()=>{
            socket.off('update-posts')
        }        
    }, [socket, posts])

    const signOut = async()=>{
        dispatch(logout())
        await http.get('/api/logout')
        navigate("/login", {replace: true});
    }

    const takeSnap = ()=>{
        dispatch(resetCameraImage)
        navigate("/")
    }

    return (
    <div className='chats'>
        <div className="chats__header">
            <Avatar src={user && user.profilePic} onClick={signOut} className="chats__avatar" />
            <div className='chats__search'>
                <SearchIcon className='chats__search-icon' />
                <input placeholder='Friends' type="text" />
            </div>
            <ChatBubbleIcon className='chats__chat-icon' /> 
        </div>

        <div className="chats__posts">
            {posts.map(post=><Chat key={post._id} socket={socket} post={post}/>)}
        </div>  
        <RadioButtonUncheckedIcon className='chats__take-pic-icon' onClick={takeSnap} fontSize="large" />
    </div>
  )
}

export default Chats