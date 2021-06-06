import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import {
  customerListReducer,
  customerCreateReducer,
  customerDetailsReducer,
} from './reducers/userReducers.js'
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
} from './reducers/productReducers.js'
import {
  quotationCreateReducer,
  quotationListReducer,
  quotationDetailsReducer,
  quotationDeleteReducer,
  orderPayReducer,
  orderDeliverReducer,
} from './reducers/quotationReducers.js'

const initialState = {
    // userSignin: {
    //   userInfo: localStorage.getItem('userInfo')
    //   ? JSON.parse(localStorage.getItem('userInfo'))
    //   : null,
    // },
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
    }
  };
  
const reducer = combineReducers({
  cart: cartReducer,
  customerList: customerListReducer,
  customerCreate: customerCreateReducer,
  customerDetails: customerDetailsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  quotationCreate: quotationCreateReducer,
  quotationList: quotationListReducer,
  quotationDetails: quotationDetailsReducer,
  quotationDelete: quotationDeleteReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);
  
export default store;