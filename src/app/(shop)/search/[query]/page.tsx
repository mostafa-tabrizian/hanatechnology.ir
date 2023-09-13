import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'
import Brand from '@/models/brand'

import Contents from './components/contents'

const getProducts = async ({ query }: { query: string }) => {
   dbConnect()
   const products = await Product.find({ $text: { $search: query } }).exec()

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

export const generateMetadata = async ({ params }: { params: { query: string } }) => {
   return {
      title: decodeURI(params.query) + ' | حانا تکنولوژی',
   }
}

const Search = async ({ params: { query } }: { params: { query: string } }) => {
   query = decodeURI(query)
   const { products, brands } = await getProducts({ query })

   return (
      <div className='px-3 md:px-0 md:mx-auto max-w-screen-md space-y-8 my-6'>
         <h1 className='text-center font-bold'>{query}</h1>

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

export default Search
