import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';

const Users = () => {
  const {
    getUsers,
    users,
    setSelected,
    getExercises,
    currentUser
  } = useContext(UserContext);
  const [option, setOption] = useState('select');
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const handleChange = async e => {
    setOption(e.target.value);
    setSelected(e.target.value);
    if (currentUser === null) return;
    getExercises(currentUser._id);
    console.log('handle');
  };
  return users !== null ? (
    <div>
      <select onChange={handleChange} name='users' id='' value={option}>
        <option value='select'>select</option>
        {users.map(user => {
          return (
            <option key={user._id} value={user.name}>
              {user.name}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <div>waiting for users</div>
  );
};

export default Users;
