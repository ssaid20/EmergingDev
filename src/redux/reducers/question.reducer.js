const initialState = {
  isSubmitting: false,
  postSuccess: false,
  postError: null,
  questionDetails: [],
  allQuestions: [],
  isLoading: false,
  error: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_QUESTIONS_SUCCESS":
      return { ...state, allQuestions: action.payload };
    case "POST_QUESTION_REQUEST":
      return {
        ...state,
        isSubmitting: true,
        postSuccess: false,
        postError: null,
      };
    case "POST_QUESTION_SUCCESS":
      return { ...state, isSubmitting: false, postSuccess: true };
    case "POST_QUESTION_FAILURE":
      return { ...state, isSubmitting: false, postError: action.error };
    case "FETCH_QUESTION_SUCCESS":
      return { ...state, questionDetails: action.payload };
    case "EDIT_QUESTION_SUCCESS":
      return { ...state, postSuccess: true };
    case "EDIT_QUESTION_FAILURE":
      return { ...state, postError: action.error };
    case "FETCH_USER_QUESTIONS_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_USER_QUESTIONS_SUCCESS":
      return { ...state, allQuestions: action.payload, isLoading: false };
    case "FETCH_USER_QUESTIONS_FAILURE":
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default questionReducer;
