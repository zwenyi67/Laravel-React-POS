import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function Cart() {
    const barcodeRef = useRef();
    const quantityRef = useRef();
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState();
    const defaultValue = 1;
    const navigate = useNavigate();


    const addToCart = (e) => {
        e.preventDefault();

        const payload = {
            barcode: barcodeRef.current.value,
            quantity: quantityRef.current.value,
        } 

        const barcode = barcodeRef.current.value.trim();
        if (!barcode) return;

        const quantity = quantityRef.current.value.trim();
        if (!quantity) return;

        const existingProductIndex = products.findIndex(p => p.barcode === barcode);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex].quantity = parseInt(updatedProducts[existingProductIndex].quantity) + parseInt(quantity);
            setProducts(updatedProducts);
        } else {
            axiosClient.post('/cart/add', payload)
                .then(({ data }) => {
                    //quantity: 1
                    setProducts([...products, { ...data.product }]);
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });
        }

        barcodeRef.current.value = '';
        quantityRef.current.value = 1;

    };

    const deleteButton = (product) => {
        const existProduct = products.findIndex(p => p.barcode === product.barcode);
        if (existProduct === -1) {
            console.error('there is no product');
        } else {
            const updatedProducts = [...products];
            updatedProducts.splice(existProduct, 1);
            setProducts(updatedProducts);
        }
    };

    var total = [];

    const CartConfirm = (e) => {
        e.preventDefault();
        
        axiosClient.post('/cart/confirm', products)
        .then(({data}) => {
            setMessage(data.message);
            //console.log(data.id);
            navigate(`/cart/${data.id}/receipt`);
        })
        .catch(error => {
            console.error('Error confirming cart:', error);
        });
    }

    return (
        <div className='card'>
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row">
                        <form onSubmit={addToCart} className="col-lg-6">
                            <div className='input-group'>
                                <div>
                                    <label className='form-label'>Type here for barcode</label>
                                    <input ref={barcodeRef} type="text" className='form-control' />
                                </div>
                                <div style={{ maxWidth: '100px' }}>
                                    <label className='form-label'>Quantity</label>
                                    <input ref={quantityRef} type="text" defaultValue={defaultValue} className='form-control' />
                                </div>
                                <div >
                                    <label className='form-label'>-</label>
                                <button type="submit" className='form-control btn btn-info'>Add to cart</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <hr />
                    <div className="row">

                        <div className="col-lg-7">
                            {message && 
                            <p>{message}</p>}
                            
                            <table id="example2" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>.</th>
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
                                            <tr key={p.id}>
                                                <td className='d-flex'>
                                                    <button className='btn btn-danger px-3' onClick={() => deleteButton(p)}>X</button>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{p.barcode}</td>
                                                <td>{p.name}</td>
                                                <td>${p.price}</td>
                                                <td>{p.quantity}</td>
                                                <td>${p.price * p.quantity}</td>

                                            </tr>

                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className='text-center'>No Data</td>
                                        </tr>
                                    )}
                                    {products.length > 0 && (
                                        <>
                                        <tr>
                                            <td colSpan={6} className='text-center' style={{ fontWeight: 'bold' }}>Total Amount</td>
                                            <td colSpan={1} style={{ fontWeight: 'bold' }}>
                                                ${products.reduce((total, p) => total + (p.price * p.quantity), 0)}
                                            </td>
                                        </tr>
                                        <tr>
                                        <td colSpan={7} className='text-right'> 
                                        <form onSubmit={CartConfirm}>
                                            <button className='btn btn-success'>Confirm the order</button>
                                        </form>
                                        </td>
                                        </tr>
                                        </>
                                        )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
