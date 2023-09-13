import { IProduct } from '@/models/product'

import ProductSwiper from '@/components/product/swiper'

const ProductSuggestion = ({ products }: { products: IProduct[] }) => {
   return (
      <div className='bg-white shadow text-right shadow-slate-200 rounded-lg mt-6 px-3 p-5 space-y-5'>
         <span className='yekanBlack text-xl'>محصولات مشابه</span>
         <ProductSwiper products={JSON.parse(JSON.stringify(products))} />
      </div>
   )
}

export default ProductSuggestion
