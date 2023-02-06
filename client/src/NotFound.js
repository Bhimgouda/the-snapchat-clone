import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="app">
        <h2>404! Page not found</h2>
        <button style={{"marginTop": "20px"}}>
        <Link to="/">Go Back to chats</Link>
        </button>
    </div>
  )
}

export default NotFound