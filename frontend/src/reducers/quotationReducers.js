import {
  QUOTATION_CREATE_FAIL,
  QUOTATION_CREATE_REQUEST,
  QUOTATION_CREATE_RESET,
  QUOTATION_CREATE_SUCCESS,
  QUOTATION_LIST_REQUEST,
  QUOTATION_LIST_SUCCESS,
  QUOTATION_LIST_FAIL,  
  QUOTATION_DETAILS_FAIL,
  QUOTATION_DETAILS_REQUEST,
  QUOTATION_DETAILS_SUCCESS,
  QUOTATION_DELETE_REQUEST,
  QUOTATION_DELETE_SUCCESS,
  QUOTATION_DELETE_FAIL,
  QUOTATION_DELETE_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/quotationConstants';
    
export const quotationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTATION_CREATE_REQUEST:
      return { loading: true };
    case QUOTATION_CREATE_SUCCESS:
      return { loading: false, success: true, quotation: action.payload };
    case QUOTATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case QUOTATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const quotationDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
   case QUOTATION_DETAILS_REQUEST:
      return { loading: true };
    case QUOTATION_DETAILS_SUCCESS:
      return { loading: false, quote: action.payload };
    case QUOTATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const quotationListReducer = (state = { quotations: [] }, action) => {
  switch (action.type) {
    case QUOTATION_LIST_REQUEST:
      return { loading: true };
    case QUOTATION_LIST_SUCCESS:
      return { loading: false, quotations: action.payload };
    case QUOTATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const quotationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUOTATION_DELETE_REQUEST:
      return { loading: true };
    case QUOTATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUOTATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case QUOTATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};