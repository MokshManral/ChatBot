import { useEffect, useState } from 'react';
import { ChatInput } from './Components/ChatInput';
import ChatMessages from './Components/ChatMessages';
import { chatbot } from 'supersimpledev';

import './App.css';

function App() {
const [chatMessages, setChatMessages] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('messages')) || [];
  } catch {
    localStorage.removeItem('messages');
    return [];
  }
});

  useEffect(() => {
    chatbot.addResponses({
      'yokoso': 'kira kira toki toki mochi mochi puyo puyo',
      'give me unique id': function () {
        return `sure here is your unique id: ${crypto.randomUUID()}`;
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className='app-container'>
      {chatMessages.length === 0 && (
        <p className='welcome-message'>
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default App;