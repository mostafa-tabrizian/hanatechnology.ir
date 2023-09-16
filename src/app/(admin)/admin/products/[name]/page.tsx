import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Product from '@/models/product'
import Category from '@/models/category'
import Brand from '@/models/brand'
import Model from '@/models/model'
import DetailProduct from '../components/detailForm'

async function getProduct(name: string) {
   await dbConnect()
   return await Product.findOne({
      name: decodeURI(name),
   })
      .populate('category')
      .populate('brand')
      .populate('model')
      .exec()
}

async function getCategories() {
   await dbConnect()
   return await Category.find()
}

async function getBrands() {
   await dbConnect()
   return await Brand.find()
}

async function getModels() {
   await dbConnect()
   return await Model.find()
}

export const metadata = {
   title: 'حانا تکنولوژی | ادمین | محصول',
}

const ProductPage = async ({ params }: { params: { name: string } }) => {
   const addingNewProduct = params.name == 'new'
   const product = await getProduct(params.name)
   const categories = await getCategories()
   const brands = await getBrands()
   const models = await getModels()

   return (
      <div className='mx-6 my-16 relative'>
         <div className='mx-6 md:mx-auto max-w-screen-xl space-y-10 my-16'>
            {product || addingNewProduct ? (
               <>
                  <Breadcrumbs aria-label='breadcrumb'>
                     <Link className='text-gray-400' href='/'>
                        فروشگاه
                     </Link>
                     <Link className='text-gray-400' href='/admin'>
                        ادمین
                     </Link>
                     <Link className='text-gray-400' href='/admin/products'>
                        محصولات
                     </Link>
                     <h5 className='font-semibold rtl'>
                        {addingNewProduct ? 'افزودن محصول جدید' : product.name}
                     </h5>
                  </Breadcrumbs>

                  <div className='max-w-xl mx-auto'>
                     <Link href='/admin/products/new'>
                        <button className='bg-white z-10 border-2 border-blue-500 rounded-full p-3 fixed bottom-10 right-5'>
                           <svg
                              className='h-6 w-6 text-blue-500'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M12 4v16m8-8H4'
                              />
                           </svg>
                        </button>
                     </Link>

                     <DetailProduct
                        params={JSON.parse(
                           JSON.stringify({
                              addingNewProduct,
                              product,
                              categories,
                              brands,
                              models,
                           }),
                        )}
                     />
                  </div>
               </>
            ) : (
               <h1>آیتم پیدا نشد!</h1>
            )}
         </div>
      </div>
   )
}

export default ProductPage
