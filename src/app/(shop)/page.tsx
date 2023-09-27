import Link from 'next/link'
import Image from 'next/legacy/image'

import dbConnect from '@/lib/dbConnect'
import limiter from '@/lib/limiter'
import Product from '@/models/product'
import Slide from '@/models/slide'

import Slides from '@/components/slides'
import ProductSwiper from '../../components/product/swiper'
import Script from 'next/script'

const getCategories = async () => {
   dbConnect()
   const cctv = await Product.find({
      category: '64fcaf60a459b97a56a24291',
   }).exec()

   const modem = await Product.find({
      category: '64fcd981a459b97a56a24295',
   }).exec()

   return {
      cctv,
      modem,
   }
}

const getSlides = async () => {
   dbConnect()
   return await Slide.find()
}

export const metadata = {
   title: 'حانا تکنولوژی | دوربین مدابسته، دزدگیر های امنیتی و تجهیزات شبکه',
   description:
      'ما در حانا با ارائه ابزارهای پیشرفته دوربین مداربسته، سیستم‌های اعلام حریق، دزدگیرهای امنیتی و تجهیزات شبکه، به شما امکان می‌دهیم تا نظارت، امنیت، و ارتباطات خود را به سطح جدیدی برسانید',
   alternates: {
      canonical: 'https://hanatechnology.ir',
   },
}

const jsonLd = {
   '@context': 'https://schema.org',
   '@type': 'WebSite',
   id: 'https://hanatechnology.ir/#webSite',
   name: 'حانا تکنولوژی',
   url: 'https://hanatechnology.ir',
}

const corporationJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'Corporation',
   id: 'https://hanatechnology.ir/#corporation',
   name: 'حانا تکنولوژی',
   alternateName: ['حانا', 'Hana'],
   legalName: 'حانا تکنولوژی',
   url: 'https://hanatechnology.ir',
   logo: 'https://hanatechnology.ir/_next/image?url=%2Flogo%2Flogo.jpg&w=96&q=100',
   email: '',
   sameAs: [
      'https://www.instagram.com/HanaTech2023',
      'https://t.me/HanaTech2023',
      'https://eitaa.com/HanaTech2023',
   ],
   contactPoint: [
      {
         '@type': 'ContactPoint',
         telephone: '+989128530920',
         contactType: 'customer service',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
      {
         '@type': 'ContactPoint',
         telephone: '+989109960802',
         contactType: 'customer service',
         areaServed: 'IR',
         availableLanguage: 'Persian',
      },
   ],
   address: {
      '@type': 'PostalAddress',
      streetAddress:
         'Qom Province, Qom, Imam Reza Boulevard, Ferdows Residential Commercial Complex, Unit 229, First Floor',
      addressLocality: 'Qom, Iran',
      postalCode: '000000',
      areaServed: {
         '@context': 'https://schema.org',
         '@type': 'Place',
         geo: {
            '@type': 'GeoCoordinates',
            latitude: '34.6271489',
            longitude: '50.8490246',
         },
         hasMap: 'https://maps.app.goo.gl/RuiGssypE4p2WPrY9',
      },
      addressCountry: {
         '@type': 'Country',
         name: 'Iran',
      },
   },
   founders: [
      {
         '@context': 'https://schema.org',
         '@type': 'Person',
         jobTitle: 'Chief executive officer',
         name: 'Mohammad --admin--i',
         sameAs: [],
      },
      {
         '@context': 'https://schema.org',
         '@type': 'Person',
         image: '',
         jobTitle: 'Chairman',
         name: 'Mohammad --admin--i',
         sameAs: [],
      },
   ],
}

