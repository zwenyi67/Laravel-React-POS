import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function CategoryCreate() {

    const nameRef = useRef();
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const CategoryCreate = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
        }

        axiosClient.post('/categories/create', payload )
        .then(()=> {
            navigate('/categories');
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
                setMessage('Error creating category');
            }
        })

    }

  return (
    <div className='card'>
            <div className="card-header d-flex">
                <Link className='btn btn-info mr-3' to={'/categories'}>Back</Link>
                <h3 className="card-title pt-2">Add New Category</h3>
                {message && <p>{message}</p>}
            </div>
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row">
                        <form onSubmit={CategoryCreate} className="col-lg-6">
                            <div className="mb-3">
                                <label className='form-label'>Name</label>
                                <input ref={nameRef} type="text" className='form-control' />
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
