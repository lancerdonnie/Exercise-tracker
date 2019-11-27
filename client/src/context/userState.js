import React, { useReducer } from 'react';
import UserContext from './userContext';
import Reducer from './userReducer';
import axios from 'axios';

const UserState = props => {
  const initialState = {
    users: null,
    currentUser: null,
    exercises: []
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  //get users
  const getUsers = async () => {
    const users = await axios.get('/users');
    setUsers(users.data);
  };
  //set users
  const setUsers = users => {
    dispatch({ type: 'SET_USERS', payload: users });
  };
  const submitUser = async user => {
    const adduser = { name: user };

    try {
      await axios.post('/users', adduser);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const setSelected = async selectedName => {
    if (selectedName === 'select') {
      dispatch({ type: 'CLEAR_SELECTED_USER' });
      return;
    }
    const user = state.users.find(x => {
      return x.name === selectedName;
    });
    // const res = await axios.get(`/exercises/${user._id}`);
    // dispatch({ type: 'SET_SELECTED_USER', payload: res.data });
    dispatch({ type: 'SET_SELECTED_USER', payload: user });
  };
  const submitExercise = async exercise => {
    exercise.duration = parseInt(exercise.duration, 10);
    try {
      const res = await axios.post(
        `/exercises/${state.currentUser._id}`,
        exercise
      );
      console.log(res);
      getExercises(state.currentUser._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getExercises = async id => {
    try {
      const res = await axios.get(`/exercises/${id}`);

      dispatch({ type: 'SET_EXERCISES', payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        users: state.users,
        getUsers,
        submitUser,
        setSelected,
        currentUser: state.currentUser,
        submitExercise,
        getExercises,
        exercises: state.exercises
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
