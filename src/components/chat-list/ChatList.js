import React, { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem.js'
import './ChatList.css'

export default function ChatList() {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')));
    const [userProf, setUserProf] = useState(JSON.parse(sessionStorage.getItem('userProf')));
    useEffect(() => {
        const pollFunction = setInterval(() => {
            setUsers(JSON.parse(localStorage.getItem('users')));
        }, 500)
        window.onbeforeunload = () => {
            return clearInterval(pollFunction);
        }
    })
    return (
        <div className="chat-list">
            {/*<button className="all-btn" onClick={()=>{
                //window.open(window.location.href, '_blank');// for copy of previously opened window
                window.open(window.location.origin, '_blank');
                sessionStorage.clear();
                window.location.reload();
            }}>Create Conversation</button>*/}
            <h1>Active Users</h1>
            <div id="ItemList">
                {users.length > 1 ? users.map(user => {
                    if (user.id !== userProf.id) {
                        return <ChatListItem user={user} key={user.id} />
                    }
                }) : "Open new tabs to create new users!"}
            </div>
        </div>
    )
}
