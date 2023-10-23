const initialState = {
    isSubmitting: false,
    postSuccess: false,
    postError: null,
    allanswers: [],
    answerDetails: [],
    isLoadingAnswers: false,
    loadAnswersError: null,
};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_ANSWER_REQUEST':
            return { ...state, isSubmitting: true, postSuccess: false, postError: null };
        case 'POST_ANSWER_SUCCESS':
            return { ...state, isSubmitting: false, postSuccess: true };
        case 'POST_ANSWER_FAILURE':
            return { ...state, isSubmitting: false, postError: action.error };
        case 'FETCH_ANSWERS_REQUEST':
            return { ...state, allanswers: action.payload, isLoadingAnswers: true, loadAnswersError: null };
        case 'FETCH_ANSWERS_SUCCESS':
            return { ...state, allanswers: action.payload, isLoadingAnswers: false, answerDetails: action.answers };
        case 'FETCH_ANSWERS_FAILURE':
            return { ...state, allanswers: action.payload, isLoadingAnswers: false, loadAnswersError: action.error };
        default:
            return state;
    }
};

export default answerReducer;

