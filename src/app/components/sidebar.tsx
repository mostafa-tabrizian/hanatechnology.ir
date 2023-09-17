'use client'

import Drawer from '@mui/material/Drawer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Collapse from '@mui/material/Collapse'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
   const [sidebar, setSidebar] = useState(false)
   const [categories, setCategories] = useState(false)
   const [brands, setBrands] = useState(false)
   const [contactUsOptions, setContactUsOptions] = useState(false)

   const pathname = usePathname()
   useEffect(() => setSidebar(false), [pathname])

   return (
      <div>
         <button onClick={() => setSidebar(true)}>
            <svg
               stroke='currentColor'
               fill='none'
               strokeWidth='0'
               viewBox='0 0 24 24'
               className='h-8 w-8 text-slate-600'
               height='1em'
               width='1em'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
               ></path>
            </svg>
         </button>
         <Drawer anchor='right' open={sidebar} onClose={() => setSidebar(false)}>
            <div className='w-[16rem] h-full bg-slate-100'>
               <div className='p-5'>
                  <div className='flex gap-20 items-center justify-between'>
                     <button onClick={() => setSidebar(false)}>
                        <svg
                           stroke='currentColor'
                           fill='none'
                           strokeWidth='0'
                           viewBox='0 0 24 24'
                           className='w-8 h-8 text-gray-700'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M6 18L18 6M6 6l12 12'
                           ></path>
                        </svg>
                     </button>
                     <div>
                        <Link href='/' className='flex gap-3'>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 35 32'
                              fill='none'
                              className='h-8 w-8 fill-blue-600 block md:hidden'
                           >
                              <path
                                 fill='currenColor'
                                 d='M15.258 26.865a4.043 4.043 0 0 1-1.133 2.917 4.004 4.004 0 0 1-4.432.901 4.027 4.027 0 0 1-2.445-3.818 3.97 3.97 0 0 1 2.027-3.414c.09-.055-.024.109 0 0l1.86-1.652a8.495 8.495 0 0 0 2.304-5.793c0-2.926-1.711-5.901-4.17-7.457-.036-.094.094.055 0 0a3.975 3.975 0 0 1-2.026-3.413 4.042 4.042 0 0 1 1.133-2.918A4.006 4.006 0 0 1 11.246 1a3.99 3.99 0 0 1 2.873 1.218 4.024 4.024 0 0 1 1.133 2.917 8.52 8.52 0 0 0 2.347 5.832l.817.8c.326.285.668.551 1.024.798a3.88 3.88 0 0 1 1.504 1.431 3.901 3.901 0 0 1-1.504 5.442c-.063.036.033-.067 0 0a8.969 8.969 0 0 0-3.024 3.183 9.017 9.017 0 0 0-1.158 4.244ZM19.74 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 0 0 1.798 1.482 3.99 3.99 0 0 0 4.366-.873 4.042 4.042 0 0 0 .869-4.386 4.02 4.02 0 0 0-1.476-1.806 3.994 3.994 0 0 0-5.058.501 4.038 4.038 0 0 0-1.175 2.845Zm4.007 17.717c-.792 0-1.567.236-2.226.678a4.021 4.021 0 0 0-1.476 1.806 4.042 4.042 0 0 0 .869 4.387 3.99 3.99 0 0 0 4.366.873 4.01 4.01 0 0 0 1.8-1.484 4.039 4.039 0 0 0-.5-5.082 4 4 0 0 0-2.832-1.18v.002ZM34 15.994a4.04 4.04 0 0 0-.675-2.236 4.01 4.01 0 0 0-1.798-1.483 3.99 3.99 0 0 0-4.367.873 4.042 4.042 0 0 0-.87 4.387 4.02 4.02 0 0 0 1.477 1.806 3.993 3.993 0 0 0 5.058-.502A4.04 4.04 0 0 0 34 15.993v.001Z'
                              ></path>
                              <path
                                 fill='currenColor'
                                 d='M5.007 11.969c-.793 0-1.567.236-2.226.678a4.02 4.02 0 0 0-1.476 1.807 4.042 4.042 0 0 0 .87 4.386 4.002 4.002 0 0 0 4.365.873 4.01 4.01 0 0 0 1.798-1.483 4.038 4.038 0 0 0-.5-5.08 4.004 4.004 0 0 0-2.83-1.181Z'
                              ></path>
                           </svg>
                           <h1 className='text-blue-600'>حانا</h1>
                        </Link>
                     </div>
                  </div>

                  <hr />

                  <ul className='gap-y-2 rtl mt-10 flex flex-col justify-between gap-x-8 text-gray-700'>
                     <li className='block'>
                        <div className='text-gray-700 bg-gradient-to-l from-white to-transparent shadow-inner rounded-lg pr-1'>
                           <Link href='/'>
                              <div className='relative menu-item flex items-center text-blue-600'>
                                 <span className='py-2 md:py-1 flex items-center gap-x-2 md:hover:text-blue-600 cursor-pointer font-bold'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       viewBox='0 0 22 22'
                                       fill='none'
                                       className='h-5 w-5'
                                       stroke='currentColor'
                                       strokeWidth={0}
                                    >
                                       <path
                                          fill='currentColor'
                                          d='M20.04 9.719a.75.75 0 0 0-1.5 0h1.5Zm-14.58 0a.75.75 0 1 0-1.5 0h1.5Zm9.053 10.988-.172-.73.172.73Zm-5.026 0 .172-.73-.172.73Zm5.341-15.693-.532.529.532-.529Zm5.64 6.744a.75.75 0 1 0 1.064-1.057l-1.064 1.057ZM9.172 5.014l.532.529-.532-.529Zm-6.704 5.687a.75.75 0 1 0 1.064 1.057l-1.064-1.057Zm7.25 7.62-.737-.14.737.14Zm.02-.104.737.139-.737-.139Zm4.524 0-.737.139.737-.139Zm.02.103.737-.138-.737.138Zm-.29 2.232-.677-.322.677.322Zm-.794-.077a.75.75 0 0 0 1.354.645l-1.354-.645Zm-3.19.077-.677.322.677-.322Zm-.56.568a.75.75 0 0 0 1.354-.645l-1.354.645Zm1.913-4.677-.2-.723.2.723Zm1.278 0 .2-.723-.2.723Zm5.901-6.724v4.918h1.5V9.72h-1.5ZM5.46 14.637V9.72h-1.5v4.918h1.5Zm8.88 5.34a10.18 10.18 0 0 1-4.68 0l-.346 1.46a11.68 11.68 0 0 0 5.372 0l-.345-1.46Zm-4.68 0c-2.457-.58-4.2-2.79-4.2-5.34h-1.5c0 3.24 2.214 6.058 5.354 6.8l.345-1.46Zm5.026 1.46c3.14-.742 5.354-3.56 5.354-6.8h-1.5c0 2.55-1.743 4.76-4.2 5.34l.346 1.46Zm-.39-15.894 6.172 6.215 1.064-1.057-6.171-6.215-1.065 1.057ZM8.64 4.486 2.468 10.7l1.064 1.057 6.172-6.215-1.065-1.057Zm6.722 0c-.652-.657-1.193-1.204-1.68-1.577-.502-.387-1.035-.659-1.681-.659v1.5c.183 0 .397.064.768.348.387.298.847.758 1.528 1.445l1.065-1.057ZM9.704 5.543c.681-.687 1.14-1.147 1.528-1.445.37-.284.585-.348.768-.348v-1.5c-.646 0-1.178.272-1.682.659-.486.373-1.027.92-1.679 1.577l1.065 1.057Zm.752 12.916.019-.103L9 18.079l-.02.103 1.475.277Zm3.07-.103.018.103 1.475-.277-.02-.103-1.474.277Zm-.211 1.874-.117.245 1.354.645.117-.246-1.354-.644Zm-3.984.644.117.246 1.354-.645-.117-.245-1.354.644Zm4.213-2.415c.113.6.032 1.22-.23 1.77l1.355.645c.399-.837.52-1.78.35-2.692l-1.475.277Zm-4.563-.277a4.385 4.385 0 0 0 .35 2.692l1.354-.644a2.884 2.884 0 0 1-.23-1.771l-1.474-.277Zm2.58-1.017c.287-.08.59-.08.877 0l.401-1.445a3.138 3.138 0 0 0-1.678 0l.4 1.445ZM15 18.08a3.024 3.024 0 0 0-2.16-2.36l-.4 1.446c.554.154.978.614 1.086 1.19L15 18.08Zm-4.524.277a1.524 1.524 0 0 1 1.087-1.19l-.401-1.446A3.024 3.024 0 0 0 9 18.079l1.474.277Z'
                                       ></path>
                                    </svg>
                                    <span className='text-base'>صفحه اصلی</span>
                                 </span>
                              </div>
                           </Link>
                        </div>
                     </li>

                     <li className='block'>
                        <div className='text-gray-700 bg-gradient-to-l from-white to-transparent shadow-inner rounded-lg pr-1'>
                           <button
                              onClick={() => setCategories((prev) => !prev)}
                              className='w-full'
                           >
                              <span className='py-1 flex items-center gap-x-2 cursor-pointer font-bold '>
                                 <svg
                                    className='h-5 w-5'
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
                                 <span className='text-base'>دسته بندی ها</span>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className={`h-4 w-4 transition ease-in-out duration-300 ${
                                       categories ? 'rotate-90' : 'rotate-0'
                                    }`}
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M19 9l-7 7-7-7'
                                    ></path>
                                 </svg>
                              </span>
                           </button>

                           <Collapse in={categories}>
                              <ul className='border-b border-white border-opacity-10 opacity-90 space-y-4 p-3'>
                                 <li className='flex items-center'>
                                    <Link className=' flex items-center' href='/category/cctv'>
                                       <svg
                                          className='h-5 w-5'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          strokeWidth='2'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                       >
                                          {' '}
                                          <polygon points='23 7 16 12 23 17 23 7' />{' '}
                                          <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
                                       </svg>
                                       <p className='font-semibold px-2'>
                                          <span className='text-sm'>دوربین مداربسته</span>
                                       </p>
                                    </Link>
                                 </li>
                              </ul>
                           </Collapse>
                        </div>
                     </li>

                     <li className='block'>
                        <div className='text-gray-700 bg-gradient-to-l from-white to-transparent shadow-inner rounded-lg pr-1'>
                           <button onClick={() => setBrands((prev) => !prev)} className='w-full'>
                              <span className='py-1 flex items-center gap-x-2 cursor-pointer font-bold '>
                                 <svg
                                    className='h-5 w-5'
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
                                 <span className='text-base'>برند ها</span>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className={`h-4 w-4 transition ease-in-out duration-300 ${
                                       brands ? 'rotate-90' : 'rotate-0'
                                    }`}
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M19 9l-7 7-7-7'
                                    ></path>
                                 </svg>
                              </span>
                           </button>

                           <Collapse in={brands}>
                              <ul className='border-b border-white border-opacity-10 opacity-90 space-y-4 p-3'>
                                 <li className='flex items-center'>
                                    <Link className=' flex items-center' href='/search/داهوا'>
                                       <svg
                                          className='h-5 w-5'
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
                                          <circle cx='12' cy='12' r='4' />
                                       </svg>
                                       <p className='font-semibold px-2'>
                                          <span className='text-sm'>داهوا</span>
                                       </p>
                                    </Link>
                                 </li>
                              </ul>
                           </Collapse>
                        </div>
                     </li>

                     <li className='block '>
                        <div className='text-gray-700 bg-gradient-to-l from-white to-transparent shadow-inner rounded-lg pr-1'>
                           <button
                              onClick={() => setContactUsOptions((prev) => !prev)}
                              className='w-full'
                           >
                              <span className='py-1 flex items-center gap-x-2 cursor-pointer font-bold'>
                                 <svg
                                    className='h-5 w-5'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                 >
                                    {' '}
                                    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                                 </svg>
                                 <span className='text-base'>ارتباط با ما</span>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className={`h-4 w-4 transition ease-in-out duration-300 ${
                                       contactUsOptions ? 'rotate-90' : 'rotate-0'
                                    }`}
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M19 9l-7 7-7-7'
                                    ></path>
                                 </svg>
                              </span>
                           </button>

                           <Collapse in={contactUsOptions}>
                              <ul className='border-b border-white border-opacity-10 opacity-90 space-y-4 p-3'>
                                 <li className='flex items-center rounded-lg opacity-90 mb-4 pr-2'>
                                    <a
                                       rel='noreferrer'
                                       className=' flex items-center'
                                       href='#'
                                       target='_blank'
                                    >
                                       <span className='bg-gradient-to-br from-blue-500 via-rose-500 to-yellow-500 rounded-md'>
                                          <svg
                                             className='h-5 w-5 text-white'
                                             viewBox='0 0 24 24'
                                             fill='none'
                                             stroke='currentColor'
                                             strokeWidth='2'
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                          >
                                             {' '}
                                             <rect
                                                x='2'
                                                y='2'
                                                width='20'
                                                height='20'
                                                rx='5'
                                                ry='5'
                                             />{' '}
                                             <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />{' '}
                                             <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
                                          </svg>
                                       </span>
                                       <p className='font-semibold px-2'>
                                          <span className='text-sm'>صفحه اینستاگرام</span>
                                       </p>
                                    </a>
                                 </li>
                                 <li className='flex items-center rounded-lg opacity-90 mb-4 pr-2'>
                                    <a
                                       rel='noreferrer'
                                       className=' flex items-center'
                                       href='#'
                                       target='_blank'
                                    >
                                       <span className='bg-blue-500 rounded-md'>
                                          <svg
                                             stroke='currentColor'
                                             fill='currentColor'
                                             strokeWidth='0'
                                             viewBox='0 0 24 24'
                                             className='h-5 w-5 text-white'
                                             height='1em'
                                             width='1em'
                                             xmlns='http://www.w3.org/2000/svg'
                                          >
                                             <g>
                                                <path fill='none' d='M0 0h24v24H0z'></path>
                                                <path
                                                   fillRule='nonzero'
                                                   d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.804l9.733-3.76c.565-.23.885.061.702.79l-1.657 7.82c-.116.557-.451.69-.916.433l-2.551-1.888-1.189 1.148c-.122.118-.221.219-.409.244-.187.026-.341-.03-.454-.34l-.87-2.871-.012.008z'
                                                ></path>
                                             </g>
                                          </svg>
                                       </span>
                                       <p className='font-semibold px-2'>
                                          <span className='text-sm'>کانال تلگرام</span>
                                       </p>
                                    </a>
                                 </li>

                                 <li className='flex items-center rounded-lg opacity-90 mb-4 pr-2'>
                                    <a
                                       rel='noreferrer'
                                       className=' flex items-center'
                                       href='tel:+989128521769'
                                       target='_blank'
                                    >
                                       <span className='bg-green-400 rounded-md p-[0.17rem]'>
                                          <svg
                                             className='h-4 w-4 text-white'
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
                                       </span>
                                       <p className='font-semibold px-2'>
                                          <span className='text-sm'>تماس تلفنی</span>
                                       </p>
                                    </a>
                                 </li>
                              </ul>
                           </Collapse>
                        </div>
                     </li>

                     <li className='block'>
                        <div className='text-gray-700 bg-gradient-to-l from-white to-transparent shadow-inner rounded-lg pr-1'>
                           <a href='#about-us' onClick={() => setSidebar(false)}>
                              <div className='relative menu-item flex items-center text-blue-600'>
                                 <span className='py-2 md:py-1 flex items-center gap-x-2 md:hover:text-blue-600 cursor-pointer font-bold'>
                                    <svg
                                       className='h-5 w-5'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       stroke='currentColor'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='2'
                                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                       />
                                    </svg>

                                    <span className='text-base'>درباره ما</span>
                                 </span>
                              </div>
                           </a>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </Drawer>
      </div>
   )
}

export default Sidebar
