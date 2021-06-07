import React from 'react'
import Avatar from './Avatar.js'

let lastActive = null;
export default function ChatListItem(props) {
    const selectChat = (e) => {
        if (lastActive == null) {
            lastActive = e.target;
        }
        lastActive.classList.remove('active');
        e.target.classList.add('active');
        lastActive = e.target;
        sessionStorage.setItem('clickedUser',JSON.stringify(props.user));
    }
    return (
        <div className="ListItem" onClick={selectChat}>
            <Avatar image={props.user.image} />
            {props.user.name}
        </div>
    )
}
