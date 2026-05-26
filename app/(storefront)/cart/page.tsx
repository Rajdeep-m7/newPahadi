import CartPage from '@/components/CartPage'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <main className='main-shell'>
            <CartPage />
        </main>
        <Footer />
    </div>
  )
}

export default page
