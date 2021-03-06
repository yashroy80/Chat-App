import React, { useEffect, useState, useRef } from 'react'
import './ChatBox.css'
import Avatar from '../chat-list/Avatar.js'

export default function ChatBox() {
    const [clickedUser, setCLickedUser] = useState(JSON.parse(sessionStorage.getItem('clickedUser')))
    const [userProf, setUserProf] = useState(JSON.parse(sessionStorage.getItem('userProf')));
    const [inputMsg, setInputMsg] = useState();
    const [msgs, setMsgs] = useState(JSON.parse(localStorage.getItem('msgs')))
    //console.log(msgs);

    //Scrolling to bottom of messages
    const msgEnd = useRef(null);
    const msgContainer = useRef(null);

    const scrollToBottom = () => {
        msgEnd.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => { 
        scrollToBottom(); // for initial render of chat-content
        /*if (msgContainer) { // for new messages
            msgContainer.current?.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }*/
    })

    useEffect(() => {
        const pollFunction = setInterval(() => {
            setCLickedUser(JSON.parse(sessionStorage.getItem('clickedUser')));
            setMsgs(JSON.parse(localStorage.getItem('msgs')));
        }, 500);
        window.onbeforeunload = () => {
            clearInterval(pollFunction);
            return sessionStorage.removeItem('clickedUser');
        }
    })

    const enterHandler = (e) => {
        if (e.target.value !== "" && e.key === 'Enter') {
            let newmsgs = JSON.parse(localStorage.getItem('msgs'));
            newmsgs.map(mainuser => {
                if (mainuser.id === userProf.id) {
                    mainuser.msgs.map(inneruser => {
                        if (inneruser.id === clickedUser.id) {
                            inneruser.msgs.push({ id: userProf.id, msg: inputMsg });
                        }
                    })
                }
                if (mainuser.id === clickedUser.id) {
                    mainuser.msgs.map(inneruser => {
                        if (inneruser.id === userProf.id) {
                            inneruser.msgs.push({ id: userProf.id, msg: inputMsg });
                        }
                    })
                }
            })
            localStorage.setItem('msgs', JSON.stringify(newmsgs));
            setInputMsg("");
        }

    }

    const submitHandler=(e)=>{
        if (e.target.value !== "") {
            let newmsgs = JSON.parse(localStorage.getItem('msgs'));
            newmsgs.map(mainuser => {
                if (mainuser.id === userProf.id) {
                    mainuser.msgs.map(inneruser => {
                        if (inneruser.id === clickedUser.id) {
                            inneruser.msgs.push({ id: userProf.id, msg: inputMsg });
                        }
                    })
                }
                if (mainuser.id === clickedUser.id) {
                    mainuser.msgs.map(inneruser => {
                        if (inneruser.id === userProf.id) {
                            inneruser.msgs.push({ id: userProf.id, msg: inputMsg });
                        }
                    })
                }
            })
            localStorage.setItem('msgs', JSON.stringify(newmsgs));
            setInputMsg("");
        }
    }
    return (
        <div className="chat-box">
            {clickedUser ? <React.Fragment>
                <div className="chat-header">
                    <Avatar image={clickedUser.image} />{clickedUser.name}
                </div>
                <div className="chat-content" ref={msgContainer}>
                    {msgs.map(mainuser => {
                        if (mainuser.id == userProf.id) {
                            return mainuser.msgs.map(inneruser => {
                                if (inneruser.id === clickedUser.id) {
                                    return inneruser.msgs.map((item, index) => {
                                        return <div className={item.id === userProf.id ? "current" : "other"} key={index}>{item.msg}</div>
                                    })
                                }
                            })
                        }
                    })}
                    <div style={{ float: "left", clear: "both" }}//dummy div for bottom scroll
                        ref={msgEnd}>
                    </div>
                </div>
                <div className="chat-footer">
                    <input id="msg-input" value={inputMsg} onChange={(e) => { setInputMsg(e.target.value) }} onKeyPress={enterHandler} type="text" placeholder="Write message"></input>
                    <button id="send-btn" value={inputMsg} onClick={submitHandler}>Send</button>
                </div>
            </React.Fragment> : <h1 id="start-conv">Click on a Conversation to begin or Start a New one.</h1>}
        </div>
    )
}
