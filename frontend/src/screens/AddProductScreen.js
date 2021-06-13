import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [form, setForm] = useState({
    productId: "",
    productName: "",
    category: "",
    supplier: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/inventory/addProduct", form)
      .then((response) => console.log(response.data));

    e.target.reset();
  };

  return (
    <div className="row center">
      <div className="form-container bg-custom text-white pd-6">
        <form className="form mg-0a" onSubmit={handleSubmit}>
          <div>
            <h1 className="fz-lg">Add New Product</h1>
          </div>
          <div>
            <label htmlFor="productId" className="col-form-label">
              Product ID:
            </label>
            <input
              type="text"
              name="productId"
              placeholder="Enter Product ID"
              className="text-line bb-white text-form-inner"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="productName" className="col-form-label">
              Product Name:
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              className="text-line bb-white text-form-inner"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="category" className="col-form-label">
              Category:
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              className="text-line bb-white text-form-inner"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="supplier" className="col-form-label">
              Supplier:
            </label>
            <input
              type="text"
              name="supplier"
              placeholder="Enter Supplier"
              className="text-line bb-white text-form-inner"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="price" className="col-form-label">
              Price:
            </label>
            <input
              type="text"
              name="price"
              placeholder="Enter Price"
              className="text-line bb-white text-form-inner"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="Quantity" className="col-form-label">
              Quantity:
            </label>
            <input
              type="text"
              name="quantity"
              placeholder="Enter Quantity"
              className="text-line bb-white text-form-inner"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <button className="primary" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
