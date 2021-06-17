import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Container, Modal } from "react-bootstrap";
import EditProduct from "../screens/EditProductScreen.js";
import Moment from "react-moment";

const ProductList = () => {
  const history = useHistory();
  const [editProduct, setEditProduct] = useState(false)
  const [product, setProduct] = useState([]);
  const [sortType, setSortType] = useState("productName");
  const [order, setOrder] = useState("asc");
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProducts = () => {
      axios
        .get("http://localhost:5000/api/inventory/productlist")
        .then((response) => {
          setProduct(response.data);
        })
        .catch((err) => {
          console.log("error");
        });
    };
    getProducts();
  }, []);

  useEffect(() => {
    console.log('ue editProduct state', editProduct)
    // initialize sort types
    const types = {
      productId: "productId",
      productName: "productName",
      category: "category",
      supplier: "supplier",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      price: "price",
      quantity: "quantity",
    };
    const sortProperty = types[sortType];
    let sorted;

    // sort data array in order
    if (order === "asc") {
      sorted = [...product].sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : -1
      );
    } else {
      sorted = [...product].sort((a, b) =>
        a[sortProperty] < b[sortProperty] ? 1 : -1
      );
    }

    // update movies to sort and order type
    setProduct(sorted);
  }, [sortType, order]);

  const arrangeOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCallBack = (state) => {
    setEditProduct(state)
  }

  return (
    <main>
      <Container>
          <h2>List of Toys</h2>
          <span className='d-flex justify-content-between my-3'>
            <input
              className="prompt"
              type="text"
              placeholder="Search"
              onChange={handleSearch}
            />
            <Button
              variant='danger'
              onClick={() => setShow(true)}
            >
              Add New Product
            </Button>
          </span>
        {/* </div> */}
        <Table striped bordered responsive className="table-sm table-lines">
          <thead>
            <tr>
              <th
                onClick={() => {
                  setSortType("productId");
                  arrangeOrder();
                }}
              >
                PRODUCT ID
              </th>
              <th
                onClick={() => {
                  setSortType("productName");
                  arrangeOrder();
                }}
              >
                PRODUCT NAME
              </th>
              <th
                onClick={() => {
                  setSortType("category");
                  arrangeOrder();
                }}
              >
                CATEGORY
              </th>
              <th
                onClick={() => {
                  setSortType("supplier");
                  arrangeOrder();
                }}
              >
                SUPPLIER
              </th>
              <th
                onClick={() => {
                  setSortType("createdAt");
                  arrangeOrder();
                }}
              >
                DATE ADDED
              </th>
              <th
                onClick={() => {
                  setSortType("updatedAt");
                  arrangeOrder();
                }}
              >
                DATE UPDATED
              </th>
              <th
                onClick={() => {
                  setSortType("price");
                  arrangeOrder();
                }}
              >
                PRICE
              </th>
              <th
                onClick={() => {
                  setSortType("quantity");
                  arrangeOrder();
                }}
              >
                QUANTITY
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {product
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.productId.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.category.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.supplier.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.price.toString().includes(searchTerm.toString())
                ) {
                  return val;
                }
              })
              .map((val) => {
                return (
                  <>
                    <tr key={val._id}>
                      <td>{val.productId}</td>
                      <td>{val.productName}</td>
                      <td>{val.category}</td>
                      <td>{val.supplier}</td>
                      <td>
                        <Moment format="MM-DD-YYYY">{val.createdAt}</Moment>
                      </td>
                      <td>
                        <Moment format="MM-DD-YYYY">{val.updatedAt}</Moment>
                      </td>
                      <td>{val.price}</td>
                      <td>{val.quantity}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setShow(true);
                            setEditProduct(true);
                            setCurrentProduct(val);
                            console.log(currentProduct)
                          }}
                        >
                          <i className='fas fa-edit' />
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      </Container>
      <Modal 
        show={show} 
        onHide={() => {
          setShow(false)
          setEditProduct(false)
          setCurrentProduct()
        }} 
        backdrop="static" 
        keyboard={false} 
      >
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct product={currentProduct} editProduct={handleCallBack} editCurrentState={editProduct} />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default ProductList;
