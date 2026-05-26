import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Registration from '@/components/Registration'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <main className='main-shell'>
            <Registration />
        </main>
        <Footer />
    </div>
  )
}

export default page
