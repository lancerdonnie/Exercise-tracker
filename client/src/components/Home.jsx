import React from 'react';
import Users from './Users';
import AddUser from './AddUser';
import Exercises from './Exercises';

const Home = () => {
  return (
    <div className='home'>
      <h2>Exercise Tracker</h2>
      <AddUser />
      <Users />
      <Exercises />
    </div>
  );
};

export default Home;
