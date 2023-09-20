import Product from '@/models/product'
import Category from '@/models/category'
import Brand from '@/models/brand'
import dbConnect from '@/lib/dbConnect'
import hyphen from '@/lib/hyphen'

const URL = 'https://hanatechnology.ir'

async function getAllPages() {
   await dbConnect()
   const productsData = await Product.find()
   const brandsData = await Brand.find()
   const categoriesData = await Category.find()

   return { productsData, brandsData, categoriesData }
}

export default async function sitemap() {
   const { productsData, brandsData, categoriesData } = await getAllPages()

   const products = productsData.map(({ slug, updatedAt }) => ({
      url: `${URL}/product/${hyphen(slug)}`,
      lastModified: updatedAt,
   }))

   const categories = categoriesData.map(({ slug, updatedAt }) => ({
      url: `${URL}/search/${hyphen(slug)}?type=category`,
      lastModified: updatedAt,
   }))

   const brands = brandsData.map(({ slug, updatedAt }) => ({
      url: `${URL}/search/${hyphen(slug)}?type=brand`,
      lastModified: updatedAt,
   }))
   const routes = [''].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...products, ...categories, ...brands]
}
