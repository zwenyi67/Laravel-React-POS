import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function Sales() {

    const [loading, setLoading] = useState(false);
    const [sales, setSales] = useState([]);
    var count = 1;

    useEffect(() => {
        getSales();
    },[]); 

    const getSales = () => {
        setLoading(true);
        axiosClient.get('/sales')
        .then(({data}) => {
            setSales(data.sales);
            setLoading(false);
        })
    }



  return (
    <div>
        <div className="card">
            <div className="card-header d-flex">
                <h3 className="card-title mr-auto pt-2" >Sales</h3>
                <Link className='btn btn-info' to={'/sales'}>Add New Sale</Link>
            </div>

            <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>S</th>
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
                                {sales.length > 0 ? (
                                    sales.map((s) => (
                                        <tr key={s.id}>
                                            <td>{count++}</td>
                                            <td>{s.name}</td>
                                            <td className='d-flex'>
                                                <Link to={`/sales/${s.id}/receipt`} className='btn btn-success px-4 mr-4'>View</Link>
                                                <button className='btn btn-danger px-3' onClick={() => deleteButton(s)}>Delete</button>
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
