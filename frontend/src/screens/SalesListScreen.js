import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Table, Button } from "react-bootstrap";

const ProductList = ({ history }) => {

  const [sales, setSales] = useState([]);
  const [sortType, setSortType] = useState("productName");
  const [order, setOrder] = useState("asc");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getSales = () => {
      axios
        .get("http://localhost:5000/api/sales")
        .then((response) => {
          setSales(response.data);
        })
        .catch((err) => {
          console.log("error");
        });
    };
    getSales();
  }, []);

  useEffect(() => {
    if (sales) sales.map((val) => setTotal((prev) => prev + val.totalPrice));
  }, [sales]);

  useEffect(() => {
    // initialize sort types
    const types = {
      createdAt: "createdAt",
    };
    const sortProperty = types[sortType];
    let sorted;

    // sort data array in order
    if (order === "asc") {
      sorted = [...sales].sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : -1
      );
    } else {
      sorted = [...sales].sort((a, b) =>
        a[sortProperty] < b[sortProperty] ? 1 : -1
      );
    }

    // update movies to sort and order type
    setSales(sorted);
  }, [sortType, order]);

  const arrangeOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  return (
    <main>
      <div className="text-center">
        <h3 className='mb-3'>Sales</h3>
      </div>
      <div className='d-flex justify-content-between'>
        <div></div>
        <h5 className='text-end'><b>Total Sales: Php {total}</b></h5>
      </div>
      <>
        <div className="table-container mt-3">
          <Table striped bordered responsive className="table-sm table-lines">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
  
                <th
                  onClick={() => {
                    setSortType("createdAt");
                    arrangeOrder();
                  }}
                >
                  DATE TIME
                </th>
  
                <th>TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sales.map((val) => {
                return (
                  <>
                    <tr>
                      <td>{val._id}</td>
  
                      <td>
                        <Moment format="MM-DD-YYYY hh:mm">{val.createdAt}</Moment>
                      </td>
                      <td>{val.totalPrice}</td>
                      <td>
                        <Button
                          onClick={() => history.push(`/sales/quotations/${val._id}`)}
                          >
                          View
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    </main>
  );
};

export default ProductList;
