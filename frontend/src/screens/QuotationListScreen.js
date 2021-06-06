import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { listQuotations } from '../actions/quotationActions'
import { deleteQuotation } from '../actions/quotationActions'
import Message from '../components/MessageBox'
import Loader from '../components/LoadingBox'
import { 
  QUOTATION_DELETE_RESET, 
} from '../constants/quotationConstants'

export default function QuotationListScreen({ location, history }) {
  const redirect = location.search ? location.search.split('=')[1] : '/'
  
  const quotationList = useSelector(state => state.quotationList)
  const { loading, error, quotations } = quotationList

  const quotationDelete = useSelector(state => state.quotationDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = quotationDelete

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: QUOTATION_DELETE_RESET });
    }
    dispatch(listQuotations())
  }, [dispatch, successDelete])

  const deleteHandler = (quotation) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteQuotation(quotation._id))
      console.log(quotation, 'deleted')
    }
  }

  const createQuotation = () => {
    history.push('/sales/create-quotation')
  }

  return (
    <>
      <span className='d-flex justify-content-between'>
        <h4>Quotations</h4>
        <Link className='text-decoration-none text-info' onClick={createQuotation}>
          + Create Quotation
        </Link>
      </span>

      {loadingDelete && <Loader></Loader>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
      : (
      <Table hover striped responsive className='table-sm table-lines'>
        <thead>
          <tr>
            <th></th>
            <th>Customer</th>
            <th>Invoice Address</th>
            <th>Delivery Address</th>
            {/* <th>No. of Items</th>
            <th>Quantity</th> */}
            <th>Items Price</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map(quote => (
            <tr key={quote._id}>
              <td className='p-2 m-1'>
                <Button
                  type="button"
                  className="btn-light btn-sm px-2"
                  onClick={() =>
                    history.push(`/sales/quotations/${quote._id}`)}
                >
                  <i className='fas fa-edit quote-actions' />
                </Button>
                <Button
                  type="button"
                  variant='danger'
                  className="btn-sm"
                  onClick={() => deleteHandler(quote)}
                >
                  <i className='fas fa-trash quote-actions' />
                </Button>
              </td>
              <td>{quote.customer}</td>
              <td>{quote.invoiceAddress}</td>
              <td>{quote.deliveryAddress}</td>
              {/* <td>{quote.orderItems.length}</td> */}
              {/* <td>{quote.orderItems.map(item => (
                {item.qty})
                )
              </td> */}
              <td>{quote.itemsPrice}</td>
              <td>{quote.totalPrice}</td>
              <td className='quotation-status'>
                {quote.isDelivered 
                  ? <div className='text-success'>Delivered</div> 
                  : quote.isPaid ? <div className='text-success'>Paid</div> 
                  : <div className='text-danger'>Pending</div>
                }
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
      )}
      
    </>
  )
}
