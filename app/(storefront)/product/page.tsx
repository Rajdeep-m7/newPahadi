import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <main className='main-shell'>
            <ProductPage />
        </main>
        <Footer />
    </div>
  )
}

export default page
