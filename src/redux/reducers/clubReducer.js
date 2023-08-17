import {
    CLUB_ALL_REQUEST,
    CLUB_ALL_SUCCESS,
    CLUB_ALL_FAIL,
    CLUB_SINGLE_REQUEST,
    CLUB_SINGLE_SUCCESS,
    CLUB_SINGLE_FAIL,
    CLUB_CREATE_REQUEST,
    CLUB_CREATE_SUCCESS,
    CLUB_CREATE_FAIL,
    CLUB_CREATE_RESET,
    CLUB_SET_ROLE_REQUEST,
    CLUB_SET_ROLE_SUCCESS,
    CLUB_SET_ROLE_RESET,
    CLUB_SET_ROLE_FAIL,
    CLUB_DELETE_REQUEST,
    CLUB_DELETE_SUCCESS,
    CLUB_DELETE_RESET,
    CLUB_DELETE_FAIL,
    CLEAR_ERRORS
} from "../constants/clubConstants";

export const allClubsReducer = (state = { clubs: [] }, action) => {
    switch (action.type) {
        case CLUB_ALL_REQUEST:
            return {
                loading: true,
                clubs: [],
            };

        case CLUB_ALL_SUCCESS:
            return {
                loading: false,
                clubs: action.payload,
            };

        case CLUB_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const singleClubReducer = (state = { club: [] }, action) => {
    switch (action.type) {
        case CLUB_SINGLE_REQUEST:
        case CLUB_CREATE_REQUEST:
        case CLUB_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CLUB_SINGLE_SUCCESS:
            return {
                loading: false,
                club: action.payload,
            };

        case CLUB_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                club: action.payload,
            };

        case CLUB_CREATE_RESET:
            return {
                ...state,
                success: false,
                club: action.payload
            }

        case CLUB_SINGLE_FAIL:
        case CLUB_CREATE_FAIL:
        case CLUB_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLUB_DELETE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };

        case CLUB_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const setRoleReducer = (state = { club: {} }, action) => {
    switch (action.type) {
        case CLUB_SET_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CLUB_SET_ROLE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
            };

        case CLUB_SET_ROLE_RESET:
            return {
                ...state,
                message: null,
                success: false
            };

        case CLUB_SET_ROLE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};