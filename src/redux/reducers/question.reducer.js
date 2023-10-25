const initialState = {
  isSubmitting: false,
  postSuccess: false,
  postError: null,
  questionDetails: [],
  allQuestions: [],
  userQuestions: [],
  isLoading: false,
  error: null,
  votes: {
    upvotes: 0,
    downvotes: 0,
    hasupVoted: false,
    hasdownVoted: false,
    hassaved: false,
  },
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
    case "FETCH_USER_QUESTIONS_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_USER_QUESTIONS_SUCCESS":
      return { ...state, userQuestions: action.payload, isLoading: false };
    case "FETCH_USER_QUESTIONS_FAILURE":
      return { ...state, isLoading: false, error: action.error };
    case "EDIT_QUESTION_SUCCESS":
      return { ...state, isSubmitting: false, postSuccess: true };
    case "EDIT_QUESTION_FAILURE":
      return { ...state, isSubmitting: false, postError: action.error };
    case "DELETE_QUESTION_SUCCESS":
      return { ...state, isSubmitting: false, postSuccess: true };
    case "DELETE_QUESTION_FAILURE":
      return { ...state, isSubmitting: false, postError: action.error };
    case "VOTE_QUESTION_SUCCESS":
      return {
        ...state,
        votes: {
          ...state.votes,
          hasupVoted: action.payload,
          hasdownVoted: action.payload.hasdownVoted,
        },
      };
    case "TOGGLE_SAVE_QUESTION_SUCCESS":
      return {
        ...state,
        votes: {
          ...state.votes,
          hassaved: action.payload.hassaved,
        },
      };
    default:
      return state;
  }
};

export default questionReducer;
