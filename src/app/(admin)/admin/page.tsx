import User from '@/lib/user'
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs'

export const metadata = {
   title: 'حانا تکنولوژی | پنل ادمین',
}

const AdminPanel = async () => {
   const user = await User()

   return (
      <div className='mx-6 my-16 space-y-10'>
         <>
            <Breadcrumbs aria-label='breadcrumb'>
               <Link className='text-gray-400' href='/'>
                  فروشگاه
               </Link>
               <h5 className='font-semibold'>ادمین</h5>
            </Breadcrumbs>

            <div className='text-center'>
               <h1 className='font-semibold'> {user.username} </h1>
               <h2 className='ext-zinc-400 text-base'> به پنل ادمین خوش آمدید </h2>
            </div>

            <div className='px-4 py-10 space-y-4 from-gray-50 to-gray-100 bg-gradient-to-b rounded-lg max-w-sm mx-auto'>
               <div className='bg-white rounded-lg py-2 px-2'>
                  <Link href='/admin/products'>
                     <div className='flex justify-end space-x-3 items-center'>
                        <span className='text-base text-black'>محصولات</span>
                        <svg
                           className='h-6 w-6 text-black'
                           fill='none'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                           />
                        </svg>
                     </div>
                  </Link>
               </div>

               <div className='bg-white rounded-lg py-2 px-2'>
                  <Link href='/admin/slides'>
                     <div className='flex justify-end space-x-3 items-center'>
                        <span className='text-base text-black'>اسلاید ها</span>
                        <svg
                           className='h-6 w-6 text-black'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <line x1='15' y1='6' x2='15.01' y2='6' />{' '}
                           <rect x='3' y='3' width='18' height='14' rx='3' />{' '}
                           <path d='M3 13l4 -4a3 5 0 0 1 3 0l 4 4' />{' '}
                           <path d='M13 12l2 -2a3 5 0 0 1 3 0l 3 3' />{' '}
                           <line x1='8' y1='21' x2='8.01' y2='21' />{' '}
                           <line x1='12' y1='21' x2='12.01' y2='21' />{' '}
                           <line x1='16' y1='21' x2='16.01' y2='21' />
                        </svg>
                     </div>
                  </Link>
               </div>

               <div className='bg-white rounded-lg py-2 px-2'>
                  <Link href='/admin/categories'>
                     <div className='flex justify-end space-x-3 items-center'>
                        <span className='text-base text-black'>دسته بندی ها</span>
                        <svg
                           className='h-6 w-6'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <rect x='4' y='4' width='6' height='6' rx='1' />{' '}
                           <rect x='14' y='4' width='6' height='6' rx='1' />{' '}
                           <rect x='4' y='14' width='6' height='6' rx='1' />{' '}
                           <rect x='14' y='14' width='6' height='6' rx='1' />
                        </svg>
                     </div>
                  </Link>
               </div>

               <div className='bg-white rounded-lg py-2 px-2'>
                  <Link href='/admin/brands'>
                     <div className='flex justify-end space-x-3 items-center'>
                        <span className='text-base text-black'>برند ها</span>
                        <svg
                           className='h-6 w-6'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' />{' '}
                           <path d='M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4' />{' '}
                           <circle cx='9' cy='9' r='2' />
                        </svg>
                     </div>
                  </Link>
               </div>

               <div className='bg-white rounded-lg py-2 px-2'>
                  <Link href='/admin/models'>
                     <div className='flex justify-end space-x-3 items-center'>
                        <span className='text-base text-black'>مدل ها</span>
                        <svg
                           className='h-6 w-6 text-black'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='18' r='2' />{' '}
                           <circle cx='7' cy='6' r='2' /> <circle cx='17' cy='6' r='2' />{' '}
                           <path d='M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2' />{' '}
                           <line x1='12' y1='12' x2='12' y2='16' />
                        </svg>
                     </div>
                  </Link>
               </div>

               {/* <div className='bg-white rounded-lg py-2 px-2'>
                  <Link href='/admin/statistic'>
                     <div className='flex justify-end space-x-3 items-center'>
                        <span className='text-base text-black'>آمار</span>
                        <svg
                           className='h-6 w-6 text-black'
                           width='24'
                           height='24'
                           viewBox='0 0 24 24'
                           strokeWidth='2'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           <path stroke='none' d='M0 0h24v24H0z' />
                           <line x1='4' y1='19' x2='20' y2='19' />
                           <polyline points='4 15 8 9 12 11 16 6 20 10' />
                        </svg>
                     </div>
                  </Link>
               </div> */}
            </div>
         </>
      </div>
   )
}

export default AdminPanel
