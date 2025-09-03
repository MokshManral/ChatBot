import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {

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

    setInputText('');

    const newChatMessages = [
      ...chatMessages, {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ]
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className='loading-spinner' src={LoadingSpinnerImage} />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages, {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ]);
    setIsLoading(false);
  }

  function keyPress(event) {
    event.key === 'Enter' && sendMessage();
    event.key === 'Escape' && setInputText('');
  }

  function clearLocalStorage(){
    setChatMessages([])
  }

  return (
    <div className='chat-input-container'>
      <input
        placeholder="Send a Message To ChatBot"
        size="30"
        onChange={saveInputText}
        onKeyDown={keyPress}
        value={inputText}
        className='input-box'
      />
      <button
        onClick={sendMessage}
        className='send-button'
      >Send</button>
      <button onClick={clearLocalStorage} className='clear-button'>Clear</button>
    </div>
  );
}