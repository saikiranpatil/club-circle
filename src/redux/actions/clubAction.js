import axios from "axios";
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
    CLUB_SET_ROLE_REQUEST,
    CLUB_SET_ROLE_SUCCESS,
    CLUB_SET_ROLE_FAIL,
    CLUB_DELETE_REQUEST,
    CLUB_DELETE_SUCCESS,
    CLUB_DELETE_FAIL,
    CLEAR_ERRORS
} from "../constants/clubConstants";

// Get All Clubs
export const getAllClubs = () => async (dispatch) => {
    try {
        dispatch({ type: CLUB_ALL_REQUEST });

        const { data } = await axios.get("/api/v1/clubs");

        dispatch({
            type: CLUB_ALL_SUCCESS,
            payload: data.clubs,
        });
    } catch (error) {
        dispatch({
            type: CLUB_ALL_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Single Club
export const getSingleClub = (clubId) => async (dispatch) => {
    try {
        dispatch({ type: CLUB_SINGLE_REQUEST });

        const { data } = await axios.get(`/api/v1/club/${clubId}`);

        dispatch({
            type: CLUB_SINGLE_SUCCESS,
            payload: data.club,
        });
    } catch (error) {
        dispatch({
            type: CLUB_SINGLE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Club
export const createClub = (clubData) => async (dispatch) => {
    try {
        dispatch({ type: CLUB_CREATE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/club/create`, clubData, config);

        dispatch({
            type: CLUB_CREATE_SUCCESS,
            payload: data.club,
        });
    } catch (error) {
        dispatch({
            type: CLUB_CREATE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Set Role in Club
export const setClubRole = (clubId, roleData) => async (dispatch) => {
    try {
        dispatch({ type: CLUB_SET_ROLE_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/club/${clubId}`, roleData, config);

        dispatch({
            type: CLUB_SET_ROLE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CLUB_SET_ROLE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Club
export const deleteClub = (clubId) => async (dispatch) => {
    try {
        dispatch({ type: CLUB_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/v1/club/${clubId}`);

        dispatch({
            type: CLUB_DELETE_SUCCESS,
            payload: data.sucess,
        });
    } catch (error) {
        dispatch({
            type: CLUB_DELETE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};