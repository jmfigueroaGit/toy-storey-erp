import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { 
  listCustomers, 
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../actions/userActions.js'
import { 
  CUSTOMER_CREATE_RESET, 
  CUSTOMER_DELETE_RESET,
  CUSTOMER_UPDATE_RESET,
} from '../constants/userConstants'
import {  } from '../constants/userConstants'
import Loader from '../components/LoadingBox'
import Message from '../components/MessageBox'

// To Do:
// Delete/Edit button and functionality
// Automatically adds newly created customer after submit button (ayoko ng refresh pa!)

function CustomerListScreen() {
  const [customerId, setCustomerId] = useState({})
  const [editCustomer, setEditCustomer] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setFullName('')
    setEmail('')
    setAddress('')
    setContact('')
    setShow(false)
    setEditCustomer(false)
  }
  const handleShow = () => setShow(true)

  const[fullName, setFullName] = useState('')
  const[email, setEmail] = useState('')
  const[address, setAddress] = useState('')
  const[contact, setContact] = useState('')

  const dispatch = useDispatch()

  const customerList = useSelector(state => state.customerList)
  const { 
    loading: loadingList, 
    error: errorLoadingList, 
    customers 
  } = customerList

  const customerCreate = useSelector(state => state.customerCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate, 
    customer: createdCustomer,
  } = customerCreate

  const customerUpdate = useSelector(state => state.customerUpdate)
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate 
  } = customerUpdate

  const customerDelete = useSelector(state => state.customerDelete)
  const { 
    error: errorDelete, 
    success: successDelete, 
  } = customerDelete

  useEffect(() => {
    if(successUpdate) {
      console.log('success update')
      dispatch({ type: CUSTOMER_UPDATE_RESET })
    }
    if(successDelete) {
      dispatch({ type: CUSTOMER_DELETE_RESET })
    }
    if(!createdCustomer || successCreate) {
      dispatch({ type: CUSTOMER_CREATE_RESET })
    }
    dispatch(listCustomers())
   }, [dispatch, successUpdate, successDelete, successCreate, createdCustomer])
  

  const deleteHandler = (customer) => {
    if (window.confirm(`Are you sure to delete ${customer.fullName}?`)) {
      dispatch(deleteCustomer(customer._id))
    }
  }

  const editHandler = (customer) => {
    setEditCustomer(true)
    handleShow()
    setCustomerId(customer._id)
    setFullName(customer.fullName)
    setEmail(customer.email)
    setAddress(customer.address)
    setContact(customer.contact)
  }
  
  const submitHandler = () => {
    if (editCustomer) {
      console.log('update')
      dispatch(updateCustomer({ _id: customerId, fullName, email, address, contact }))
    } else {
      dispatch(createCustomer(fullName, email, address, contact))
    }
    handleClose()
    // dispatch(listCustomers())
  }

  return (
    <main>
      <span className='d-flex justify-content-between'>
        <h4>Customers</h4>
        <Link className='text-decoration-none text-info' onClick={handleShow}>
          + Add new customers
        </Link>
      </span>

      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorUpdate && <Message varirant='danger'>{errorUpdate}</Message>}
      {loadingList ? <Loader/> : errorLoadingList
        ? <Message variant='danger'>{errorLoadingList}</Message>
  
        : (
        <Table striped responsive className='table-sm table-lines'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer._id}>
                <td className='p-2 m-1'>
                  <Link variant='danger' onClick={() => deleteHandler(customer)}>
                  <i className="fas fa-trash customer-actions"/>
                  </Link>
                  <Link variant='danger' onClick={() => editHandler(customer)}
                    
                    // history.push(`/sales/customerlist/${customer._id}`)}
                  >
                    <i className='fas fa-user-edit customer-actions'/>
                  </Link>
                </td>
                <td>{customer.fullName}</td>
                <td><a href={`mailto${customer.email}`}>{customer.email}</a></td>
                <td>{customer.address}</td>
                <td>{customer.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{editCustomer ? 'Update Customer Details' : 'New Customer'}</Modal.Title>
        </Modal.Header>
        
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter Full Name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Contact Number'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        {/* )} */}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default CustomerListScreen
