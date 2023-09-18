import Image from 'next/legacy/image'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'
import Product, { IProduct } from '@/models/product'
import Model from '@/models/model'
import Brand from '@/models/brand'

import Contents from './components/contents'
import dehyphen from '@/lib/dehyphen'

const getProducts = async ({ query }: { query: string }) => {
   dbConnect()

   query = dehyphen(query)

   const queryRegex = { $regex: new RegExp('^' + query + '$', 'i') }

   const categoryId: string | null = await Category.findOne({
      $or: [{ slug: queryRegex }, { name: queryRegex }],
   })
      .exec()
      .then((res) => res?._id)

   const modelId: string | null = await Model.findOne({
      $or: [{ slug: queryRegex }, { name: queryRegex }],
   })
      .exec()
      .then((res) => res?._id)

   const brandId: string | null = await Brand.findOne({
      $or: [{ slug: queryRegex }, { name: queryRegex }],
   })
      .exec()
      .then((res) => res?._id)

   const productsByNameSlugDescription = await Product.find({ $text: { $search: query } }).exec()
   const productsByCategoryModelBrand = await Product.find({
      $or: [{ category: categoryId }, { model: modelId }, { brand: brandId }],
   }).exec()

   const mergedProducts: IProduct[] = [
      ...productsByNameSlugDescription,
      ...productsByCategoryModelBrand,
   ]

   const uniqueMergedProducts: IProduct[] = mergedProducts.reduce(
      (accumulator: IProduct[], product) => {
         const existingProduct = accumulator.find(
            (p) => p._id.toString() === product._id.toString(),
         )

         if (!existingProduct) {
            accumulator.push(product)
         }

         return accumulator
      },
      [],
   )

   if (!uniqueMergedProducts.length) return { uniqueMergedProducts: [], brands: [], models: [] }

   const productBrands: string[] = []

   uniqueMergedProducts.map((product) => {
      if (!product.public) return

      const brand = product.brand.toString()
      if (!productBrands.includes(brand)) {
         productBrands.push(brand)
      }
   })

   const productModels: string[] = []

   uniqueMergedProducts.map((product) => {
      if (!product.public) return

      const model = product.model.toString()
      if (!productModels.includes(model)) {
         productModels.push(model)
      }
   })

   const brands = await Brand.find({
      _id: { $in: productBrands },
   }).exec()

   const models = await Model.find({
      _id: { $in: productModels },
   }).exec()

   return { uniqueMergedProducts, brands, models }
}

export const generateMetadata = async ({ params }: { params: { query: string } }) => {
   return {
      title: dehyphen(decodeURI(params.query)) + ' | حانا تکنولوژی',
   }
}

const Search = async ({ params: { query } }: { params: { query: string } }) => {
   query = dehyphen(decodeURI(query))
   const { uniqueMergedProducts, brands, models } = await getProducts({ query })

   return (
      <div className='px-3 md:px-0 md:mx-auto max-w-screen-md space-y-8 my-6'>
         <h1 className='text-center font-bold'>{query}</h1>

         <div className='mb-20 text-center space-y-6'>
            {uniqueMergedProducts.length ? (
               <Contents
                  params={JSON.parse(
                     JSON.stringify({
                        dbProducts: uniqueMergedProducts,
                        brands: brands,
                        models: models,
                     }),
                  )}
               />
            ) : (
               <div>
                  <span className='font-semibold text-xl'>!هیچ محصولی یافت نشد</span>
                  <span className='text-sm block'>عبارت دیگری را امتحان کنید</span>
                  <div className='w-3/4 mx-auto aspect-square relative'>
                     <Image
                        src='/noSearchResult.jpg'
                        alt='no search result'
                        layout='fill'
                        objectFit='contain'
                        loading='lazy'
                     />
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Search
