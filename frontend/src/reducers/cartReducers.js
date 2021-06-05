import { 
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_EMPTY
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      //for each of the item in the cartItems
      const existItem = state.cartItems.find(x => x.product === item.product)
      if (existItem) {
        return {
          // map trhu the current cart  items
          ...state, cartItems: state.cartItems.map(x => x.product === existItem.product
            ? item: x)
        }
      } else {
        return {
          // retain whatever is in the state, and spread across the object, 
          // then set it to an array with the current items and add new item
          ...state, cartItems: [...state.cartItems, item]
        }
      }
      
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.productId !== action.payload),
      };
    
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    
    default:
      return state;
  }
}