'use client'

import ProductCards from '@/components/product/cards'
import { IProduct } from '@/models/product'
import { useEffect } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const ProductSwiper = ({ products }: { products: IProduct[] }) => {
   useEffect(() => {
      new Swiper('.productSwiper', {
         slidesPerView: 2,
         spaceBetween: 10,
         freeMode: {
            enabled: true,
            sticky: true,
         },
      })
   }, [])

   return (
      <div className='productSwiper rtl overflow-hidden'>
         <div className='swiper-wrapper pb-3'>
            {products.map((product) => {
               return (
                  <div key={product._id} className='swiper-slide rounded-xl'>
                     <ProductCards key={product._id} product={product} />
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default ProductSwiper
