import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function Categories() {

  const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);



    const deleteButton = (category) => {
        if(!window.confirm('Are you sure you want to delete this category ?')) {
            return
        }
        axiosClient.delete(`/categories/${category.id}/delete`)
        .then(() => {
            getCategories();
        })
    }

    useEffect(() => {
      getCategories();
    }, []);

    const getCategories = () => {
      setLoading(true);
      axiosClient.get('/categories')
      .then(({data}) => {
         setCategories(data.data);
         setLoading(false);
      })
      .catch(() => {
        setLoading(false);
    });
    }

    var count = 1;

  return (
    <div>
        <div className="card">
            <div className="card-header d-flex">
                <h3 className="card-title mr-auto pt-2" >Categories</h3>
                <Link className='btn btn-info' to={'/categories/create'}>Add New Category</Link>
            </div>

            <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Category</th>
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
                                {categories.length > 0 ? (
                                    categories.map((c) => (
                                        <tr key={c.id}>
                                            <td>{count++}</td>
                                            <td>{c.name}</td>
                                            <td className='d-flex'>
                                                <Link to={`/categories/${c.id}/edit`} className='btn btn-success px-4 mr-4'>Edit</Link>
                                                <button className='btn btn-danger px-3' onClick={() => deleteButton(c)}>Delete</button>
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
    </div>
  )
}
