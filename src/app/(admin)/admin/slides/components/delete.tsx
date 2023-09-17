'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'
import CircularProgress from '@mui/material/CircularProgress'

const SlideDelete = ({ params: { _id, src } }: { params: { _id: string; src: string } }) => {
   const [loading, setLoading] = useState(false)

   const handleDelete = async () => {
      if (!_id) {
         return toast.warning('در حذف اسلاید خطایی رخ داده است!')
      }

      setLoading(true)

      try {
         const fileUploadResult = await deleteFromS3Bucket(src, 'slides')

         if (!fileUploadResult) throw new Error('file upload to s3')

         await removeFromDb()
      } catch (error) {
         toast.error(
            'در حذف اسلاید خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   const removeFromDb = async () => {
      const payload = {
         _id,
      }

      try {
         const res = await fetch('/api/slide', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('اسلاید با موفقیت حذف شد.')
      } catch (err) {
         // ! delete the object from s3
         toast.error('در حذف اسلاید خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <div className='flex items-center justify-end drop-shadow space-x-3 absolute left-0 top-0 z-10'>
         {loading ? (
            <div className='py-2'>
               <CircularProgress color='error' size={20} />
            </div>
         ) : (
            <button type='button' onClick={handleDelete}>
               <svg
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
               </svg>
            </button>
         )}
      </div>
   )
}

export default SlideDelete
