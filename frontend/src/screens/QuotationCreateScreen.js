import emailjs from "emailjs-com"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Button, Form, Table, Modal } from 'react-bootstrap'
import { listCustomers, detailsCustomer } from '../actions/userActions'
import { listProducts } from '../actions/productActions'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { createQuotation } from '../actions/quotationActions.js'
import Loader from '../components/LoadingBox'
import Message from '../components/MessageBox'
import FormContainer from '../components/FormContainer.js'
import { QUOTATION_CREATE_RESET } from '../constants/quotationConstants'
import { CART_EMPTY } from '../constants/cartConstants'



export default function QuotationCreateScreen({ history }) {
  const[customerName, setCustomerName] = useState('')
  const[productId, setProductId] = useState('')
  const[quantity, setQuantity] = useState('')
  
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  
  const customerList = useSelector(state => state.customerList)
  const { 
    loading: loadingCustomers, 
    error: errorCustomers, 
    customers 
  } = customerList
  
  const cart = useSelector(state => state.cart)
  const quotationCreate = useSelector(state => state.quotationCreate)
  const { 
    success: successCreate, 
    error: errorCreate, 
    quotation: createdQuotation,
  } = quotationCreate
  
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setProductId('')
    setQuantity('')
  }
  const handleShow = () => setShow(true)

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingFee = cart.itemsPrice > 25000 ? toPrice(0) : toPrice(100);
  cart.totalPrice = cart.itemsPrice + cart.shippingFee;        
      
  const dispatch = useDispatch()
    
  useEffect(() => {
    dispatch(listProducts())
    dispatch(listCustomers())
    if (errorCreate) {
      dispatch({ type: QUOTATION_CREATE_RESET });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    }

    if (createdQuotation) {
      // var templateParams = {
      //     name: customerName,
      //     quotationId: createdQuotation._id,
      //     orderItems: cart.cartItems,
      //     itemName1: cart.cartItems[0].productName,
      //     itemName2: cart.cartItems[1] ? cart.cartItems[1].productName : '',
      //     itemName3: cart.cartItems[2] ? cart.cartItems[2].productName : '',
      //     itemName4: cart.cartItems[3] ? cart.cartItems[3].productName : '',
      //     itemName5: cart.cartItems[4] ? cart.cartItems[4].productName : '',
      //     itemQty1: cart.cartItems[0].qty,
      //     itemQty2: cart.cartItems[1] ? cart.cartItems[1].qty : '',
      //     itemQty3: cart.cartItems[2] ? cart.cartItems[2].qty : '',
      //     itemQty4: cart.cartItems[3] ? cart.cartItems[3].qty : '',
      //     itemQty5: cart.cartItems[4] ? cart.cartItems[4].qty : '',
      //     itemUnitPrice1: cart.cartItems[0].price,
      //     itemUnitPrice2: cart.cartItems[1] ? cart.cartItems[1].price : '',
      //     itemUnitPrice3: cart.cartItems[2] ? cart.cartItems[2].price : '',
      //     itemUnitPrice4: cart.cartItems[3] ? cart.cartItems[3].price : '',
      //     itemUnitPrice5: cart.cartItems[4] ? cart.cartItems[4].price : '',
      //     itemSubTotal1: cart.cartItems[0].qty * cart.cartItems[0].price,
      //     itemSubTotal2: cart.cartItems[1] ? (cart.cartItems[1].qty * cart.cartItems[1].price) : '',
      //     itemSubTotal3: cart.cartItems[2] ? (cart.cartItems[2].qty * cart.cartItems[2].price) : '',
      //     itemSubTotal4: cart.cartItems[3] ? (cart.cartItems[3].qty * cart.cartItems[3].price) : '',
      //     itemSubTotal5: cart.cartItems[4] ? (cart.cartItems[4].qty * cart.cartItems[4].price) : '',
      //     itemsPrice: cart.itemsPrice,
      //     shippingFee: createdQuotation.shippingFee,
      //     totalPrice: cart.totalPrice,
      //     email: createdQuotation.invoiceAddress,
      //   };
        
      //   emailjs.send('gmail', 'template_ngdfgsm', templateParams, "user_x0YouQzDgsn5hZdJ8u2Zs")
      //     .then(response => {
      //       console.log('SUCCESS!', response.status, response.text);
      //   }, error => {
      //         console.log('FAILED...', error);
      //   }
      // );
      if (successCreate) {
        history.push('/sales/quotations/');
      }
    }
  }, [dispatch, history, createdQuotation, successCreate])

  const createQuotationHandler = () => {
    dispatch(
      createQuotation({
        name: customerName,
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        shippingFee: cart.shippingFee,
        totalPrice: cart.totalPrice,
      })
    )
  }
  
  const discardHandler = () => {
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
    history.push('/sales/quotations')
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const submitHandler = (e) => {
    dispatch(addToCart(productId, quantity))
    setProductId('')
    setQuantity('')
    handleClose()
  }

  return (
    <main>
      <div>
        <Container>
          {loading && loadingCustomers && <Loader></Loader>}
          {error && <Message variant="danger">{error}</Message>}

          {errorCustomers && <Message variant="danger">{errorCustomers}</Message>}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}

          
          <h4>New Quotation</h4>
        <hr/>
        </Container>
      </div>

      <FormContainer>
        <form>
          <div className='mb-3'>
            <label htmlFor='customerName'>Customer Name</label>
            <br />
            <input 
              id='customerName'
              type="text" 
              list="customer" 
              placeholder='  Enter customer name'
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <datalist id="customer">
              {
                customers && customers.map((customer) => (
                <option key={customer._id} value={customer.fullName}>
                  {customer.fullName}
                </option>
                ))
              }
            </datalist>
          </div>

          <div>
            <label htmlFor='invoiceAddress'>Invoice Address</label>
            <br />
            <input 
              id='invoiceAddress'
              type="text" 
              list="email" 
              placeholder='  Enter invoice address'
              value={customerName}
              readonly
            />
          </div>
          <br />
          <div className='mb-3'>
            <label htmlFor='deliveryAddress'>Delivery Address</label>
            <br />
            <input 
              id='deliveryAddress'
              type="text" 
              list="address" 
              placeholder='  Enter delivery address'
              value={customerName}
              readonly
            />
          </div>

          
        </form>
      </FormContainer>

      <div>
        <Container className='pt-4'>
          <h6 className='text-dark'>Order Lines</h6>
          <Table striped bordered responsive className='table-lines'>
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {
                cart.cartItems.map(cartItem => (
                  <tr key={cartItem.productId}>
                    <td>
                      <Button variant='danger' onClick={() => removeFromCartHandler(cartItem.productId)}>
                        <i className='fas fa-minus btn-xs' />
                      </Button>
                    </td>
                    
                    <td>{cartItem.productName}</td>
                    <td>
                      <select
                        value={cartItem.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(cartItem.productId, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(cartItem.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{cartItem.price}</td>
                    <td>{cartItem.qty * cartItem.price}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          <Link to='#' className='text-decoration-none text-info' onClick={handleShow}>
            + Add Product
          </Link>

          {/* {loadingCreate &&
            <Message variant="info">A copy of this sales quote has been sent to your customer.</Message>
          } */}

          <div className='mt-3'>
            <span>
              <Button variant='danger' className='btn btn-sm mr-2' onClick={createQuotationHandler}>Save</Button>
              <Button variant='danger' className='btn btn-sm mr-2' onClick={discardHandler}>Discard</Button>
            </span>
          </div>

          {/* may warning dito sa backdrop */}
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id='modalForm'>
                <div className='mb-3'>
                  <label htmlFor='productName'>Product Name</label>
                    <br />
                    <input 
                      id='productName'
                      type="text" 
                      list="products" 
                      placeholder='  Enter product'
                      value={productId}
                      onChange={(e) => {setProductId(e.target.value)}}
                      required
                    />
                    <datalist id="products">
                      {
                        products && products.map((product) => (
                        <option key={product._id} value={product.productId}>
                          {product.productName}
                        </option>
                        ))
                      }
                    </datalist>
                </div>
    
                <div className='mb-3'>
                  <label htmlFor="quantity">Quantity</label>
                  <br/>
                  <input
                    id="quantity"
                    type="text"
                    placeholder="  Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                  ></input>
                </div>
              </form>

              <div>
              
              </div>
            </Modal.Body>
              
            <Modal.Footer>
              <Button type='reset' variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary" 
                onClick={submitHandler}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </main>
  )
}
