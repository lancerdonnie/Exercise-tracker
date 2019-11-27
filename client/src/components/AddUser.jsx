import React, { useState, useContext } from 'react';
import UserContext from '../context/userContext';

const AddUser = () => {
  const { submitUser } = useContext(UserContext);
  const [text, setText] = useState('');

  const addText = e => {
    setText(e.target.value);
  };
  const handleUser = e => {
    e.preventDefault();
    submitUser(text);
    setText('');
  };
  return (
    <div>
      <form onSubmit={handleUser}>
        <input
          onChange={addText}
          type='text'
          value={text}
          placeholder='add a user'
        />
        <button type='submit'>Add user</button>
      </form>
    </div>
  );
};

export default AddUser;
