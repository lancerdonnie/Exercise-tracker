import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/userContext';

const Exercises = () => {
  const { currentUser, submitExercise, getExercises, exercises } = useContext(
    UserContext
  );
  const [form, setForm] = useState({ exercise: '', duration: '' });
  useEffect(() => {
    if (currentUser === null || currentUser === undefined) return;
    getExercises(currentUser._id);
    // eslint-disable-next-line
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    submitExercise(form);
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add exercise</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Exercise:</label>
        <input
          name='exercise'
          onChange={handleChange}
          value={form.exercise}
          type='text'
        />
        <label htmlFor=''>Duration:</label>
        <input
          name='duration'
          onChange={handleChange}
          value={form.duration}
          type='text'
        />
        <button type='submit'>Submit</button>
      </form>

      {exercises.length > 0 &&
        exercises.map(x => {
          return (
            <div key={x._id}>
              <h1>{x.exercise}</h1>
              <h2>{x.duration} minutes</h2>
            </div>
          );
        })}
    </div>
  );
};

export default Exercises;
