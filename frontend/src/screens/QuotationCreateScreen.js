import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Button, Form, Table, Modal } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
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
  const[invoiceAddress, setInvoiceAddress] = useState('')
  const[deliveryAddress, setDeliveryAddress] = useState('')
  
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => {
    // console.log('LIST OF PRODUCTS', products)
    // console.log('MAP', products && products.map((product) => ({
    //   label: product.productName,
    //   key: product._id
    // })))
    setShow(true)
  }

  const[productId, setProductId] = useState('')
  const[quantity, setQuantity] = useState('')
  const[unitPrice, setUnitPrice] = useState('')
  
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const customerList = useSelector(state => state.customerList)
  const { 
    loading: loadingCustomers, 
    error: errorCustomers, 
    customers 
  } = customerList
  
  const customerDetails = useSelector(state => state.customerDetails)
  const { customer } = customerDetails

  const cart = useSelector(state => state.cart)

  const quotationCreate = useSelector(state => state.quotationCreate)
  const { 
    loading: loadingCreate, 
    success: successCreate, 
    error: errorCreate, 
    quotation: createdQuotation,
  } = quotationCreate
      
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingFee = cart.itemsPrice > 10000 ? toPrice(0) : toPrice(100);
  cart.totalPrice = cart.itemsPrice + cart.shippingFee;        
      
  const dispatch = useDispatch()
    
  useEffect(() => {
    dispatch(listProducts())
    dispatch(listCustomers())
    if (successCreate) {
      dispatch({ type: QUOTATION_CREATE_RESET });
      history.push('/sales/quotations/');
    }
  }, [dispatch, history, successCreate])

  const createQuotationHandler = () => {
    console.log('save', )
    dispatch(
      createQuotation({
        customer: customerName,
        invoiceAddress: invoiceAddress,
        deliveryAddress: deliveryAddress,
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        shippingFee: cart.shippingFee,
        totalPrice: cart.totalPrice,
      })
    )
    // dispatch({ type: CART_EMPTY})
    // localStorage.removeItem('cartItems');
    console.log(cart.cartItems)
    console.log('create quotation')
  }
  
  const discardHandler = () => {
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
    history.push('/sales/quotations')
  }

  const removeFromCartHandler = (id) => {
    console.log('removed')
    dispatch(removeFromCart(id))
    console.log('cartItems', cart.cartItems)
  }

  const submitHandler = (e) => {
    dispatch(addToCart(productId, quantity))
    setProductId('')
    setQuantity('')
    setUnitPrice('')
    handleClose()
  }

  return (
    <div>
      <div>
        <Container>
          {loading && <Loader></Loader>}
          {error && <Message variant="danger">{errorCreate}</Message>}

          {errorCustomers && <Message variant="danger">{errorCustomers}</Message>}

          {loadingCreate && <Loader></Loader>}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}

          <h5 className='text-muted'>New Quotation</h5>
          <span>
          <Button variant='danger' className='btn btn-sm mr-2' onClick={createQuotationHandler}>Save</Button>
          <Button variant='danger' className='btn btn-sm mr-2' onClick={discardHandler}>Discard</Button>
          </span>
          
        </Container>
        <hr/>
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
              placeholder='Enter customer name'
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
              placeholder='Enter invoice address'
              value={invoiceAddress}
              onChange={(e) => {
                setInvoiceAddress(e.target.value) }}
              required
            />
            <datalist id="email">
              {
                customers && customers.map((customer) => (
                <option key={customer._id} value={customer.email}>
                  {customer.fullName}
                </option>
                ))
              }
            </datalist>
          </div>

          <div className='mb-3'>
            <label htmlFor='deliveryAddress'>Delivery Address</label>
            <br />
            <input 
              id='deliveryAddress'
              type="text" 
              list="address" 
              placeholder='Enter delivery address'
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
            <datalist id="address">
              {
                customers && customers.map((customer) => (
                <option key={customer._id} value={customer.address}>
                  {customer.fullName}
                </option>
                ))
              }
            </datalist>
          </div>
        </form>
      </FormContainer>

      <div>
        <Container className='pt-4'>
          <h6 className='text-dark'>Order Lines</h6>
          <Table striped bordered responsive className='table-lines'>
            <thead>
              <tr>
                <th></th>
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
                    <td>{cartItem.qty}</td>
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
          
          {/* may warning dito sa backdrop */}
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
              <>
                <Modal.Body>
                    {/* TO DO:
                      3. Fix cartItems >:(((  */}
                    <form id='modalForm'>
                      <div className='mb-3'>
                        <label htmlFor='productName'>Product Name</label>
                          <br />
                          <input 
                            id='productName'
                            type="text" 
                            list="products" 
                            placeholder='Enter product'
                            value={productId}
                            onChange={(e) => {
                              setProductId(e.target.value)
                              console.log('product idp',productId)
                            }}
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
      
                      {/* <Form.Group>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control 
                          type='email'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          />
                      </Form.Group> */}
      
                      <div className='mb-3'>
                        <label htmlFor="quantity">Quantity</label>
                        <br/>
                        <input
                          id="quantity"
                          type="text"
                          placeholder="Enter quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          required
                        ></input>
                      </div>
      
                      <div className='mb-3'>
                        <label htmlFor="unitPrice">Unit Price</label>
                        <input
                          id="unitPrice"
                          type="text"
                          placeholder="Enter unit price"
                          value={unitPrice}
                          onChange={(e) => setUnitPrice(Number(e.target.value))}
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
              </>
          </Modal>
        </Container>
      </div>
    </div>
  )
}
