import { IProduct } from '@/models/product'

import ProductSwiper from '@/components/product/swiper'

const ProductSuggestion = ({ products }: { products: IProduct[] }) => {
   return (
      <div className='bg-white shadow text-right shadow-slate-200 rounded-lg mt-6 px-3 p-5 space-y-5'>
         <span className='yekanExtraBold text-xl'>محصولات مشابه</span>
         {products.length ? (
            <ProductSwiper products={JSON.parse(JSON.stringify(products))} />
         ) : (
            <span className='block mt-1 text-center yekan1'>
               هیچ محصول مشابهی موجود نمی‌باشد
            </span>
         )}
      </div>
   )
}

export default ProductSuggestion
