import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
