import { useState } from 'react';
import { Chatbot } from 'supersimpledev';

import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessage, setChatMessage }) {
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
        message: <img src={LoadingSpinnerImage} style={{ height: '40px', margin: '-15px' }} />,
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