import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function ProductEdit() {

    const { id } = useParams();
    const [product, setProduct] = useState({
        id: null,
        barcode: '',
        name: '',
        category_id: '',
        price: '',
        stock: '',
        description: '',
        category: [],
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productCategory, setProductCategory] = useState('');
    const [productCategoryId, setProductCategoryId] = useState('');
    const imageRef = useRef();


    if (id) {
        useEffect(() => {
            setLoading(true);

            axiosClient.get(`/products/${id}/edit`)
                .then(({ data }) => {
                    setLoading(false);
                    setProduct(data.product);
                    setCategories(data.categories);
                    setProductCategory(data.product.category.name);
                    setProductCategoryId(data.product.category.id);
                    setImage(data.product.image);


                })
        }, []);
    }

    const productUpdate = (e) => {
        e.preventDefault();

        axiosClient.put(`/products/${id}/edit`, product)
            .then(({ data }) => {
                setMessage(data.message);
                setErrors(data.errors);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    setMessage('Error creating product');
                }
            })
    }

    const imageUpdate = (e) => {
        e.preventDefault();

        const ImagePayload = {
            image: imageRef.current.files[0],
        }
        console.log(ImagePayload);

        axiosClient.post(`/products/${id}/imageupdate`, ImagePayload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(({data}) => {
            setImage(data.image);
        })
    }

    return (
        <div className='card'>
            <div className="card-header d-flex">
                <Link className='btn btn-info mr-3' to={'/products'}>Back</Link>
                <h3 className="card-title pt-2">Edit</h3>
                {message && <p>{message}</p>}
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-5">
                            <form onSubmit={imageUpdate} className="mb-3">
                            <img src={`http://localhost:8000/uploads/${image}`} style={{ border: '1px solid', padding: '10px' }} className='mb-3' alt={product.name} />
                                <div className='input-group'>
                                <input ref={imageRef} type="file" className='form-control' />
                                <button className='btn btn-info'>Update</button>
                                </div>
                                {errors && errors['image'] && (<p className="text-danger text-sm">{errors['image']}</p>)}
                            </form>
                        </div>
                        <div className="col-lg-7">
                            <form onSubmit={productUpdate}>

                                <div className="mb-3">
                                    <label className='form-label'>Barcode</label>
                                    <input value={product.barcode} onChange={(ev) => setProduct({ ...product, barcode: ev.target.value })} type="text" className='form-control' />
                                    {errors && errors['barcode'] && (<p className="text-danger text-sm">{errors['barcode']}</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Name</label>
                                    <input value={product.name} onChange={(ev) => setProduct({ ...product, name: ev.target.value })} type="text" className='form-control' />
                                    {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Category</label>
                                    <select onChange={(ev) => setProduct({ ...product, category_id: ev.target.value })} className='form-control'>
                                        <option value={product.category_id}>{productCategory}</option>
                                        {categories && (categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        )))}
                                    </select>
                                    {errors && errors['category'] && (<p className="text-danger text-sm">{errors['category']}</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Price</label>
                                    <input value={product.price} onChange={(ev) => setProduct({ ...product, price: ev.target.value })} type="text" className='form-control' />
                                    {errors && errors['price'] && (<p className="text-danger text-sm">{errors['price']}</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Stock</label>
                                    <input value={product.stock} onChange={(ev) => setProduct({ ...product, stock: ev.target.value })} type="text" className='form-control' />
                                    {errors && errors['stock'] && (<p className="text-danger text-sm">{errors['stock']}</p>)}
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Description</label>
                                    <textarea value={product.description} onChange={(ev) => setProduct({ ...product, description: ev.target.value })} style={{ minHeight: '8.5rem', maxHeight: '8.5rem', resize: 'none' }} className='form-control' ></textarea>
                                    {errors && errors['description'] && (<p className="text-danger text-sm">{errors['description']}</p>)}
                                </div>
                                <div className="mb-4">
                                    <button className='btn btn-info px-4'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
