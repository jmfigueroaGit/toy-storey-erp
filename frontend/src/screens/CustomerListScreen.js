import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { listCustomers, createCustomer } from '../actions/userActions.js'
import Loader from '../components/LoadingBox'
import Message from '../components/MessageBox'

// To Do:
// Delete/Edit button and functionality
// Automatically adds newly created customer after submit button (ayoko ng refresh pa!)

function CustomerListScreen() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const[fullName, setFullName] = useState('')
  const[email, setEmail] = useState('')
  const[address, setAddress] = useState('')
  const[contact, setContact] = useState('')

  const dispatch = useDispatch()
  const customerList = useSelector(state => state.customerList)
  const { error, loading, customers } = customerList
  const customerCreate = useSelector(state => state.customerCreate)
  const {success, customer } = customerCreate

  const submitHandler = () => {
    dispatch(createCustomer(fullName, email, address, contact))
    handleClose()
    dispatch(listCustomers())
  }
  
  useEffect(() => {
    dispatch(listCustomers())
   }, [dispatch])

  return (
    <>
      <span className='d-flex justify-content-between'>
        <h4>Customers</h4>
        <Link className='text-decoration-none text-info' onClick={handleShow}>
          + Add new customers
        </Link>
      </span>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
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
            <tr>
              <td className='p-2 m-1'>
                <Link variant='danger'>
                <i className="fas fa-trash customer-actions"/>
                </Link>
                <Link variant='danger '>
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
          <Modal.Title>New Customer</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type='text'
                placeholder='Enter Full Name'
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type='email'
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Contact Number'
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CustomerListScreen
