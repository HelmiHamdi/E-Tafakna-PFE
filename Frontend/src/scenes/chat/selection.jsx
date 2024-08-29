import React from 'react';
import { useNavigate } from 'react-router-dom';
import './selection.css';
import personImage from '../../assets/users.png'; // Assurez-vous que le chemin est correct

const Selection = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate('/chatboot');
  };

  const goToChatroom = () => {
    navigate('/chat');
  };

  return (
    <div className="container">
      <div className="titre">Choose your chat option 👋 </div>
      <img src={personImage} alt="Person inviting to choose" className="person" />
      <div>
      <button className="button" onClick={goToChatbot}>Go to Chatbot</button>
      <button className="button button-secondary" onClick={goToChatroom} style={{ marginLeft: "40px" }}>Go to Chatroom</button>
      </div>
    </div>
  );
};

export default Selection;
