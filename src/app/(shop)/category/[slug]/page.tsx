import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'
import Product from '@/models/product'
import Brand from '@/models/brand'

import Contents from './components/contents'
import dehyphen from '@/lib/dehyphen'

const getProducts = async ({ slug }: { slug: string }) => {
   dbConnect()

   const categoryId = await Category.findOne({
      slug: dehyphen(slug),
   })
      .exec()
      .then((res) => res._id)

   const products = await Product.find({
      category: categoryId,
   }).exec()

   const productBrands: string[] = []

   products.map((product) => {
      const brand = product.brand.toString()
      if (!productBrands.includes(brand)) {
         productBrands.push(brand)
      }
   })

   const brands = await Brand.find({
      _id: { $in: productBrands },
   }).exec()

   return { products, brands }
}

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
   const categoryName = await Category.findOne({
      slug: dehyphen(params.slug),
   })
      .exec()
      .then((res) => res?.name)

   return {
      title: (categoryName || 'دسته یافت نشد!') + ' | حانا تکنولوژی',
   }
}

const CoursesPage = async ({ params }: { params: { slug: string } }) => {
   const { products, brands } = await getProducts({ slug: params.slug })

   return (
      <div className='px-3 md:px-0 md:mx-auto max-w-screen-md space-y-8 my-6'>
         <div className='mb-20 text-center space-y-6'>
            <Contents
               params={JSON.parse(
                  JSON.stringify({
                     dbProducts: products,
                     brands: brands,
                  }),
               )}
            />
         </div>
      </div>
   )
}

export default CoursesPage
