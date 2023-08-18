import axios from "axios";
import {
    SUBTASK_ALL_REQUEST,
    SUBTASK_ALL_SUCCESS,
    SUBTASK_ALL_FAIL,
    SUBTASK_SINGLE_REQUEST,
    SUBTASK_SINGLE_SUCCESS,
    SUBTASK_SINGLE_FAIL,
    SUBTASK_CREATE_REQUEST,
    SUBTASK_CREATE_SUCCESS,
    SUBTASK_CREATE_FAIL,
    SUBTASK_UPDATE_REQUEST,
    SUBTASK_UPDATE_SUCCESS,
    SUBTASK_UPDATE_FAIL,
    SUBTASK_DELETE_REQUEST,
    SUBTASK_DELETE_SUCCESS,
    SUBTASK_DELETE_FAIL,
    CLEAR_ERRORS
} from "../constants/subtaskConstants";

// Get All Subtasks
export const getAllSubtasks = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: SUBTASK_ALL_REQUEST });

        const { data } = await axios.get(`/api/v1/subtasks/${taskId}`);

        dispatch({
            type: SUBTASK_ALL_SUCCESS,
            payload: data.subtasks,
        });
    } catch (error) {
        dispatch({
            type: SUBTASK_ALL_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Single Subtask
export const getSingleSubtask = (subtaskId) => async (dispatch) => {
    try {
        dispatch({ type: SUBTASK_SINGLE_REQUEST });

        const { data } = await axios.get(`/api/v1/subtask/${subtaskId}`);

        dispatch({
            type: SUBTASK_SINGLE_SUCCESS,
            payload: data.subtask,
        });
    } catch (error) {
        dispatch({
            type: SUBTASK_SINGLE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Subtask
export const createSubtask = (taskId, subtaskData) => async (dispatch) => {
    try {
        dispatch({ type: SUBTASK_CREATE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/subtask/create/${taskId}`, subtaskData, config);

        dispatch({
            type: SUBTASK_CREATE_SUCCESS,
            payload: data.subtask,
        });
    } catch (error) {
        dispatch({
            type: SUBTASK_CREATE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Subtask
export const updateSubtask = (subtaskId, subtaskData) => async (dispatch) => {
    try {
        dispatch({ type: SUBTASK_UPDATE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/subtask/${subtaskId}`, subtaskData, config);

        dispatch({
            type: SUBTASK_UPDATE_SUCCESS,
            payload: data.subtask,
        });
    } catch (error) {
        dispatch({
            type: SUBTASK_UPDATE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Subtask
export const deleteSubtask = (subtaskId) => async (dispatch) => {
    try {
        dispatch({ type: SUBTASK_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/v1/subtask/${subtaskId}`);

        dispatch({
            type: SUBTASK_DELETE_SUCCESS,
            payload: { success: data.success },
        });
    } catch (error) {
        dispatch({
            type: SUBTASK_DELETE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// clear all ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}