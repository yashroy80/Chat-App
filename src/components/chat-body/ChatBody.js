import React from 'react'
import ChatBox from '../chat-box/ChatBox'
import ChatList from '../chat-list/ChatList'
import UserProfile from '../user-profile/UserProfile'
import './ChatBody.css'

export default function ChatBody(props) {
    return (
        <div className="chat-body">
            <ChatList />
            <ChatBox />
            <UserProfile />
        </div>
    )
}