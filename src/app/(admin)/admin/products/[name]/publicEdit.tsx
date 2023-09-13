'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

type PropsType = {
   params: {
      _id: string
      publicParam: boolean
   }
}

const PublicEdit = ({ params: { _id, publicParam } }: PropsType) => {
   const [publicStatus, setPublicStatus] = useState<boolean>(publicParam)

   const changePublicStatus = async () => {
      const payload = {
         _id: _id,
         publicStatus: !publicStatus,
      }

      try {
         const res = await fetch('/api/course', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setPublicStatus((prev) => !prev)
         toast.success(' عمومیت با موفقیت تغییر یافت.')
      } catch (err) {
         toast.error('در تغییر عمومی بودن کالا خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <div className='ml-auto flex w-fit items-center space-x-5 bg-slate-200 rounded-lg p-3'>
         <button onClick={changePublicStatus}>
            {publicStatus ? (
               <svg
                  className='h-5 w-5 text-black'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />{' '}
                  <circle cx='12' cy='12' r='3' />
               </svg>
            ) : (
               <svg
                  className='h-5 w-5 text-black'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />{' '}
                  <line x1='1' y1='1' x2='23' y2='23' />
               </svg>
            )}
         </button>
         <h2> :عمومی</h2>
      </div>
   )
}

export default PublicEdit
