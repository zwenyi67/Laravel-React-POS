import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);

        axiosClient.get('/products')
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteButton = (product)=> {
       if(!window.confirm('Are you sure you want to delete this product?')) {
        return
       }
       axiosClient.delete(`products/${product.id}/delete`)
       .then(()=> {
        getProducts();
       })
    }

    var count = 1;


    return (
        <div className="card">
            <div className="card-header d-flex">
                <h3 className="card-title mr-auto pt-2" >Products</h3>
                <Link className='btn btn-info' to={'/products/create'}>Add New Product</Link>
            </div>

            <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>BarCode ID</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading &&
                            <tr>
                                <td colSpan={6} className='text-center'> Loading ...</td>
                            </tr>
                        }

                        {!loading && (
                            <>
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <tr key={p.id}>
                                            <td>{count++}</td>
                                            <td>{p.barcode}</td>
                                            <td>
                                                <img
                                                 src={`http://localhost:8000/uploads/${p.image}`} alt={p.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                                {p.name}
                                            </td>
                                            <td>{p.price}</td>
                                            <td>{p.stock}</td>
                                            <td className='d-flex' style={{  }}>
                                                <Link to={`/products/${p.id}/edit`} className='btn btn-success px-4 mr-4'>Edit</Link>
                                                <button className='btn btn-danger px-3' onClick={() => deleteButton(p)}>Delete</button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className='text-center'>No Data</td>
                                    </tr>
                                )}
                            </>
                        )}

                    </tbody>
                </table>
            </div>
        </div>

    )
}
