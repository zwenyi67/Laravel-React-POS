import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function ProductCreate() {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [categories, setCategories] = useState([]);

    const barcodeRef = useRef();
    const nameRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const imageRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
       // setLoading(true);

        axiosClient.get(`/products/create`)
            .then(({ data }) => {
                setCategories(data.data);
            })
    }, []);

    const ProductCreate = (e) => {

        e.preventDefault();

        const product = {
            barcode: barcodeRef.current.value,
            name: nameRef.current.value,
            category_id: categoryRef.current.value,
            price: priceRef.current.value,
            stock: stockRef.current.value,
            image: imageRef.current.files[0],
            description: descriptionRef.current.value,
        }
        axiosClient.post('/products/create', product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                navigate('/products');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    setMessage('Error creating product');
                }
            })
    }

    return (
        <div className='card'>
            <div className="card-header d-flex">
                <Link className='btn btn-info mr-3' to={'/products'}>Back</Link>
                <h3 className="card-title pt-2">Add New Product</h3>
                {message && <p>{message}</p>}
            </div>
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row">
                        <form onSubmit={ProductCreate} className="col-lg-6">
                            <div className="mb-3">
                                <label className='form-label'>Barcode</label>
                                <input ref={barcodeRef} type="text" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Name</label>
                                <input ref={nameRef} type="text" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Category</label>
                                <select  ref={categoryRef} className='form-control'>
                                    <option value="0">Categories</option>
                                    {categories && (categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    )))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Price</label>
                                <input ref={priceRef} type="text" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Stock</label>
                                <input ref={stockRef} type="text" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Image</label>
                                <input ref={imageRef}  type="file" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Description</label>
                                <textarea ref={descriptionRef} style={{ minHeight: '8.5rem', maxHeight: '8.5rem', resize: 'none' }} className='form-control' ></textarea>
                            </div>
                            <div className="mb-4">
                                <button className='btn btn-info px-4'>ADD</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
