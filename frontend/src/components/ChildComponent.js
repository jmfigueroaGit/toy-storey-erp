import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function ChildComponent({ parentCallback }) {
    const [name, setName] = useState('')
    const [religion, setReligion] = useState('')
    
    const onTrigger = (e) => {
        e.preventDefault();
        parentCallback(name, religion)
    }

    return (
        <div>
            <div>init state: {name}, </div>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Type name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Type religion'
                        onChange={(e) => setReligion(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={religion}
                        onChange={(e) => setReligion(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <Button onClick={onTrigger}>
                Submit
            </Button>
        </div>
    )
}
