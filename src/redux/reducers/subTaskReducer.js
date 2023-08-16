import {
    SUBTASK_ALL_REQUEST,
    SUBTASK_ALL_SUCCESS,
    SUBTASK_ALL_FAIL,
    SUBTASK_SINGLE_REQUEST,
    SUBTASK_SINGLE_SUCCESS,
    SUBTASK_SINGLE_FAIL,
    SUBTASK_SINGLE_RESET,
    SUBTASK_CREATE_REQUEST,
    SUBTASK_CREATE_SUCCESS,
    SUBTASK_CREATE_FAIL,
    SUBTASK_CREATE_RESET,
    SUBTASK_UPDATE_REQUEST,
    SUBTASK_UPDATE_SUCCESS,
    SUBTASK_UPDATE_FAIL,
    SUBTASK_UPDATE_RESET,
    SUBTASK_DELETE_REQUEST,
    SUBTASK_DELETE_SUCCESS,
    SUBTASK_DELETE_FAIL,
    SUBTASK_DELETE_RESET,
    CLEAR_ERRORS,
} from "../constants/subtaskConstants";

export const allSubtasksReducer = (state = { subtasks: [] }, action) => {
    switch (action.type) {
        case SUBTASK_ALL_REQUEST:
            return {
                loading: true,
                subtasks: [],
            };
        case SUBTASK_ALL_SUCCESS:
            return {
                loading: false,
                subtasks: action.payload,
            };
        case SUBTASK_ALL_FAIL:
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

export const singleSubtaskReducer = (state = { subtask: {} }, action) => {
    switch (action.type) {
        case SUBTASK_SINGLE_REQUEST:
        case SUBTASK_CREATE_REQUEST:
        case SUBTASK_UPDATE_REQUEST:
        case SUBTASK_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case SUBTASK_SINGLE_SUCCESS:
        case SUBTASK_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                subtask: action.payload,
            };

        case SUBTASK_UPDATE_SUCCESS:
            return {
                isUpdated: action.payload,
                loading: false,
            }

        case SUBTASK_SINGLE_FAIL:
        case SUBTASK_CREATE_FAIL:
        case SUBTASK_UPDATE_FAIL:
        case SUBTASK_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case SUBTASK_SINGLE_RESET:
        case SUBTASK_CREATE_RESET:
            return {
                ...state,
                success: false
            };

        case SUBTASK_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case SUBTASK_DELETE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success,
            };

        case SUBTASK_DELETE_RESET:
            return {
                ...state,
                isDeleted: false,
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