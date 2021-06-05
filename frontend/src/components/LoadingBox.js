import React from 'react';
import {Spinner } from 'react-bootstrap';

export default function LoadingBox(){
  return(
    <div className='text-center'>
      <Spinner
        className='spinner'
        animation='grow'
        role='status'
      >
      </Spinner>
      <Spinner
      className='spinner'
      animation='grow'
      >
      </Spinner>
      <Spinner
      className='spinner'
      animation='grow'
      >
      </Spinner>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}