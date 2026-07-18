import { useState, useRef, useEffect } from 'react';
import { Chatbot} from 'supersimpledev';
import './App.css'

function ChatInput({ chatMessage, setChatMessage }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessage,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];
    setChatMessage(newChatMessages);
    setInputText('')

    setChatMessage([
      ...newChatMessages,
      {
        message: <img src="loading-spinner.gif" style={{ height: '40px', margin: '-15px' }} />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessage([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  function pressEnter(event) {
    if (event.key === 'Enter')
      sendMessage();
    if (event.key === 'Escape')
      setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a merssage to ChatBot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={pressEnter}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}

function ChatMessage({ message, sender }) {

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src="robot.png" width="50" className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src="user.png" width="50" className="chat-message-profile" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessage }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessage]);
  return (
    <div className="chat-messages-container"
      ref={chatMessagesRef}>
      {
        chatMessage.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          );
        })
      }
    </div>
  );

}

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
