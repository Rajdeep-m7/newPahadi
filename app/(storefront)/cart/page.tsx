import CartPage from '@/components/CartPage'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <div className='mx-auto max-w-400'>
            <CartPage />
        </div>
        <Footer />
    </div>
  )
}

export default page