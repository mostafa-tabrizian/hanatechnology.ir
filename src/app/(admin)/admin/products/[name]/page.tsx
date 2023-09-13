import Link from 'next/link'

import PriceDiscountQtyEdit from './priceDiscountQtyEdit'
import PublicEdit from './publicEdit'
import NameDescription from './nameAndDescription'

import dbConnect from '@/lib/dbConnect'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Product, { IProduct } from '@/models/product'
import Images from '@/components/product/images'

async function getProduct(name: string) {
   await dbConnect()
   return await Product.findOne({
      name: decodeURI(name),
   }).exec()
}

export const metadata = {
   title: 'حانا تکنولوژی | ادمین | محصول',
}

const ProductPage = async ({ params }: { params: { name: string } }) => {
   const product = await getProduct(params.name)
   return <div className='mx-6 my-16 relative'>{pageContent(product)}</div>
}

export default ProductPage

const pageContent = (product: IProduct) => {
   return (
      <div className='mx-6 md:mx-auto max-w-screen-md space-y-10 my-16'>
         {product ? (
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
                  <h5 className='font-semibold'>{product.name}</h5>
               </Breadcrumbs>

               <div className='max-w-md mx-auto'>
                  <Link href='/admin/courses/add'>
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

                  <Images
                     params={{
                        isAdmin: true,
                        thumbnail: product.thumbnail,
                        name: product.name,
                        images: product.images,
                     }}
                  />

                  <div className='my-5 space-y-6'>
                     <PublicEdit
                        params={JSON.parse(
                           JSON.stringify({
                              _id: product._id,
                              publicParam: product.public,
                           }),
                        )}
                     />

                     <NameDescription
                        params={JSON.parse(
                           JSON.stringify({
                              _id: product._id,
                              name: product.name,
                              description: product.description,
                           }),
                        )}
                     />

                     <PriceDiscountQtyEdit
                        params={JSON.parse(
                           JSON.stringify({
                              _id: product._id,
                              price: product.price,
                              discount: product.discount,
                           }),
                        )}
                     />
                  </div>
               </div>
            </>
         ) : (
            <h1>آیتم پیدا نشد!</h1>
         )}
      </div>
   )
}
