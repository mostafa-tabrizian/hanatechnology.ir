import Link from 'next/link'

const Footer = () => {
   return (
      <footer className='py-6 md:py-8 text-slate-600 rtl mt-10 border-t-2 border-t-gray-200 bg-gray-200 px-4 rounded-t-3xl'>
         <div className='grid gap-10 md:gap-14 grid-cols-5 grid-row-2 container md:max-w-screen-xl mx-auto'>
            <div className='col-span-5 md:col-span-2 flex flex-col justify-start'>
               <div>
                  <div className='flex justify-around mb-2 items-center'>
                     <Link href='/' className='flex items-center gap-3'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 35 32'
                           fill='none'
                           className='h-12 w-12 fill-blue-600 block md:hidden'
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
                        <h4 className='text-blue-600 yekanBlack text-2xl'>گروه مهندسی حانا</h4>
                     </Link>
                     <ul className='flex gap-3 items-center'>
                        <li className='block'>
                           <a
                              rel='noreferrer'
                              href='https://www.instagram.com/sahebmohamadi.ir/'
                              target='_blank'
                           >
                              <button type='button'>
                                 <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    role='img'
                                    viewBox='0 0 24 24'
                                    className='w-6 h-6 hover:text-blue-600 transition'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <title></title>
                                    <path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z'></path>
                                 </svg>
                              </button>
                           </a>
                        </li>
                        <li className='block'>
                           <a
                              rel='noreferrer'
                              href='https://t.me/fronthooks_support'
                              target='_blank'
                           >
                              <button type='button'>
                                 <svg
                                    stroke='currentColor'
                                    fill='currentColor'
                                    strokeWidth='0'
                                    role='img'
                                    viewBox='0 0 24 24'
                                    className='w-6 h-6 hover:text-blue-600 transition'
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <title></title>
                                    <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'></path>
                                 </svg>
                              </button>
                           </a>
                        </li>
                        <li className='block'>
                           <a href='tel:+989128521769' className='flex items-center'>
                              <svg
                                 className='w-6 h-6 hover:text-blue-600 transition'
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
                        </li>
                     </ul>
                  </div>
                  <h4 className='text-slate-500 font-bold yekan1 text-sm mb-6 text-center'>
                     حفاظت، امنیت،
                     نظارت، ارتباطات
                  </h4>
                  <div>
                     <p className='text-slate-500 text-sm leading-7 text-justify yekan1'>
                        ما در حانا به حفاظت از شما و محیط‌هایتان متعهدیم. با ارائه ابزارهای پیشرفته
                        دوربین مداربسته، سیستم‌های اعلام حریق، دزدگیرهای امنیتی و تجهیزات شبکه، ما
                        به شما امکان می‌دهیم تا نظارت، امنیت، و ارتباطات خود را به سطح جدیدی
                        برسانید. ما در تلاشیم تا با ارائه راه‌حل‌هایی نوآورانه و اطمینان‌بخش، زندگی
                        و کسب و کار شما را تقویت کنیم. به ما بپیوندید و با ما در جهت ساختن یک آینده
                        امن‌تر و بهتر همکاری کنید. <br />
                        <br />
                        از طریق{' '}
                        <a
                           rel='noreferrer'
                           className='text-blue-600 text-sm'
                           href='#'
                           target='_blank'
                        >
                           اینستاگرام
                        </a>
                        ،{' '}
                        <a
                           rel='noreferrer'
                           className='text-blue-600 text-sm'
                           href='#'
                           target='_blank'
                        >
                           تلگرام
                        </a>{' '}
                        یا{' '}
                        <a
                           rel='noreferrer'
                           className='text-blue-600 text-sm'
                           href='tel:+989128521769'
                           target='_blank'
                        >
                           تماس تلفنی{' '}
                        </a>
                        با ما در ارتباط باشید
                     </p>
                  </div>
               </div>
            </div>
            <div className='col-span-5 md:col-span-1 rtl'>
               <h4 className='text-xl yekanBlack mb-4 text-blue-600 '>دسته بندی های محصولات</h4>
               <nav>
                  <ul className='text-sm'>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           دوربین مداربسته
                        </a>
                     </li>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           دزدگیر
                        </a>
                     </li>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           اعلام حریق
                        </a>
                     </li>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           تجهیزات شبکه
                        </a>
                     </li>
                  </ul>
               </nav>
            </div>
            <div className='col-span-5 md:col-span-1 rtl'>
               <h4 className='text-xl yekanBlack mb-4 text-blue-600'>دسترسی سریع</h4>
               <nav>
                  <ul className='text-sm'>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           درباره ما
                        </a>
                     </li>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           ارتباط با ما
                        </a>
                     </li>
                     <li className='list-disc py-2 list-inside'>
                        <a
                           className='py-2 transition-all duration-300 text-slate-500 hover:text-blue-500'
                           href='#'
                        >
                           قوانین و مقررات
                        </a>
                     </li>
                  </ul>
               </nav>
            </div>
            <div className='col-span-5'>
               <p className='text-center text-slate-400 text-xs'>
                  © تمامی حقوق برای حانا تکنولوژی محفوظ است
               </p>
            </div>
         </div>
      </footer>
   )
}

export default Footer
