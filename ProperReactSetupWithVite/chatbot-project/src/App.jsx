import { useState } from 'react';

import { ChatInput } from './components/ChatInput';
//import { ChatMessages } from './components/ChatMessages';
import ChatMessages from './components/ChatMessages'

import './App.css'

function App() {
  const [chatMessage, setChatMessage] = useState([]);

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
