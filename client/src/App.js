import React from 'react';
import './App.css';
import Home from './components/Home';
import UserState from './context/userState';

function App() {
  return (
    <UserState>
      <div className='App'>
        <Home />
      </div>
    </UserState>
  );
}

export default App;
