const initialState = {
    profile: {},
    isLoading: false,
    error: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_PROFILE_REQUEST':
            return { ...state, isLoading: true, error: null };
        case 'EDIT_PROFILE_SUCCESS':
            return { ...state, profile: action.payload, isLoading: false };
        case 'EDIT_PROFILE_FAILURE':
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};

export default profileReducer;
