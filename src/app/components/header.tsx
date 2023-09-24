import Link from 'next/link'
import Sidebar from './sidebar'
import SearchInput from '@/components/searchInput'
import Image from 'next/legacy/image'
import LinksForDesktop from './headerLinksforDesktop'
import { ICategory } from '@/models/category'
import { IBrand } from '@/models/brand'

const Header = ({
   params: { categories, brands },
}: {
   params: { categories: ICategory[]; brands: IBrand[] }
}) => {
   return (
      <header className='bg-white py-3 px-3 rounded-b-xl'>
         <div className='flex md:grid md:grid-cols-7 p-1 justify-between items-center'>
            <div className='md:col-span-3 md:w-3/4 hidden md:block'>
               <SearchInput />
            </div>

            <Link aria-label='صفحه اصلی' href='/' className='flex md:justify-center md:col-span-1 gap-3'>
               <Image
                  className='object-contain'
                  src='/logo/logo.jpg'
                  alt='لوگو حانا تکنولوژی'
                  width={80}
                  height={80}
                  quality={100}
                  objectFit='contain'
                  loading='lazy'
               />
            </Link>

            <Sidebar categoriesList={categories} brandsList={brands} />

            <LinksForDesktop categoriesList={categories} brandsList={brands} />
         </div>

         <div className='md:hidden'>
            <SearchInput />
         </div>

         <a
         aria-label='تماس تلفنی'
            id='phone_call'
            href='tel:+989128530920'
            className='bg-green-400 md:hidden p-2 rounded-xl fixed bottom-5 shadow-lg shadow-green-300 left-5 z-10'
            title='تماس تلفنی با پشتیبانی'
         >
            <svg
               className='h-8 w-8 text-white'
               viewBox='0 0 24 24'
               fill='none'
               stroke='currentColor'
               strokeWidth='2'
               strokeLinecap='round'
               strokeLinejoin='round'
            >
               {' '}
               <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
            </svg>
         </a>
      </header>
   )
}

export default Header
