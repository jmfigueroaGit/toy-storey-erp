import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  QUOTATION_CREATE_FAIL,
  QUOTATION_CREATE_REQUEST,
  QUOTATION_CREATE_SUCCESS,
  QUOTATION_DETAILS_REQUEST,
  QUOTATION_DETAILS_SUCCESS,
  QUOTATION_DETAILS_FAIL,
  QUOTATION_LIST_REQUEST,
  QUOTATION_LIST_SUCCESS,
  QUOTATION_LIST_FAIL,
  QUOTATION_DELETE_REQUEST,
  QUOTATION_DELETE_SUCCESS,
  QUOTATION_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from '../constants/quotationConstants';

export const createQuotation = (quotation) => async (dispatch) => {
  dispatch({ type: QUOTATION_CREATE_REQUEST });
  try {

    const { data } = await Axios.post('http://localhost:5000/api/sales/quotations/new', quotation);
    dispatch({ type: QUOTATION_CREATE_SUCCESS, payload: data.quotation });
    console.log('actions', data.quotation)
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: QUOTATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsQuotation = (quoteId) => async (dispatch) => {
  dispatch({ type: QUOTATION_DETAILS_REQUEST, payload: quoteId });
  
  try {
    const { data } = await Axios.get(`http://localhost:5000/api/sales/quotations/${quoteId}`);
    dispatch({ type: QUOTATION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: QUOTATION_DETAILS_FAIL, payload: message });
  }
};

export const listQuotations = () => async (dispatch) => {
  dispatch({ type: QUOTATION_LIST_REQUEST });

  try {
    const { data } = await Axios.get('http://localhost:5000/api/sales/quotations');
    // console.log(data);
    dispatch({ type: QUOTATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: QUOTATION_LIST_FAIL, payload: message });
  }
};

export const deleteQuotation = (quoteId) => async (dispatch, getState) => {
  dispatch({ type: QUOTATION_DELETE_REQUEST, payload: quoteId });
  
  try {
    const { data } = Axios.delete(`http://localhost:5000/api/sales/quotations/${quoteId}`);
    dispatch({ type: QUOTATION_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: QUOTATION_DELETE_FAIL, payload: message });
  }
};

export const payOrder = (quoteId) => async (dispatch) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: quoteId });

  try {
    const { data } = Axios.put(`http://localhost:5000/api/sales/quotations/${quoteId}/pay`);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const deliverOrder = (quoteId) => async (dispatch) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: quoteId });
  
  try {
    const { data } = Axios.put(`http://localhost:5000/api/sales/quotations/${quoteId}/deliver`);
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};