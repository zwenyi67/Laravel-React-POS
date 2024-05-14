import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './Components/DefaultLayout'
import Login from './Views/Login';
import Register from './Views/Register';
import Contact from './Views/Contact';
import About from './Views/About';
import GuestLayout from './Components/GuestLayout';
import Products from './Views/Products';
import ProductCreate from './Views/ProductCreate';
import ProductEdit from './Views/ProductEdit';
import Categories from './Views/Categories';
import CategoryCreate from './Views/CategoryCreate';
import CategoryEdit from './Views/CategoryEdit';
import Cart from './Views/Cart';
import Receipt from './Views/Receipt';
import Sales from './Views/Sales';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/products/create',
                element: <ProductCreate />,
            },
            {
                path: '/products/:id/edit',
                element: <ProductEdit />,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/categories/create',
                element: <CategoryCreate />,
            },
            {
                path: '/categories/:id/edit',
                element: <CategoryEdit />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/sales/:id/receipt',
                element: <Receipt />,
            },
            {
                path: '/sales',
                element: <Sales/>,
            },
            {
                path: '/contact',
                element: <Contact />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },

])

export default router;
