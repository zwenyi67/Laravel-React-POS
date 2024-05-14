import React, { useEffect, useState } from 'react'
import axiosClient from '../axiosClient';
import { Link, useParams } from 'react-router-dom';



export default function Receipt() {

  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({});
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
        setSale(data.sales);
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
            <div className='col-lg-6'>
            <div style={{ fontSize: '30px', fontWeight: 'bold' }} className='text-center mb-2'>Point of Sales Minimarket</div>
            <div style={{ fontSize: '20px' }} className='text-center mb-2'>Tel : 09884224557 </div>

            <table className="table">
              <thead>
                <tr>
                  <td>Date</td>
                  <td>{sale.date}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ border: 'none' }}>Order No</td>
                  <td style={{ border: 'none' }}>{sale.id}</td>
                  <td style={{ border: 'none' }}></td>
                  <td style={{ border: 'none' }}></td>
                </tr>
                <tr>
                  <th>QTY</th>
                  <th>Itme Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
                </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((p, index) => (
                    <tr key={p.product_id}>
                      <td style={{ border: 'none' }}>{p.quantity }</td>
                      <td style={{ border: 'none' }}>{p.name}</td>
                      <td style={{ border: 'none' }}>${p.price}</td>
                      <td style={{ border: 'none' }}>${p.price * p.quantity}</td>
                    </tr>

                  ))
                ) : (
                  (
                    <tr>
                      <td colSpan={7} className='text-center'>No Data</td>
                    </tr>
                  )
                )}
                <tr>
                  <td>Total Amount : </td>
                  <td>${sale.total}</td>
                  <td>Payment Type : </td>
                  <td>{sale.type ===1 ? 'Cash' : 'Mobile Banking' }</td>
                </tr>
                <tr>
                  <td>Paid Amount : </td>
                  <td>${sale.paid}</td>
                  <td>Change : </td>
                  <td>${sale.paid - sale.total}</td>
                </tr>
              </tbody>
            </table>
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            <div style={{ fontSize: '27px', fontWeight: 'bold' }} className="">
              Thanks for shopping with us!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
