// tags.reducer.js
const initialState = {
  tags: []
};

const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_TAGS":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default tagsReducer;
  