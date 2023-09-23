'use client'

import ProductCards from '@/components/product/cards'
import { IProduct } from '@/models/product'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const ProductSwiper = ({ products }: { products: IProduct[] }) => {
   const [ref] = useKeenSlider<HTMLDivElement>({
      rtl: true,
      slides: {
         perView: 2.2,
      },
      breakpoints: {
         '(min-width: 640px)': {
            slides: {
               perView: 4.2,
               spacing: 5,
            },
         },
      },
   })

   return (
      <div ref={ref} className='keen-slider'>
         {products.map((product, idx) => {
            if (product.active) {
               return (
                  <div key={idx} className='keen-slider__slide py-3 px-2 !h-auto ltr rounded-xl'>
                     <ProductCards key={product._id} product={product} />
                  </div>
               )
            }
            return
         })}
      </div>
   )
}

export default ProductSwiper
