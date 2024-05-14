import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function DefaultLayout() {

    const { user, token, setUser, setToken } = useStateContext();
    const { pathname } = useLocation();

    const isActive = pathname.startsWith('/products');

    if (!token) {
        return <Navigate to={'/login'} />
    }

    const Logout = (e)=> {
        e.preventDefault();

        if(!window.confirm('Are You Sure you want to logout ?')) {
            return 
        }

        axiosClient.get('/logout')
        .then(() => {
            setUser(null);
            setToken(null);
        })
        .catch(err => {
            if (err.response) {
              if (err.response.status === 422) {
                console.log(err.response.data.errors);
              } else {
                console.error('Server error:', err.response.status);
              }
            } else {
              console.error('Network error:', err.message);
            }
          });
    }


    return (
        <>
            <div className="wrapper">
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                                <i className="fas fa-bars" />
                            </a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">
                                Contact
                            </a>
                        </li>
                    </ul>
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">
                        <li className='nav-item'>
                            <a onClick={Logout} title='logout' className='nav-link'>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="control-sidebar"
                                data-slide="true"
                                href="#"
                                role="button"
                            >
                                <i className="fas fa-th-large" />
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* /.navbar */}
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img
                            src="/src/dist/img/AdminLTELogo.png"
                            alt="AdminLTE Logo"
                            className="brand-image img-circle elevation-3"
                            style={{ opacity: ".8" }}
                        />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img
                                    src="/src/dist/img/user2-160x160.jpg"
                                    className="img-circle elevation-2"
                                    alt="User Image"
                                />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">
                                    Admin
                                </a>
                            </div>
                        </div>
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input
                                    className="form-control form-control-sidebar"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul
                                className="nav nav-pills nav-sidebar flex-column"
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false"
                            >
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-item menu-open">
                                    <Link to={'/'} className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/products'} className={`nav-link ${pathname.startsWith('/products') ? 'active' : ''}`}>
                                        <i className="nav-icon fas fa-th" />
                                        <p>
                                            Products
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/categories'} className={`nav-link ${pathname.startsWith('/categories') ? 'active' : ''}`}>
                                        <i className="nav-icon fas fa-th" />
                                        <p>
                                            Categories
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/cart'} className={`nav-link ${pathname.startsWith('/cart') ? 'active' : ''}`}>
                                        <i className="nav-icon fas fa-th" />
                                        <p>
                                            Cart
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Starter Page</h1>
                                </div>
                                
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                            <div className="col-12">
                                <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                    <div className="p-3">
                        <h5>Title</h5>
                        <p>Sidebar content</p>
                    </div>
                </aside>
                {/* /.control-sidebar */}
                {/* Main Footer */}
                <footer className="main-footer">
                    {/* To the right */}
                    <div className="float-right d-none d-sm-inline">Anything you want</div>
                    {/* Default to the left */}
                    <strong>
                        Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.
                    </strong>{" "}
                    All rights reserved.
                </footer>
            </div>
        </>

    )
}