async function Home() {
   const remaining = await limiter.removeTokens(2)

   if (remaining < 0) {
      return (
         <h1 className='text-center mx-10 md:mx-auto my-20 max-w-screen-sm'>
            متاسفانه تعداد درخواست‌های شما به حداکثر مجاز رسیده است. لطفاً کمی صبر کنید و سپس دوباره
            امتحان کنید
         </h1>
      )
   }

   const categories = await getCategories()
   const slides = await getSlides()

   return (
      <>
         <Script
            id='website-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
         />
         <Script
            id='corporation-jsonld'
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(corporationJsonLd) }}
         />

         <div className='px-3 md:px-0 md:mx-auto space-y-8 my-6'>
            <Slides slides={JSON.parse(JSON.stringify(slides))} />

            <div className='grid grid-cols-2 md:grid-cols-4 gap-x-3'>
               <Link aria-label='دسته بندی کابل' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/hanatechnology/category/cable.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link aria-label='دسته بندی فیبر نوری' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/hanatechnology/category/fiberoptic.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link aria-label='دسته بندی روتر' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/hanatechnology/category/router.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link aria-label='دسته بندی سویتج' id='category' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/hanatechnology/category/switch.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
            </div>

            <div className='text-center'>
               <h3>دسته‌بندی محصولات</h3>
               <div className='grid grid-cols-3 md:grid-cols-6 gap-y-6 mt-3'>
                  <Link aria-label='دسته بندی' href='#'>
                     <Image
                        className='rounded-xl'
                        src={
                           'https://tabrizian.storage.iran.liara.space/hanatechnology/model/etesalat.webp'
                        }
                        alt='slide1'
                        width={460}
                        height={260}
                        objectFit='contain'
                     />
                     <span className='font-bold'>اتصالات شبکه</span>
                  </Link>
                  <Link aria-label='دسته بندی' href='#'>
                     <Image
                        className='rounded-xl'
                        src={
                           'https://tabrizian.storage.iran.liara.space/hanatechnology/model/fiberoptic-cable.webp'
                        }
                        alt='slide1'
                        width={460}
                        height={260}
                        objectFit='contain'
                     />
                     <span className='font-bold'>کابل فیبرنوری</span>
                  </Link>
                  <Link aria-label='دسته بندی' href='#'>
                     <Image
                        className='rounded-xl'
                        src={
                           'https://tabrizian.storage.iran.liara.space/hanatechnology/model/network-cable.webp'
                        }
                        alt='slide1'
                        width={460}
                        height={260}
                        objectFit='contain'
                     />
                     <span className='font-bold'>کابل شبکه</span>
                  </Link>
                  <Link aria-label='دسته بندی' href='#'>
                     <Image
                        className='rounded-xl'
                        src={
                           'https://tabrizian.storage.iran.liara.space/hanatechnology/model/network-switch.webp'
                        }
                        alt='slide1'
                        width={460}
                        height={260}
                        objectFit='contain'
                     />
                     <span className='font-bold'>سوییج</span>
                  </Link>
                  <Link aria-label='دسته بندی' href='#'>
                     <Image
                        className='rounded-xl'
                        src={
                           'https://tabrizian.storage.iran.liara.space/hanatechnology/model/rack.webp'
                        }
                        alt='slide1'
                        width={460}
                        height={260}
                        objectFit='contain'
                     />
                     <span className='font-bold'>رک</span>
                  </Link>
                  <Link aria-label='دسته بندی' href='#'>
                     <Image
                        className='rounded-xl'
                        src={
                           'https://tabrizian.storage.iran.liara.space/hanatechnology/model/router.webp'
                        }
                        alt='slide1'
                        width={460}
                        height={260}
                        objectFit='contain'
                     />
                     <span className='font-bold'>روتر</span>
                  </Link>
               </div>
            </div>

            <div className='md:flex md:justify-around'>
               <Link aria-label='دسته بندی' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/hanatechnology/banner/modem.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={190}
                     objectFit='contain'
                  />
               </Link>

               <Link aria-label='دسته بندی' href='#'>
                  <Image
                     className='rounded-xl'
                     src={
                        'https://tabrizian.storage.iran.liara.space/hanatechnology/banner/point.webp'
                     }
                     alt='slide1'
                     width={460}
                     height={190}
                     objectFit='contain'
                  />
               </Link>
            </div>

            <div className='bg-white shadow shadow-slate-200 rounded-lg p-5 pb-2'>
               <div className='flex justify-between items-center'>
                  <Link id='category' href='/search/cctv?type=category&name=دوربین مداربسته'>
                     <span>...بیشتر</span>
                  </Link>
                  <h2>دوربین مداربسته</h2>
               </div>

               <ProductSwiper products={JSON.parse(JSON.stringify(categories.cctv))} />
            </div>

            <div className='bg-white shadow shadow-slate-200 rounded-lg p-3'>
               <div className='flex justify-between items-center'>
                  <Link id='category' href='/search/modem-router?type=category&name=مودم روتر'>
                     <span>...بیشتر</span>
                  </Link>
                  <h2>مودم</h2>
               </div>

               <ProductSwiper products={JSON.parse(JSON.stringify(categories.modem))} />
            </div>
         </div>
      </>
   )
}

export default Home
