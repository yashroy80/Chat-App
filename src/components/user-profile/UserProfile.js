import React,{useState} from 'react'
import './UserProfile.css'

export default function UserProfile(props) {
    const [userProf,setUserProf]=useState(JSON.parse(sessionStorage.getItem('userProf')));
    const logoutHandler=()=>{
        //removing current user from localStorage 'users'
        let usersData = JSON.parse(localStorage.getItem('users'));
        usersData=usersData.filter((user)=>{
            return user.id!==userProf.id;
        })
        localStorage.setItem('users',JSON.stringify(usersData));
        //removing from msgs
        let msgs=JSON.parse(localStorage.getItem('msgs'));
        msgs=msgs.filter((mainuser)=>{
            return mainuser.id!==userProf.id;
        })
        for(let i of msgs){
            i.msgs=i.msgs.filter((inneruser)=>{
                return inneruser.id!==userProf.id
            })
        }
        localStorage.setItem('msgs',JSON.stringify(msgs));
        //clearing current session
        sessionStorage.clear();
        //resetting app by reloading
        window.location.reload();
    }
    return (
        <div className="user-profile">
            <img id="user-img" src={userProf.image} alt=""></img>
            <div className="user-details">
                <h3 className="user">User: {userProf.name}</h3>
                <h3 className="user">ID: {userProf.id}</h3>
            </div>
            <button id="logout-btn" onClick={logoutHandler}>Logout</button>
        </div>
    )
}
