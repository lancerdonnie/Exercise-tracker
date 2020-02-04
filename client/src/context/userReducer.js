export default (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, currentUser: action.payload };
    case 'CLEAR_SELECTED_USER':
      return { ...state, currentUser: null };
    case 'SET_EXERCISES':
      return { ...state, exercises: action.payload };
    case 'CLEAR_EXERCISES':
      return { ...state, exercises: [] };
    case 'SET_CURRENT_EXERCISE':
      return { ...state, currentExercise: action.payload };
    case 'CLEAR_CURRENT_EXERCISE':
      return { ...state, currentExercise: null };
    default:
      return state;
  }
};
