import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/LoadingBox'
import Message from '../components/MessageBox'

export default function CustomerScreen({ match }) {
  const customerId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')

  const customerDetails = useSelector(state => state.customerDetails)
  const { loading, error, customer } = customerDetails

  const customerUpdate = useSelector(state => state.customerDetails)
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate 
  } = customerUpdate

  const dispatch = useDispatch()
  useEffect(() => {

  }, [])

  return (
    <div className='pt-5'>
      <FormContainer>
        <Form>
          <h3 className='text-center'>USER PROFILE</h3>
          {loading ? (
            <Loader />
            ) : error ? (
            <Message variant="danger">{error}</Message>
            ) : (
            <>
              {loadingUpdate && <Loader></Loader>}
              {errorUpdate && (
                <Message variant="danger">{errorUpdate}</Message>
              )}
              {successUpdate && (
                <Message variant="success">
                  Profile Updated Successfully
                </Message>
              )}
              <Form.Group controlId='name'>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='contact'>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact"
                  onChange={(e) => setContact(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Button className="primary" type="submit">
                Update
              </Button>
            </>
          )}
        </Form>
      </FormContainer>
    </div>
  )
}
