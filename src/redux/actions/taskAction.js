import axios from "axios";
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
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  CLEAR_ERRORS
} from "../constants/taskConstants";

// Get All Tasks
export const getAllTasks = (id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_ALL_REQUEST });

    const { data } = await axios.get(`/api/v1/tasks/${id}`);

    dispatch({
      type: TASK_ALL_SUCCESS,
      payload: data.tasks,
    });
  } catch (error) {
    dispatch({
      type: TASK_ALL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Single Task
export const getSingleTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: TASK_SINGLE_REQUEST });

    const { data } = await axios.get(`/api/v1/task/${taskId}`);

    dispatch({
      type: TASK_SINGLE_SUCCESS,
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: TASK_SINGLE_FAIL,
      payload: error.response.data.message
    });
  }
};

// Create Task
export const createTask = (clubId, taskData) => async (dispatch) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/task/create/${clubId}`, taskData, config);

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Task
export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    dispatch({ type: TASK_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/task/${taskId}`, taskData, config);

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/v1/task/${taskId}`);

    dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: { success: data.success },
    });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear all ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}