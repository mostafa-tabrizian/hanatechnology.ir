'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

import deleteFromS3Bucket from '@/lib/deleteFromS3Bucket'
import CircularProgress from '@mui/material/CircularProgress'

const ImageDelete = ({
   type,
   imageUrl,
   product,
}: {
   type: string
   imageUrl: string
   product: string
}) => {
   const [loading, setLoading] = useState(false)

   const handleDelete = async () => {
      if (!imageUrl) {
         return toast.warning('در حذف تصویر خطایی رخ داده است!')
      }

      if (!product) {
         return toast.error('در تعیین محصول خطایی رخ داده است!')
      }

      setLoading(true)

      try {
         const fileUploadResult = await deleteFromS3Bucket(imageUrl, 'products')

         if (!fileUploadResult) throw new Error('file upload to s3')

         await removeFromDb()
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   const removeFromDb = async () => {
      const payload = {
         type,
         key: imageUrl,
         _id: product,
      }

      try {
         const res = await fetch('/api/product/image/db', {
            method: 'DELETE',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('تصویر با موفقیت حذف شد.')
      } catch (err) {
         // ! delete the object from s3
         toast.error('در حذف تصویر خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <div className='flex items-center justify-end space-x-3 absolute -left-5 top-0'>
         {loading ? (
            <div className='py-2'>
               <CircularProgress color='success' size={15} />
            </div>
         ) : (
            <button type='button' onClick={handleDelete}>
               <svg
                  className='h-4 w-4 text-slate-400'
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
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />{' '}
                  <line x1='6' y1='6' x2='18' y2='18' />
               </svg>
            </button>
         )}
      </div>
   )
}

export default ImageDelete
