import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './chatroom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const chatMessagesDiv = document.getElementById('chat-messages');
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Scroll to bottom on new message
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const updatedMessages = [...messages, { sender: 'user', text: inputMessage }];
  
      setMessages(updatedMessages);
      const token = sessionStorage.getItem('token');
      console.log("token in chat is >>>",token)
      setIsLoading(true); // Start loading
  
      try {
        const response = await fetch('http://localhost:4001/api/chat/switchableAI', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            data: inputMessage,  // Current input message
            conversationHistory: updatedMessages // Entire message history
          }),
        });
  
        const data = await response.json();
        console.log("the response >>>>", response.status);
  
        if (response.ok) {
          const botResponse = data.engine_gemeni || data.engine_openAI || 'No response available';
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: botResponse }
          ]);
        } else if (response.status === 403) {
          alert('Session expired, please log in again');
          sessionStorage.removeItem('token');
          navigate('/');
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Error: Unable to get a response from the server.' }
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Error: Failed to communicate with the server.' }
        ]);
      } finally {
        setIsLoading(false); // Stop loading
      }
  
      setInputMessage('');
    }
  };
  

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <i className="fas fa-arrow-left back-arrow" onClick={handleLogout}></i>
        <div className="chat-title">AI-Chat Room</div>
      </div>

      <div className="chat-messages" id="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="loader"></div> // Display loader when loading
        )}
      </div>

      <div className="chat-input-section">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="chat-input"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
              e.preventDefault(); // Prevent the default behavior of the Enter key
            }
          }}
        />
        <button onClick={handleSendMessage} className="send-button">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
