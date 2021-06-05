import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (productId, qty) => async(dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/sales/quotations/add/${productId}`)
  
  dispatch({ 
    type: CART_ADD_ITEM,
    payload: {
      // id: data._id,
      productId: data.productId,
      productName: data.productName,
      price: data.price,
      countInStock: data.quantity,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};