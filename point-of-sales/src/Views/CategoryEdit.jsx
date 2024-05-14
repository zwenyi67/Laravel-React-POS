import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function CategoryEdit() {

    const {id} = useParams();
    const [category, setCategory] = useState({
        id: null,
        name: '',
    });
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);

    if(id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/categories/${id}/edit`)
            .then(({data})=> {
                setCategory(data.data);
                setLoading(false);
            })
        }, [])
    }

    const CategoryUpdate = (e) => {
        e.preventDefault();

        axiosClient.put(`/categories/${id}/edit`, category)
        .then((response) => {
            setMessage(response.data.message);
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
                <Link className='btn btn-info mr-3' to={'/categories'}>Back</Link>
                <h3 className="card-title pt-2">Edit</h3>
                {message && <p>{message}</p>}
            </div>
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row">
                        <form onSubmit={CategoryUpdate} className="col-lg-6">
                            <div className="mb-3">
                                <label className='form-label'>Name</label>
                                <input value={category.name} onChange={(e) => setCategory({...category, name: e.target.value}) }  type="text" className='form-control' />
                            </div>
                            <div className="mb-4">
                                <button className='btn btn-info px-4'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}
