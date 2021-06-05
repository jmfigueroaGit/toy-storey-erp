import {
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_FAIL,
    CUSTOMER_CREATE_REQUEST,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_CREATE_FAIL,
    CUSTOMER_CREATE_RESET,
  } from '../constants/userConstants'


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

export const customerCreateReducer = (state = { }, action) => {
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