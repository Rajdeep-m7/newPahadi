import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <div className='max-w-400 mx-auto '>
            <ProductPage />
        </div>
        <Footer />
    </div>
  )
}

export default page