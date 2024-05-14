import React, { useEffect, useState } from 'react'
import axiosClient from '../axiosClient';
import { Link, useParams } from 'react-router-dom';



export default function Receipt() {

  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    getSaleProduct();
  }, [])

  const getSaleProduct = () => {
    setLoading(true);

    axiosClient.get(`/cart/${id}/receipt`)
      .then(({ data }) => {
        setLoading(false);
        setMessage(data.message);
        setProducts(data.products);
      })
      .catch(() => {
        setLoading(false);
      });
  }


  return (
    <div className='card'>
      <div className="card-body">
        <div className="container-fluid">
        <Link className='btn btn-success mb-3' to={'/cart'}>Go Back</Link>

          <div className="row d-flex justify-content-center">
            {message && (
              <p>{message}</p>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>BarCode ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p, index) => (
                    <tr key={p.product_id}>
                      <td>{index + 1}</td>
                      <td>{p.barcode}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.quantity}</td>
                      <td>${p.price * p.quantity}</td>
                    </tr>

                  ))
                ) : (
                  (
                    <tr>
                      <td colSpan={7} className='text-center'>No Data</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="row d-flex justify-content-center">
            <div style={{ fontSize: '27px', fontWeight: 'bold' }} className="">
              Thank you for shopping !
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
