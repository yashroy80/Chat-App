import React, { useState } from 'react'
import './Login.css'

export default function Login(props) {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    return (
        <div className="login-form">
            <h1>LOGIN</h1>
            <h4>Username</h4>
            <input value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" placeholder="Enter Username"></input>
            <h4>Password</h4>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Enter Password"></input>
            <button className="all-btn" id="login-btn" type="submit" onClick={(e) => {
                e.preventDefault();
                if (!userName) {
                    alert('Username cannot be empty');
                    return;
                }
                if (!password) {
                    alert('Password cannot be empty');
                    return;
                }
                //idcount check
                let idcount = 0;
                (localStorage.getItem('idcount') ? idcount = JSON.parse(localStorage.getItem('idcount')) : localStorage.setItem('idcount', "0"));
                //usersData
                let usersData = [];
                (localStorage.getItem('users') ? usersData = JSON.parse(localStorage.getItem('users')) : localStorage.setItem('users', JSON.stringify([])))
                //Adding new login
                let newLogin = {
                    image: "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
                    id: parseInt(localStorage.getItem('idcount')),
                    name: userName,
                }
                usersData = [...usersData, newLogin];
                localStorage.setItem('users', JSON.stringify(usersData));
                //setting userProf
                sessionStorage.setItem('userProf', JSON.stringify(newLogin));
                //setting initial msgs
                let msgs = JSON.parse(localStorage.getItem('msgs'));
                localStorage.getItem('msgs') ? localStorage.setItem('msgs', JSON.stringify([...msgs, { id: idcount, msgs: [] }])) : localStorage.setItem('msgs', JSON.stringify([{ id: idcount, msgs: [] }]))
                
                //incrementing idcount
                localStorage.setItem('idcount', ++idcount);
                //resetting users
                props.setUserProf(JSON.parse(sessionStorage.getItem('userProf')));
                //updating msgs
                msgs = JSON.parse(localStorage.getItem('msgs'));
                for(let i=0;i<idcount;i++){
                    msgs.map((mainuser=>{
                        if(mainuser.id!==i){
                            //mainuser.msgs.push({ id: i, msgs: [] });
                            let sign=true;//check if need to push or not
                            for(let j of mainuser.msgs){
                                if(j.id===i){
                                    sign=false;
                                    break;
                                }
                            }
                            if(sign){
                                mainuser.msgs.push({ id: i, msgs: [] });
                            }
                        }
                    }))
                }
                localStorage.setItem('msgs',JSON.stringify(msgs));
            }}>Login</button>
        </div>
    )
}
