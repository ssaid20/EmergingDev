// tags.reducer.js
const initialState = {
  tags: [],
  questionsForTag: [],
};

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_QUESTIONS_FOR_TAG":
      return { ...state, questionsForTag: action.payload };
    default:
      return state;
  }
};

export default tagsReducer;
