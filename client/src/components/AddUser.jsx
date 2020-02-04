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
    if (text.length > 1) {
      submitUser(text);
      setText('');
    }
  };
  return (
    <div className='adduser'>
      <form onSubmit={handleUser}>
        <input
          onChange={addText}
          type='text'
          value={text}
          placeholder='Add a user'
        />
        <button type='submit'>Add a user</button>
      </form>
    </div>
  );
};

export default AddUser;
