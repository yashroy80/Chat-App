import React,{useEffect, useState} from 'react'
import ChatListItem from './ChatListItem.js'
import './ChatList.css'

export default function ChatList() {
    const [users,setUsers]=useState(JSON.parse(localStorage.getItem('users')));
    const [userProf,setUserProf]=useState(JSON.parse(sessionStorage.getItem('userProf')));
    useEffect(()=>{
        const pollFunction=setInterval(()=>{
            setUsers(JSON.parse(localStorage.getItem('users')));
        },500)
        window.onbeforeunload=()=>{
            return clearInterval(pollFunction);
        }
    })
    return (
        <div className="chat-list">
            <h1>Active Users</h1>
            <div id="ItemList">
                {users.map(user=>{
                    if(user.id!==userProf.id){
                        return <ChatListItem user={user} key={user.id} />
                    }
                })}
            </div>
        </div>
    )
}
