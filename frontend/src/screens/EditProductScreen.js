import axios from "axios";
import React, { useState } from "react";
import { Button } from 'react-bootstrap'

const EditProduct = ({ product, editProduct, editCurrentState }) => {
  const [state, setState] = useState(false)
  const [form, setForm] = useState({
    productId: product ? product.productId : "",
    productName: product ? product.productName : "",
    category: product ? product.category : "",
    supplier: product ? product.supplier : "",
    price: product ? product.price : "",
    quantity: product ? product.quantity : "",
  });

  const discard = (e) => {
    e.target.reset()
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    if (editCurrentState) {
      console.log('edit product', editCurrentState)
    axios
      .post("http://localhost:5000/api/inventory/updateProduct", form)
      .then((response) => console.log(response.data));
    } else {
      console.log('add product')
      axios
      .post("http://localhost:5000/api/inventory/addProduct", form)
      .then((response) => console.log(response.data));
    }

    setState(false)
    editProduct(state)
    e.target.reset();
    window.location.reload();
  };

  return (
    <div className="row center">
      <form className="ml-3" onSubmit={handleSubmit}>
      
        <div className='pb-3'>
          <label htmlFor="productId" className="col-form-label">
            Product ID:
          </label>
          <input
            type="text"
            name="productId"
            value={form.productId}
            placeholder="Enter Product ID"
            className="text-line bb-white text-form-inner"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='pb-3'>
          <label htmlFor="productName" className="col-form-label">
            Product Name:
          </label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            placeholder="Enter Product Name"
            className="text-line bb-white text-form-inner"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='pb-3'>
          <label htmlFor="category" className="col-form-label">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            placeholder="Enter Category"
            className="text-line bb-white text-form-inner"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='pb-3'>
          <label htmlFor="supplier" className="col-form-label">
            Supplier:
          </label>
          <input
            type="text"
            name="supplier"
            value={form.supplier}
            placeholder="Enter Supplier"
            className="text-line bb-white text-form-inner"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='pb-3'>
          <label htmlFor="price" className="col-form-label">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={form.price}
            placeholder="Enter Price"
            className="text-line bb-white text-form-inner"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='pb-3'>
          <label htmlFor="Quantity" className="col-form-label">
            Quantity:
          </label>
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            placeholder="Enter Quantity"
            className="text-line bb-white text-form-inner"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='d-flex justify-content-end p-3'>
          {/* <Button className="secondary" onClick={discard}>
            Discard
          </Button> */}
          <Button className="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
