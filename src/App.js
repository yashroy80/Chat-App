import {useState} from 'react';
import './App.css';
import ChatBody from './components/chat-body/ChatBody';
import Login from './components/login/Login.js';

function App() {
  const [userProf,setUserProf]=useState(JSON.parse(sessionStorage.getItem('userProf')));
  return (
    <div className="App">
      {userProf?<ChatBody />:<Login userProf={userProf} setUserProf={setUserProf} />}
    </div>
  );
}

export default App;
