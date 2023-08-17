import {
    TASK_ALL_REQUEST,
    TASK_ALL_SUCCESS,
    TASK_ALL_FAIL,
    TASK_SINGLE_REQUEST,
    TASK_SINGLE_SUCCESS,
    TASK_SINGLE_FAIL,
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,
    TASK_CREATE_RESET,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_RESET,
    TASK_UPDATE_FAIL,
    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_RESET,
    TASK_DELETE_FAIL,
    CLEAR_ERRORS
} from "../constants/taskConstants";

export const allTasksReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case TASK_ALL_REQUEST:
            return {
                loading: true,
                tasks: [],
            };
        case TASK_ALL_SUCCESS:
            return {
                loading: false,
                tasks: action.payload,
            };
        case TASK_ALL_FAIL:
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

export const singleTaskReducer = (state = { task: {} }, action) => {
    switch (action.type) {
        case TASK_SINGLE_REQUEST:
        case TASK_CREATE_REQUEST:
        case TASK_UPDATE_REQUEST:
        case TASK_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case TASK_SINGLE_SUCCESS:
        case TASK_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                task: action.payload,
            };

        case TASK_SINGLE_FAIL:
        case TASK_CREATE_FAIL:
        case TASK_UPDATE_FAIL:
        case TASK_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case TASK_DELETE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success,
            };

        case TASK_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
            };

        case TASK_CREATE_RESET:
            return {
                ...state,
                success: false
            }

        case TASK_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case TASK_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
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
