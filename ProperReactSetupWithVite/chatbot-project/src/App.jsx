import { useState, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';

import { ChatInput } from './components/ChatInput';
//import { ChatMessages } from './components/ChatMessages';
import ChatMessages from './components/ChatMessages'

import './App.css'

function App() {
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(()=>{
    Chatbot.addResponses({
      'goodbye' : 'Goodbye. Have a great day!',
      'shhh': 'im doi nguoi anh thuonggg',
      'give me a random ID' : function () { return `Sure! Here: ${crypto.randomUUID()}`;}
    });
  },[]);

  return (
    <div className="app-container">
      {chatMessage.length === 0 && <p className="j">Welcome to the chatbot project! Send a message using the textbox below.</p>}
      <ChatMessages
        chatMessage={chatMessage}
      />
      <ChatInput
        chatMessage={chatMessage}
        setChatMessage={setChatMessage}
      />
    </div>
  );
}

export default App
