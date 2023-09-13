'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { Column } from '@ant-design/plots'

import fetcher from '@/lib/fetcher'
import CircularProgress from '@mui/material/CircularProgress'
import toFarsiNumber from '@/lib/toFarsiNumber'

const Tabs = () => {
   const [activeTab, selectTab] = useState('USERS')
   const { data: usersData, error, isLoading } = useSWR('/api/admin/users-data', fetcher)

   if (usersData?.status == 403) return toast.error('لطفا خارج و مجدد وارد حساب کاربری خود شوید!')

   const monthlyRegisterPlotConfig = usersData
      ? {
           data: usersData['monthlyRegister'],
           xField: 'date',
           yField: 'value',
           xAxis: {
              label: {
                 autoRotate: false,
              },
           },
           slider: {
              start: 0.8,
              end: 1,
           },
        }
      : null

   if (error) {
      toast.error('در دریافت اطلاعات شما خطایی رخ داد')
      console.error(error)
   }

   const activeTabStyle = 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-indigo-300 text-white'

   return (
      <div className='mx-6 my-16 space-y-10'>
         <div className='flex justify-around max-w-lg mx-auto'>
            <button
               onClick={() => selectTab('USERS')}
               className={`px-10 rounded-xl hover:shadow-lg hover:shadow-slate-300 transition-all ${
                  activeTab == 'USERS' ? activeTabStyle : ''
               }`}
            >
               کاربران
            </button>
            <button
               onClick={() => selectTab('PRODUCTS')}
               className={`px-10 rounded-xl hover:shadow-lg hover:shadow-slate-300 transition-all ${
                  activeTab == 'PRODUCTS' ? activeTabStyle : ''
               }`}
            >
               محصولات
            </button>
            <button
               onClick={() => selectTab('ORDERS')}
               className={`px-10 rounded-xl hover:shadow-lg hover:shadow-slate-300 transition-all ${
                  activeTab == 'ORDERS' ? activeTabStyle : ''
               }`}
            >
               سفارشات
            </button>
         </div>

         <div>
            {isLoading ? (
               <div className='flex justify-center my-20'>
                  <CircularProgress size={40} />
               </div>
            ) : (
               <div className='space-y-5'>
                  {activeTab == 'USERS' ? (
                     <>
                        <div className='px-4 py-4 shadow-md shadow-indigo-100 space-y-4 transition-shadow from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'>
                           <h2 className='flex justify-between items-center'>
                              <span className='text-lg'>{toFarsiNumber(usersData.total)}</span>
                              تعداد کل کاربران
                           </h2>
                        </div>
                        <div className='px-4 py-4 shadow-md shadow-indigo-100 space-y-4 transition-shadow from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'>
                           <h2 className='flex justify-between items-center'>
                              <span className='text-lg'>??</span>
                              میانگین تعداد محصولات در سفارش
                           </h2>
                        </div>
                        <div className='px-4 py-4 shadow-md shadow-indigo-100 space-y-4 transition-shadow from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'>
                           <h2 className='flex justify-between items-center'>
                              <span className='text-lg'>??</span>
                              میانگین سفارشات هر کاربر
                           </h2>
                        </div>
                        <div className='px-4 py-4 shadow-md shadow-indigo-100 space-y-4 transition-shadow from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'>
                           <h2 className='flex justify-between items-center'>
                              <span className='text-lg'>??</span>
                              میانگین ارزش سفارشات هر کاربر
                           </h2>
                        </div>
                        <div className='px-4 py-4 shadow-md shadow-indigo-100 space-y-4 transition-shadow from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'>
                           <Column {...monthlyRegisterPlotConfig} />
                        </div>
                     </>
                  ) : (
                     ''
                  )}
                  {activeTab == 'PRODUCTS' ? (
                     <div className='px-4 py-4 shadow space-y-4 from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'></div>
                  ) : (
                     ''
                  )}
                  {activeTab == 'ORDERS' ? (
                     <div className='px-4 py-4 shadow space-y-4 from-gray-50 to-gray-100 bg-gradient-to-bl rounded-lg'></div>
                  ) : (
                     ''
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default Tabs
