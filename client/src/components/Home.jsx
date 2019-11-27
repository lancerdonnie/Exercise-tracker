import React from 'react';
import Users from './Users';
import AddUser from './AddUser';
import Exercises from './Exercises';

const Home = () => {
  return (
    <div>
      <AddUser />
      <Users />
      <Exercises />
    </div>
  );
};

export default Home;
