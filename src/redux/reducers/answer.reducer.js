const initialState = {
    isSubmitting: false,
    postSuccess: false,
    postError: null,
    answerDetails: [],
};

const answerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_ANSWER_REQUEST':
            return { ...state, isSubmitting: true, postSuccess: false, postError: null };
        case 'POST_ANSWER_SUCCESS':
            return { ...state, isSubmitting: false, postSuccess: true };
        case 'POST_ANSWER_FAILURE':
            return { ...state, isSubmitting: false, postError: action.error };
        default:
            return state;
    }
};

export default answerReducer;
