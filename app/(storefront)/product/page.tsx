import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'
import { getProducts, getVariantBySlug } from '@/lib/services/product'
import React from 'react'

const page = async () => {
  const products = await getProducts({ limit: 1 })
  const product = products[0] || null
  const variant = product?.slug ? await getVariantBySlug(product.slug) : null

  return (
    <div>
        <Header />
        <main className='main-shell'>
            <ProductPage product={product} variant={variant} />
        </main>
        <Footer />
    </div>
  )
}

export default page
