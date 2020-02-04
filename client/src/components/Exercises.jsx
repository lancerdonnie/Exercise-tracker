import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/userContext';

const Exercises = () => {
  const {
    currentUser,
    submitExercise,
    getExercises,
    exercises,
    updateCurrentExercise,
    deleteExercise,
    currentExercise,
    updateExercise
  } = useContext(UserContext);
  const [form, setForm] = useState({ exercise: '', duration: '' });
  useEffect(() => {
    if (currentUser === null || currentUser === undefined) return;
    getExercises(currentUser._id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (currentExercise !== null) {
      setForm({
        exercise: currentExercise.exercise,
        duration: currentExercise.duration
      });
    }

    // eslint-disable-next-line
  }, [currentExercise]);
  const handleSubmit = e => {
    e.preventDefault();
    if (!currentExercise) {
      submitExercise(form);
    } else {
      updateExercise(form);
    }
    setForm({ exercise: '', duration: '' });
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleUpdateExercise = async id => {
    updateCurrentExercise(id);
  };
  return (
    currentUser !== null && (
      <div className='exercises'>
        <h3>Add exercise</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor=''>Exercise</label>
          <input
            name='exercise'
            onChange={handleChange}
            value={form.exercise}
            type='text'
          />
          <label htmlFor=''>Duration</label>
          <input
            name='duration'
            onChange={handleChange}
            value={form.duration}
            type='text'
            placeholder='In minutes'
          />

          {currentExercise === null && <button type='submit'>Submit</button>}
          {currentExercise !== null && <button type='submit'>Update</button>}
        </form>

        {exercises.length > 0 &&
          exercises.map(x => {
            return (
              <div className='excercisedetails' key={x._id}>
                <p>{x.exercise}</p>
                <p>{x.duration} minutes</p>
                <div className='excercisebuttons'>
                  <button onClick={handleUpdateExercise.bind(this, x._id)}>
                    update
                  </button>
                  <button onClick={deleteExercise.bind(this, x._id)}>x</button>
                </div>
              </div>
            );
          })}
      </div>
    )
  );
};

export default Exercises;
