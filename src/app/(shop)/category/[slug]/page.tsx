import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'
import Brand from '@/models/brand'

import Contents from './components/contents'

const getProducts = async ({ slug }: { slug: string }) => {
   dbConnect()
   // const categoryId = await Category.findOne({
   //    slug: slug,
   // })
   //    .exec()
   //    .then((res) => res._id)

   const products = await Product.find({
      // category: categoryId,  // ! uncomment
   }).exec()

   const brands = await Brand.find({
      // category: categoryId  // ! uncomment
   }).exec()

   return { products, brands }
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
