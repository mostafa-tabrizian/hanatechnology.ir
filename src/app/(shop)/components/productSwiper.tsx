'use client'

import ProductCards from '@/components/product/cards'
import { IProduct } from '@/models/product'
import { useEffect } from 'react'
// @ts-ignore
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const ProductSwiper = ({ products }: { products: IProduct[] }) => {
   useEffect(() => {
      new Swiper('.productSwiper', {
         slidesPerView: 2.2,
         breakpoints: {
            640: {
               slidesPerView: 4,
            },
         },
         spaceBetween: 5,
         freeMode: {
            enabled: true,
            sticky: true,
         },
      })
   }, [])

   return (
      <div className='productSwiper rtl relative overflow-hidden pl-6'>
         <div className='swiper-wrapper pb-4'>
            {products.map((product) => {
               return (
                  <div key={product._id} className='swiper-slide ltr rounded-xl mx-2'>
                     <ProductCards key={product._id} product={product} />
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default ProductSwiper
