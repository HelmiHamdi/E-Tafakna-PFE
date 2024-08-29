import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FiSend } from 'react-icons/fi';
import userImage from '../../assets/user.png';
import chatImage from '../../assets/boot.jpg';
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 89vh;
  max-width: 90%;
  margin: 30px;
  margin-top:-30px;

`;





const ChatContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  margin-bottom: 15px;
`;

const MessageContent = styled.div`
  display: flex;
  align-items: center;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ sender }) => (sender === 'user' ? '#007bff' : '#6c757d')};
  color: white;
  margin: 0 10px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const TimeStamp = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
  text-align: ${({ sender }) => (sender === 'user' ? 'right' : 'left')};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString();
    const userMessage = { sender: 'user', text: input, time: timestamp };
    const updatedMessages = [...messages, userMessage];

    try {
      const response = await axios.post('http://localhost:8800/api/chatIA/chatbot', { message: input });
      const botMessage = { sender: 'bot', text: response.data.response, time: new Date().toLocaleTimeString() };
      updatedMessages.push(botMessage);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    }

    setMessages(updatedMessages);
    setInput('');
  };

  return (
    <Container >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CHATBOT" subtitle="assissant IA" />
      </Box>

   

      <ChatContainer ref={chatContainerRef}>
        {messages.map((message, index) => (
          <MessageBox key={index} sender={message.sender}>
            <MessageContent sender={message.sender}>
              {message.sender === 'bot' && <Avatar src={chatImage} alt="chatbot" />}
              <MessageBubble sender={message.sender}>
                {message.text}
              </MessageBubble>
              {message.sender === 'user' && <Avatar src={userImage} alt="user" />}
            </MessageContent>
            <TimeStamp sender={message.sender}>{message.time}</TimeStamp>
          </MessageBox>
        ))}
      </ChatContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Tapez votre message..."
        />
        <SendButton onClick={sendMessage}>
          <FiSend size={20} />
        </SendButton>
      </InputContainer>
    </Container>
  );
};

export default Chatbot;
