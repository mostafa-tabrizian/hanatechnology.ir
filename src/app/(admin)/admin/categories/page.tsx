import Link from 'next/link'

import CategoryNewInput from './create'
import DeleteButton from './delete'
import NameAndSlug from './nameAndSlug'

import Category from '@/models/category'
import Product from '@/models/product'

import Breadcrumbs from '@mui/material/Breadcrumbs'

import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

export const metadata = {
   title: '‌حانا تکنولوژی | پنل ادمین | دسته بندی ها',
}

const getCategories = async () => {
   dbConnect()
   return await Category.find()
}

const getBrandProductsCount = async () => {
   const categoriesProductCount: { [key: string]: number } = {}

   dbConnect()
   const products = await Product.find()

   products.map((product) => {
      const brandId = product.category
      if (categoriesProductCount[brandId]) {
         categoriesProductCount[brandId] += 1
      } else {
         categoriesProductCount[brandId] = 1
      }
   })

   return categoriesProductCount
}

const AdminCategories = async () => {
   const categories = await getCategories()
   const categoriesProductCount = await getBrandProductsCount()

   return (
      <div className='mx-6 md:mx-auto my-16 max-w-screen-md space-y-10'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  فروشگاه
               </Link>
               <Link className='text-gray-400' href='/admin'>
                  ادمین
               </Link>
               <h5 className='fondnt-semibold'>دسته بندی ها</h5>
            </Breadcrumbs>

            <CategoryNewInput />

            <div className='rtl'>
               <div className='bg-white grid grid-cols-6 mb-3 justify-between rounded-lg p-5 py-2 text-center items-center'>
                  <div className='grid grid-cols-2 col-span-4'>
                     <p className='flex'>نام</p>
                     <p className='flex'>اسلاگ</p>
                  </div>
                  <p className='col-span-1'>محصولات</p>
               </div>

               <div className='space-y-3'>
                  {categories.length ? (
                     categories.map((category) => {
                        const productsLength = categoriesProductCount[category._id] | 0
                        return (
                           <div
                              key={category._id}
                              className='bg-white grid grid-cols-6 justify-between rounded-lg p-2 text-center items-center'
                           >
                              <NameAndSlug params={JSON.parse(JSON.stringify({ ...category }))} />
                              <Link href={`/search/${hyphen(category.slug)}`}>
                                 <p>{productsLength}</p>
                              </Link>
                              <DeleteButton
                                 params={JSON.parse(
                                    JSON.stringify({
                                       _id: category._id,
                                       ableToDelete: productsLength ? false : true,
                                    }),
                                 )}
                              />
                           </div>
                        )
                     })
                  ) : (
                     <h3 className='text-center'>هیچ دسته بندی ثبت نشده است</h3>
                  )}
               </div>
            </div>
         </>
      </div>
   )
}

export default AdminCategories
