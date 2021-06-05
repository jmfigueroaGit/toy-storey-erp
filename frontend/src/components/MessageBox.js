import React from 'react';
import { Alert } from 'react-bootstrap';

export default function MessageBox({ variant, children  }) {
    return(
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

MessageBox.defaultProps = {
    variant: 'info',
}