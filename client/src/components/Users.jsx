import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';

const Users = () => {
  const { getUsers, users, setSelected, currentUser, deleteUser } = useContext(
    UserContext
  );
  const [option, setOption] = useState('select');
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    setOption(e.target.value);
    setSelected(e.target.value);
  };
  const handleDelete = () => {
    if (currentUser === null) return;
    deleteUser();
  };
  return users !== null ? (
    <div>
      {users.length > 0 && (
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
      )}
      {users.length > 0 && <button onClick={handleDelete}>Delete User</button>}
    </div>
  ) : (
    <div>waiting for users</div>
  );
};

export default Users;
