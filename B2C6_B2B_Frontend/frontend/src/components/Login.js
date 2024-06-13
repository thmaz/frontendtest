import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';
import axios from 'axios';

const LoginForm = () => {
  const [personeelsnummer, setPersoneelsnummer] = useState('');
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, wachtwoord, personeelsnummer });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h1>Inloggen</h1>
          </div>
          <hr className="DividerLine1" />
          <div className="form-group">
            <FaUser className="icon" />
            <input
              type="text"
              id="personeelsnummer"
              placeholder="Je personeelsnummer"
              value={personeelsnummer}
              onChange={(event) => setPersoneelsnummer(event.target.value)}
            />
          </div>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              id="email"
              placeholder="Je login of e-mailadres"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <FaLock className="icon" />
            <input
              type="password"
              id="wachtwoord"
              placeholder="Wachtwoord"
              value={wachtwoord}
              onChange={(event) => setWachtwoord(event.target.value)}
            />
          </div>
          <div className="form-actions">
            <a href="http://localhost:3000/">Wachtwoord vergeten?</a>
            <button type="submit">Log in</button>
          </div>
          {message && <div className="message">{message}</div>}
          <div className="footer">
            <p>Mede mogelijk gemaakt door</p>
            <hr className="DividerLine2" />
            <img src="/UMCUtrechtLogo.png" alt="UMC Utrecht" />
            <img src="/JDB logo.png" alt="JDB" />
          </div>
        </form>
      </div>
      <img className="image-container" src="/FrontpageImage.png" alt="FrontpageImage" height={700} />
    </div>
  );
};

export default LoginForm;
