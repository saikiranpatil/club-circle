import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCESS,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_FAIL,
    UPDATE_USERS_SUCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCESS,
    USER_ALL_REQUEST,
    USER_ALL_FAIL,
    USER_ALL_SUCESS,
    CLEAR_ERRORS,
} from '../constants/userConstants';
import { getErrorMessage } from '../../components/Utils/utils';

// Login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post("/api/v1/login", { email, password }, config);

        dispatch({
            type: LOGIN_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// Register 
export const register = (name, email, password, avatar, about) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post("/api/v1/register", { name, email, password, avatar, about }, { config });

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// Logout
export const logOut = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout");

        dispatch({
            type: LOGOUT_SUCESS,
        });

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// update profile 
export const updateUser = (userData) => async (dispatch) => {
    console.log(userData)
    try {
        dispatch({ type: UPDATE_USERS_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.put("/api/v1/me/update", userData, { config });

        dispatch({
            type: UPDATE_USERS_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USERS_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// update password 
export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put("/api/v1/password/update", userData, { config });

        dispatch({
            type: UPDATE_PASSWORD_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// forgot password 
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`/api/v1/forgot/password`, email, { config });

        dispatch({
            type: FORGOT_PASSWORD_SUCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// reset password 
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, { config });

        dispatch({
            type: RESET_PASSWORD_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// Load user 
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get("/api/v1/me");

        dispatch({
            type: LOAD_USER_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// all users 
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_ALL_REQUEST });

        const { data } = await axios.get("/api/v1/users");

        dispatch({
            type: USER_ALL_SUCESS,
            payload: data.users,
        });

    } catch (error) {
        dispatch({
            type: USER_ALL_FAIL,
            payload: getErrorMessage(error),
        })
    }
};

// clear all ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}