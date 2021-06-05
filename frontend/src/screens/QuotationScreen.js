import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, ListGroup, Row, Col, Image } from 'react-bootstrap'
import { detailsQuotation } from '../actions/quotationActions'
import { deliverOrder } from '../actions/quotationActions'
import { payOrder } from '../actions/quotationActions'
import { ORDER_PAY_RESET } from '../constants/quotationConstants'
import { ORDER_DELIVER_RESET } from '../constants/quotationConstants'
import Message from '../components/MessageBox'
import Loader from '../components/LoadingBox'

export default function QuotationScreen({ match }) {
  const quoteId = match.params.id

  const quotationDetails = useSelector((state) => state.quotationDetails);
  const { quote, loading, error } = quotationDetails;
  
  const orderPay = useSelector(state => state.orderPay)
  const { 
    loading: loadingPay, 
    success: successPay, 
    error: errorPay,
  } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch()
  
  useEffect(() => {
    // dispatch(detailsQuotation(quoteId))
    if (
      !quote ||
      successPay ||
      successDeliver ||
      (quote && quote._id !== quoteId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsQuotation(quoteId));
    }
  }, [dispatch, quoteId, successPay, successDeliver, quote])

  const paymentHandler = () => {
    dispatch(payOrder(quoteId))
    // window.location.reload()
  }
  
  const deliverHandler = () => {
    dispatch(deliverOrder(quoteId))
    // window.location.reload()
  }

  return loading ? ( <Loader></Loader> ) 
    : error ? ( <Message variant="danger">{error}</Message> ) 
    : (
      <Container>
        <Link to='/sales/quotations/' className='btn btn-light mt-3'>
          Go Back
        </Link>
        {/* <div > */}
          <h3 className='text-center pb-3'>QUOTE DETAILS</h3>
          <Row className='d-flex align-items-start'>
              <Col>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Delivery</h4>
                    <p>
                      <strong>Name:</strong> {quote.customer} <br />
                      <strong>Shipping Address: </strong> {quote.deliveryAddress}
                    </p>
                    {quote.isDelivered ? (
                      <Message variant="success">
                        Delivered at {quote.deliveredAt}
                      </Message>
                    ) : (
                      <Message variant="danger">Not Delivered</Message>
                    )}
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                      <h4>Payment</h4>
                      
                      {quote.isPaid ? (
                        <Message variant="success">
                          Paid at {quote.paidAt}
                        </Message>
                      ) : (
                        <Message variant="danger">Not Paid</Message>
                      )}
                  </ListGroup.Item>
  
                  <ListGroup.Item>
                      <h4>Order Items</h4>
                      <ListGroup variant='flush'>
                        {quote.orderItems.map((item) => (
                          <ListGroup.Item key={item.product}>
                            <Row>
                              <Col className="min-30">
                                {item.productName}
                              </Col>
      
                              <div>
                                {item.qty} x PHP {item.price} = PHP {item.qty * item.price}
                              </div>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4>Order Summary</h4>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>Status: &nbsp;
                    {quote.isDelivered 
                    ? <div className='text-success'>Delivered</div> 
                    : quote.isPaid ? <div className='text-success'>Paid</div> 
                    : <div className='text-danger'>Pending</div>}
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <div>Items</div>
                      <div>PHP {quote.itemsPrice.toFixed(2)}</div>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <div>delivery</div>
                      <div>PHP {quote.shippingFee.toFixed(2)}</div>
                    </Row>
                  </ListGroup.Item>
                
                  <ListGroup.Item>
                    <Row>
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>PHP {quote.totalPrice.toFixed(2)}</strong>
                      </div>
                    </Row>
                  </ListGroup.Item>
    
                  {!quote.isPaid && (
                    <ListGroup.Item>
                      {loadingDeliver && <Loader></Loader>}
                      {errorDeliver && (
                        <Message variant="danger">{errorDeliver}</Message>
                      )}
                      <Button
                        type="button"
                        className="btn primary quote-actions"
                        onClick={paymentHandler}
                      >
                        Mark Order as Paid
                      </Button>
                    </ListGroup.Item>
                  )}

                  {quote.isPaid && !quote.isDelivered && (
                    <ListGroup.Item>
                      {loadingDeliver && <Loader></Loader>}
                      {errorDeliver && (
                        <Message variant="danger">{errorDeliver}</Message>
                      )}
                      <Button
                        type="button"
                        className="btn primary quote-actions"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
          </Row>
        {/* </div> */}
      </Container>
  )
}
