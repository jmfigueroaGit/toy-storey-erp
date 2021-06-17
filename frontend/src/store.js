import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import {
    customerListReducer,
    customerCreateReducer,
    customerDetailsReducer,
    customerUpdateReducer,
    customerDeleteReducer,
    userLoginReducer,
} from './reducers/userReducers.js';
import {
    productListReducer,
    productDetailsReducer,
    productCreateReducer,
    productUpdateReducer,
    productDeleteReducer,
} from './reducers/productReducers.js';
import {
    quotationCreateReducer,
    quotationListReducer,
    quotationDetailsReducer,
    quotationDeleteReducer,
    orderPayReducer,
    orderDeliverReducer,
} from './reducers/quotationReducers.js';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
    userLogin: {
        userInfo: userInfoFromStorage,
    },
};

const reducer = combineReducers({
    cart: cartReducer,
    customerList: customerListReducer,
    customerCreate: customerCreateReducer,
    customerDetails: customerDetailsReducer,
    customerUpdate: customerUpdateReducer,
    customerDelete: customerDeleteReducer,
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
    userLogin: userLoginReducer,
});

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
