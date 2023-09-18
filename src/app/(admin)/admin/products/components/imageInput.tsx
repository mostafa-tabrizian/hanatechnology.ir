import { useState, useMemo } from 'react'
import Image from 'next/legacy/image'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import ImageDelete from './imageDelete'
import filesSizeValidation from '@/lib/filesSizeValidation'
import filesTypeValidation from '@/lib/filesTypeValidation'
import imageUploadHandler from '@/lib/imageUploadHandler'

const ImageInput = ({
   params: { product },
}: {
   params: {
      product: { _id: string; thumbnail: string; images: string[] }
   }
}) => {
   const [imageToUpload, setImageToUpload] = useState<File[] | null>(null)
   const [loading, setLoading] = useState(false)

   const imageToUploadMemo = useMemo(() => {
      return imageToUpload && Object.values(imageToUpload)
   }, [imageToUpload])

   const createDbData = async (type: string, key: string, imageName: string) => {
      const payload = {
         type,
         key,
         _id: product._id,
      }

      try {
         const res = await fetch('/api/admin/product/image/db', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setImageToUpload(null)
         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
      } catch (err) {
         // ! delete the object from s3
         toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
         console.error(err)
      }
   }

   const onSubmit = async (type: string) => {
      if (!imageToUpload || !imageToUploadMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }
      if (!product._id) {
         return toast.error('در تعیین محصول خطایی رخ داده است!')
      }

      setLoading(true)

      try {
         for (const image of imageToUploadMemo) {
            const res = await imageUploadHandler(image, 'products')

            if (res) await createDbData(type, res.key, res.imageName)
            else throw new Error()
         }
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   // @ts-ignore
   const onChange = (e) => {
      const files = e?.target?.files

      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes = filesTypeValidation(filesList)
      if (!typeCheckRes) return

      const sizeCheckRes = filesSizeValidation(filesList)
      if (!sizeCheckRes) return

      setImageToUpload(files)
   }

   return (
      <div className='text-right space-y-4'>
         {imageToUploadMemo?.length ? (
            <div>
               <span className='text-slate-400'>پیش نمایش تصاویر برای آپلود</span>

               {imageToUploadMemo.map((imageData: File) => {
                  return (
                     <Image
                        key={imageData.name}
                        className='object-contain rounded-xl'
                        src={URL.createObjectURL(imageData)}
                        alt={imageData.name}
                        width='250'
                        height='250'
                        quality={100}
                        objectFit='contain'
                        loading='lazy'
                     />
                  )
               })}
            </div>
         ) : (
            ''
         )}

         <div className='space-y-6'>
            {product.thumbnail ? (
               <div>
                  <span className='text-slate-400'>تامبنیل محصول</span>

                  <div className='relative'>
                     <Image
                        className='object-contain rounded-xl'
                        src={product.thumbnail}
                        alt={product.thumbnail}
                        width='250'
                        height='250'
                        quality={100}
                        objectFit='contain'
                        loading='lazy'
                     />

                     <ImageDelete
                        type={'thumbnail'}
                        product={product._id}
                        imageUrl={product.thumbnail}
                     />
                  </div>
               </div>
            ) : (
               <div>
                  <div className='flex items-center justify-end space-x-3'>
                     {loading ? (
                        <div className='bg-slate-100 border-2 border-slate-200 rounded-lg p-1.5'>
                           <CircularProgress color='success' size={20} />
                        </div>
                     ) : (
                        <button
                           disabled={loading}
                           onClick={() => onSubmit('thumbnail')}
                           className='bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        >
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
                              <path d='M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />{' '}
                              <polyline points='9 15 12 12 15 15' />{' '}
                              <line x1='12' y1='12' x2='12' y2='21' />
                           </svg>
                        </button>
                     )}
                     <div className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'>
                        <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                           <span>انتخاب تامبنیل</span>
                           <input
                              hidden
                              accept='image/*'
                              type='file'
                              name='imageToUpload'
                              onChange={onChange}
                              disabled={loading}
                           />
                        </Button>
                     </div>
                  </div>
               </div>
            )}
         </div>

         <div className='space-y-3'>
            {product.images.length ? (
               <div>
                  <span className='text-slate-400'>تصاویر محصول</span>

                  <div>
                     {product.images.map((image) => {
                        return (
                           <div key={image} className='relative'>
                              <Image
                                 className='object-contain rounded-xl'
                                 src={image}
                                 alt={image}
                                 width='250'
                                 height='250'
                                 quality={100}
                                 objectFit='contain'
                                 loading='lazy'
                              />
                              <ImageDelete type={'images'} product={product._id} imageUrl={image} />
                           </div>
                        )
                     })}
                  </div>
               </div>
            ) : (
               ''
            )}

            <div className='flex items-center justify-end space-x-3'>
               {loading ? (
                  <div className='bg-slate-100 border-2 border-slate-200 rounded-lg p-1.5'>
                     <CircularProgress color='success' size={20} />
                  </div>
               ) : (
                  <button
                     disabled={loading}
                     onClick={() => onSubmit('images')}
                     className='bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                  >
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
                        <path d='M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />{' '}
                        <polyline points='9 15 12 12 15 15' />{' '}
                        <line x1='12' y1='12' x2='12' y2='21' />
                     </svg>
                  </button>
               )}
               <div className='w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg'>
                  <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                     <span>انتخاب تصاویر</span>
                     <input
                        hidden
                        accept='image/*'
                        type='file'
                        name='productImages'
                        onChange={onChange}
                        multiple
                        disabled={loading}
                     />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ImageInput
