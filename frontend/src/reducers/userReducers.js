import {
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_FAIL,
    CUSTOMER_CREATE_REQUEST,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_CREATE_FAIL,
    CUSTOMER_CREATE_RESET,
    CUSTOMER_DETAILS_REQUEST,
    CUSTOMER_DETAILS_SUCCESS,
    CUSTOMER_DETAILS_FAIL,
    CUSTOMER_UPDATE_REQUEST,
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAIL,
    CUSTOMER_UPDATE_RESET,
    CUSTOMER_DELETE_REQUEST,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_DELETE_FAIL,
    CUSTOMER_DELETE_RESET,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const customerListReducer = (state = { customers: [] }, action) => {
    switch (action.type) {
        case CUSTOMER_LIST_REQUEST:
            return { loading: true };
        case CUSTOMER_LIST_SUCCESS:
            return { loading: false, customers: action.payload };
        case CUSTOMER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const customerCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_CREATE_REQUEST:
            return { loading: true };
        case CUSTOMER_CREATE_SUCCESS:
            return { loading: false, success: true, customer: action.payload };
        case CUSTOMER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case CUSTOMER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const customerDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case CUSTOMER_DETAILS_REQUEST:
            return { loading: true };
        case CUSTOMER_DETAILS_SUCCESS:
            return { loading: false, customer: action.payload };
        case CUSTOMER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const customerUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_UPDATE_REQUEST:
            return { loading: true };
        case CUSTOMER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case CUSTOMER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CUSTOMER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const customerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_DELETE_REQUEST:
            return { loading: true };
        case CUSTOMER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CUSTOMER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case CUSTOMER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
