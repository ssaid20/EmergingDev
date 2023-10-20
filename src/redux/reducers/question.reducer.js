const initialState = {
    isSubmitting: false,
    postSuccess: false,
    postError: null,
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_QUESTION_REQUEST':
            return { ...state, isSubmitting: true, postSuccess: false, postError: null };
        case 'POST_QUESTION_SUCCESS':
            return { ...state, isSubmitting: false, postSuccess: true };
        case 'POST_QUESTION_FAILURE':
            return { ...state, isSubmitting: false, postError: action.error };
        default:
            return state;
    }
};

export default questionReducer;
