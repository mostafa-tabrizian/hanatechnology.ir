import Link from 'next/link'
import Image from 'next/legacy/image'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

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

export const metadata = {
   title: 'حانا تکنولوژی',
   description: 'حانا تکنولوژی',
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
   id: 'https://www.hanatechnology.ir/#corporation',
   name: 'حانا تکنولوژی',
   alternateName: ['حانا', 'Hana'],
   legalName: 'حانا تکنولوژی',
   url: 'https://www.hanatechnology.ir',
   logo: '',
   email: '',
   sameAs: [
      // 'https://www.google.com/search?kgmid=/g/11byzd0v3c',
      // 'https://www.instagram.com/digikalacom',
   ],
   contactPoint: {
      '@type': 'ContactPoint',
      // telephone: '+982161930000',
      contactType: 'customer service',
      areaServed: 'IR',
      availableLanguage: 'Persian',
   },
   address: {
      '@type': 'PostalAddress',
      // streetAddress: 'Tehran Province, Tehran, District 3, Gandhi St',
      addressLocality: 'Qom, Iran',
      // postalCode: '1517863332',
      // areaServed: {
      //    '@context': 'https://schema.org',
      //    '@type': 'Place',
      //    geo: {
      //       '@type': 'GeoCoordinates',
      //       latitude: '35.7549533',
      //       longitude: '51.4123011',
      //    },
      //    hasMap: 'https://goo.gl/maps/wG2Y9g5Vsvv9unoF7',
      // },
      addressCountry: {
         '@type': 'Country',
         name: 'Iran',
      },
   },
   founders: [
      {
         '@context': 'https://schema.org',
         '@type': 'Person',
         image: 'https://media-exp1.licdn.com/dms/image/C4D03AQFXd0mgGCxtMQ/profile-displayphoto-shrink_400_400/0/1563267993816?e=1643241600&v=beta&t=vGQO4U8MWkvJIhwiNu3S4e3uHVyEwBIsLA1McV__F3s',
         jobTitle: 'Chief executive officer',
         name: 'Mohammad Saadati',
         sameAs: [],
      },
      {
         '@context': 'https://schema.org',
         '@type': 'Person',
         image: '',
         jobTitle: 'Chairman',
         name: 'Mohammad Saadati',
         sameAs: [],
      },
   ],
}

async function Home() {
   const categories = await getCategories()

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
         
         <div className='px-3 md:px-0 md:mx-auto max-w-screen-md space-y-8 my-6'>
            <Slides />

            <div className='grid grid-cols-2 gap-x-3'>
               <Link href='/category/cable'>
                  <Image
                     className='rounded-xl'
                     src={'/category/cable.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link href='/category/fiberoptic'>
                  <Image
                     className='rounded-xl'
                     src={'/category/fiberoptic.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link href='/category/router'>
                  <Image
                     className='rounded-xl'
                     src={'/category/router.webp'}
                     alt='slide1'
                     width={460}
                     height={260}
                     objectFit='contain'
                  />
               </Link>
               <Link href='/category/switch'>
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
                        src={'/model/etesalat.webp'}
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
                        src={'/model/fiberoptic-cable.webp'}
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
                        src={'/model/network-cable.webp'}
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
                        src={'/model/network-switch.webp'}
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
                        src={'/model/rack.webp'}
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
                        src={'/model/router.webp'}
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

            <div className='bg-white shadow shadow-slate-200 rounded-lg p-5'>
               <div className='flex justify-between items-center'>
                  <Link href='#'>
                     <span>...بیشتر</span>
                  </Link>
                  <h2>دوربین مداربسته</h2>
               </div>

               <ProductSwiper products={JSON.parse(JSON.stringify(categories.cctv))} />
            </div>

            <div className='bg-white shadow shadow-slate-200 rounded-lg p-3'>
               <div className='flex justify-between items-center'>
                  <Link href='#'>
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
