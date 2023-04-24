import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop'
import Orders from './components/Orders/Orders'
import Inventory from './components/Inventory/Inventory'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layout/Main'
import { productsCartsLoader } from './loaders/productsCartsLoader'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        { path: '/', element: <Shop></Shop> },
        { path: '/login', element: <Signin></Signin> },
        { path: '/register', element: <Signup></Signup> },
        { path: '/shop', element: <Shop></Shop> },
        {
          path: 'orders',
          loader: productsCartsLoader,

          element: <Orders></Orders>
        },
      ]
    },

    { path: 'inventory', element: <Inventory></Inventory> },
    { path: '*', element: <div>This route not found: 404</div> }
  ])

  return (
    <div >

      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
