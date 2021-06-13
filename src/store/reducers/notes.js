import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_ERROR,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_ERROR,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_ERROR,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_ERROR
} from "../actions/actionTypes";

const initialState = {
    notes: {succes:false, data: []},
    addNotes: {success:false},
    loginState: {success:false},
    signUpState: {success: false},
    updateNotes: {success:false},
    deleteNotes: {success: false}
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ADD_NOTES_SUCCESS:
        case ADD_NOTES_ERROR:
            return {
                ...state,
                addNotes: action.payload
            };
        case DELETE_NOTES_SUCCESS:
        case DELETE_NOTES_ERROR:
            return {
                ...state,
                deleteNotes: action.payload
            };
        case FETCH_NOTES_SUCCESS:
        case FETCH_NOTES_ERROR:
            return {
                ...state,
                notes: action.payload
            };
        case UPDATE_NOTES_SUCCESS:
        case UPDATE_NOTES_ERROR:
            return {
                ...state,
                updateNotes: action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState: action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginState: action.payload
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signUpState: action.payload
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                signUpState: action.payload
            };
        default:
            return state;
    }
};

export default reducer;