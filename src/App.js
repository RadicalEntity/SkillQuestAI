import React from 'react';
import './App.css';
import Chat from './chat';
import logo from './questAI-logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt='QuestAI Logo' src={logo}></img>
        <h1>&#128075; Welcome to your AI Tutor!</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;
