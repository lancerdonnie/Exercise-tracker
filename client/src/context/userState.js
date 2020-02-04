import React, { useReducer } from 'react';
import UserContext from './userContext';
import Reducer from './userReducer';
import axios from 'axios';

const UserState = props => {
  const initialState = {
    users: null,
    currentUser: null,
    exercises: [],
    currentExercise: null
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
      dispatch({ type: 'CLEAR_EXERCISES' });
      return;
    }
    const user = state.users.find(x => {
      return x.name === selectedName;
    });
    // const res = await axios.get(`/exercises/${user._id}`);
    // dispatch({ type: 'SET_SELECTED_USER', payload: res.data });
    dispatch({ type: 'SET_SELECTED_USER', payload: user });
    getExercises(user._id);
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

  const deleteExercise = async id => {
    try {
      await axios.delete(`/exercises/${id}`);
      const newExercises = state.exercises.filter(x => {
        return x._id !== id;
      });
      dispatch({ type: 'SET_EXERCISES', payload: newExercises });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    try {
      await axios.delete(`/users/${state.currentUser._id}`);
      getUsers();
      dispatch({ type: 'CLEAR_EXERCISES' });
    } catch (error) {
      console.log(error);
    }
  };
  const updateCurrentExercise = id => {
    dispatch({
      type: 'SET_CURRENT_EXERCISE',
      payload: state.exercises.find(x => {
        return x._id === id;
      })
    });

    const newExercises = state.exercises.filter(x => {
      return x._id !== id;
    });
    dispatch({ type: 'SET_EXERCISES', payload: newExercises });
    console.log('done update');
  };
  const updateExercise = async exercise => {
    exercise.duration = parseInt(exercise.duration, 10);
    try {
      await axios.patch(`/exercises/${state.currentExercise._id}`, exercise);
      getExercises(state.currentUser._id);
      dispatch({ type: 'CLEAR_CURRENT_EXERCISE' });
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
        exercises: state.exercises,
        deleteExercise,
        updateCurrentExercise,
        deleteUser,
        currentExercise: state.currentExercise,
        updateExercise
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
