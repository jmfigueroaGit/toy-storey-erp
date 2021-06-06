import axios from 'axios'
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
} from '../constants/userConstants'

export const listCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST })

    // if may json token at login function na
    // const { userSignin: { userInfo }, } = getState()
    // const config = { 
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }
    const { data } = await axios.get('http://localhost:5000/api/sales/customerlist')
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}

export const createCustomer = (fullName, email, address, contact) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_CREATE_REQUEST })

    const { data } = await axios.post(
      'http://localhost:5000/api/sales/customerlist/add-new-customer', 
      { fullName, email, address, contact }
    )

    dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: CUSTOMER_CREATE_FAIL,
      error: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })  
  }
}

export const detailsCustomer = (fullName) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST })

    const { data } = await axios.get('http://localhost:5000/api/sales/customerlist/details', fullName)

    dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ 
      type: CUSTOMER_DETAILS_FAIL,
      error: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}