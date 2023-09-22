import Image from 'next/legacy/image'

import Category from '@/models/category'
import Product, { IProduct } from '@/models/product'
import Model from '@/models/model'
import Brand from '@/models/brand'

import dbConnect from '@/lib/dbConnect'
import dehyphen from '@/lib/dehyphen'

import Contents from './components/contents'
import SearchTitle from './components/title'

import GTMViewItemList from './GTM/GTMViewItemList'
import GTMSearch from './GTM/GTMSearch'

const getProducts = async ({ query }: { query: string }) => {
   query = dehyphen(query)

   const queryRegex = { $regex: new RegExp('^' + query + '$', 'i') }

   dbConnect()

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
      if (!product.active) return

      const brand = product.brand.toString()
      if (!productBrands.includes(brand)) {
         productBrands.push(brand)
      }
   })

   const productModels: string[] = []

   uniqueMergedProducts.map((product) => {
      if (!product.active) return

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
      description:
         'ما در حانا به حفاظت از شما و محیط‌هایتان متعهدیم. با ارائه ابزارهای پیشرفته دوربین مداربسته، سیستم‌های اعلام حریق، دزدگیرهای امنیتی و تجهیزات شبکه، ما به شما امکان می‌دهیم تا نظارت، امنیت، و ارتباطات خود را به سطح جدیدی برسانید. ما در تلاشیم تا با ارائه راه‌حل‌هایی نوآورانه و اطمینان‌بخش، زندگی و کسب و کار شما را تقویت کنیم. به ما بپیوندید و با ما در جهت ساختن یک آینده امن‌تر و بهتر همکاری کنید. ',
      alternates: {
         canonical: `https://hanatechnology.ir/search/${params.query}`,
      },
   }
}

const Search = async ({ params: { query } }: { params: { query: string } }) => {
   query = dehyphen(decodeURI(query))
   const { uniqueMergedProducts, brands, models } = await getProducts({ query })

   return (
      <>
         <GTMViewItemList
            params={JSON.parse(
               JSON.stringify({
                  query,
                  productList: uniqueMergedProducts,
               }),
            )}
         />

         <GTMSearch query={query} />

         <div className='px-3 md:px-0 md:max-w-screen-2xl md:mx-auto space-y-8 my-6'>
            <SearchTitle />

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
                     <div className='w-[20rem] mx-auto aspect-square relative'>
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
      </>
   )
}

export default Search
