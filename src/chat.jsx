import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      // Create a new message object for the user's input
      const userMessage = { text: inputText, sender: 'user' };

      try {
        // Make an API request to Conversational API
        const wolframAlphaConversationalKey = 'VEXPVH-7AYGV4P96E';
        const conversationalResponse = await axios.get('http://api.wolframalpha.com/v1/conversation.jsp', {
          params: {
            input: inputText,
            appid: wolframAlphaConversationalKey,
          },
        });

        // Extract the response text from response
        const responseText = conversationalResponse.data.result;

        // Check if the response is empty (bot doesn't know the answer)
        if (!responseText) {
          const fallbackMessage = "Sorry, I don't think I know that one.";
          // Create a new message object for the chatbot's response
          const chatbotMessage = { text: fallbackMessage, sender: 'chatbot' };
          // Update the state to include the fallback message
          setMessages([...messages, userMessage, chatbotMessage]);
        } else {
          // Create a new message object for the chatbot's response
          const chatbotMessage = { text: responseText, sender: 'chatbot' };
          // Update the state to include both user and chatbot messages
          setMessages([...messages, userMessage, chatbotMessage]);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      // Clear the input field after sending a message
      setInputText('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'chatbot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
