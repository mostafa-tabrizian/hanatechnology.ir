import Link from 'next/link'
import Image from 'next/legacy/image'

import dbConnect from '@/lib/dbConnect'
import Product, { IProduct } from '@/models/product'
import Category from '@/models/category'
import Subcategory from '@/models/subcategory'

import ProductCards from '@/components/product/cards'
import Slides from './components/slides'

const GetCCTV = async () => {
   dbConnect()
   // console.log('category', await Category.find())
   // console.log('subcategory', await Subcategory.find())
   return await Product.find({
      category: '64fcaf60a459b97a56a24291',
   }).exec()
}

export const metadata = {
   title: 'هانا تکنولوژی',
   description: 'هانا تکنولوژی',
}

async function Home() {
   const CCTVs = await GetCCTV()

   console.log('cctv', CCTVs.length)

   return (
      <div className='px-3 md:px-0 md:mx-auto max-w-screen-md space-y-8 my-6'>
         <Slides />

         <div className='grid grid-cols-2 gap-x-3'>
            <Link href='#'>
               <Image
                  className='rounded-xl'
                  src={'/category/cable.webp'}
                  alt='slide1'
                  width={460}
                  height={260}
                  objectFit='contain'
               />
            </Link>
            <Link href='#'>
               <Image
                  className='rounded-xl'
                  src={'/category/fiberoptic.webp'}
                  alt='slide1'
                  width={460}
                  height={260}
                  objectFit='contain'
               />
            </Link>
            <Link href='#'>
               <Image
                  className='rounded-xl'
                  src={'/category/router.webp'}
                  alt='slide1'
                  width={460}
                  height={260}
                  objectFit='contain'
               />
            </Link>
            <Link href='#'>
               <Image
                  className='rounded-xl'
                  src={'/category/switch.webp'}
                  alt='slide1'
                  width={460}
                  height={260}
                  objectFit='contain'
               />
            </Link>
         </div>

         <div className='text-center'>
            <h3>دسته‌بندی محصولات</h3>
            <div className='grid grid-cols-3 gap-y-6 mt-3'>
               <Link href='#'>
                  <Image
                     className='rounded-xl'
                     src={'/subcategory/etesalat.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
                  <span className='font-bold'>اتصالات شبکه</span>
               </Link>
               <Link href='#'>
                  <Image
                     className='rounded-xl'
                     src={'/subcategory/fiberoptic-cable.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
                  <span className='font-bold'>کابل فیبرنوری</span>
               </Link>
               <Link href='#'>
                  <Image
                     className='rounded-xl'
                     src={'/subcategory/network-cable.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
                  <span className='font-bold'>کابل شبکه</span>
               </Link>
               <Link href='#'>
                  <Image
                     className='rounded-xl'
                     src={'/subcategory/network-switch.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
                  <span className='font-bold'>سوییج</span>
               </Link>
               <Link href='#'>
                  <Image
                     className='rounded-xl'
                     src={'/subcategory/rack.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
                  <span className='font-bold'>رک</span>
               </Link>
               <Link href='#'>
                  <Image
                     className='rounded-xl'
                     src={'/subcategory/router.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
                  <span className='font-bold'>روتر</span>
               </Link>
            </div>
         </div>

         <div>
            <Link href='#'>
               <Image
                  className='rounded-xl'
                  src={'/product-banner/modem.webp'}
                  alt='slide1'
                  width={460}
                  height={190}
                  objectFit='contain'
               />
            </Link>

            <Link href='#'>
               <Image
                  className='rounded-xl'
                  src={'/product-banner/point.webp'}
                  alt='slide1'
                  width={460}
                  height={190}
                  objectFit='contain'
               />
            </Link>
         </div>

         <div className='bg-white rounded-lg p-5'>
            <div className='flex justify-between items-center'>
               <Link href='#'><span>...بیشتر</span></Link>
               <h2>دوربین مداربسته</h2>
            </div>

            {/* <ProductCards
            // @ts-ignore
            products={products}
            pageTarget='/product/'
            userTarget='client'
         /> */}
         </div>
      </div>
   )
}

export default Home
