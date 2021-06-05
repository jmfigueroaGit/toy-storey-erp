import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import ChildComponent from '../components/ChildComponent'

export default function ParentComponent() {

    const [name, setName] = useState('')
    const [religion, setReligion] = useState('')

    const handleCallback = (Name, Religion) => {
        setName(Name)
        setReligion(Religion)
    }

    return (
        <div>
            <ChildComponent parentCallback={handleCallback} />
            <Form>
                <div>PARENT COMPONENT</div>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                        type="text"
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}
