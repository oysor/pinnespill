const { createStore } = require("redux");

const myReducer = (state = [], action) => {
  // const newState = { ...state };

  if (action.type === "completed") {
    if (!state.includes(action.value)) {
      state.push(action.value);
    }
  }
  return state;
};

const store = createStore(myReducer);
export default store;
