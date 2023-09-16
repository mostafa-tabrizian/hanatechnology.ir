'use client'

import { useState, useMemo, ChangeEventHandler } from 'react'
import Image from 'next/legacy/image'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { SlideValidation } from '@/formik/schema/validation'

import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { Switch } from '@mui/material'

const NewSlide = () => {
   const router = useRouter()

   const [slideImageToUpload, setSlideImageToUpload] = useState<File[] | null>(null)

   const slideImageToUploadMemo = useMemo(() => {
      return slideImageToUpload && Object.values(slideImageToUpload)
   }, [slideImageToUpload])

   const createS3 = async (imageName: string) => {
      try {
         const res = await fetch('/api/product/image/s3', {
            method: 'POST',
            body: JSON.stringify({
               folder: 'slides',
               imageName,
            }),
         })

         if (!res.ok) throw new Error()

         return res
      } catch (err) {
         toast.error('در ایجاد لینک باکِت خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   const putInS3 = async (uploadUrl: string, image: File) => {
      try {
         const res = await fetch(uploadUrl, {
            method: 'PUT',
            body: image,
         })

         if (!res.ok) throw new Error()

         return res
      } catch (err) {
         toast.error('در آپلود عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   const createDbData = async (
      values: { alt: string; link: string; publicStatus: boolean },
      key: string,
      imageName: string,
   ) => {
      const payload = {
         values,
         key,
      }

      try {
         const res = await fetch('/api/slide', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         setSlideImageToUpload(null)
         router.refresh()
         toast.success(`تصویر ${imageName} با موفقیت آپلود شد.`)
      } catch (err) {
         // ! delete the object from s3
         toast.error(`در آپلود تصویر ${imageName} خطایی رخ داد!`)
         console.error(err)
      }
   }

   const handleSubmit = async (
      values: {
         alt: string
         link: string
         publicStatus: boolean
      },
      // @ts-ignore
      { resetForm },
   ) => {
      if (!slideImageToUpload || !slideImageToUploadMemo) {
         return toast.warning('هیچ تصویری برای آپلود انتخاب نشده است!')
      }

      try {
         if (!slideImageToUploadMemo[0]) return

         const image = slideImageToUploadMemo[0]

         const imageName = image.name.replace(' ', '-')

         const s3SignedUrl = await createS3(imageName)

         if (!s3SignedUrl) throw new Error('s3 signed url')

         const { key, uploadUrl } = await s3SignedUrl.json()

         const fileUploadResult = await putInS3(uploadUrl, image)

         if (!fileUploadResult) throw new Error('file upload to s3')

         await createDbData(values, key, imageName)

         resetForm()
      } catch (error) {
         toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
         )
         console.error(error)
      }
   }

   const checkIfFilesAreTooBig = (files: File[]): { valid: boolean; invalidFile: File | null } => {
      let valid = true
      let invalidFile = null

      files.map((file) => {
         const size = file.size / 1024 / 1024 // ex: 0.4 MB

         if (size > 0.1) {
            invalidFile = file
            valid = false
         }
      })

      return { valid, invalidFile }
   }

   const checkIfFilesAreCorrectType = (
      files: File[],
   ): { valid: boolean; invalidFile: File | null } => {
      let valid = true
      let invalidFile = null

      files.map((file) => {
         if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            invalidFile = file
            valid = false
         }
      })

      return { valid, invalidFile }
   }

   // @ts-ignore
   const handleSlideImageSelect = (e) => {
      const files = e?.target?.files

      if (!files) return

      const filesList: File[] = Object.values(files)

      const typeCheckRes: { invalidFile: File | null; valid: boolean } =
         checkIfFilesAreCorrectType(filesList)

      if (!typeCheckRes.valid && typeCheckRes.invalidFile)
         return toast.warning(
            `تایپ فایل ${typeCheckRes.invalidFile.name} می‌بایست png, jpeg یا webp باشد`,
         )

      const sizeCheckRes: { invalidFile: File | null; valid: boolean } =
         checkIfFilesAreTooBig(filesList)

      if (!sizeCheckRes.valid && sizeCheckRes.invalidFile) {
         const fileSize = Math.round((sizeCheckRes.invalidFile.size / 1024 / 1024) * 1000)
         toast.warning(
            `سایز فایل ${sizeCheckRes.invalidFile.name} برابر با ${fileSize} کیلوبایت می‌باشد. حداکثر هر فایل می‌بایست 100 کیلوبایت باشد`,
         )
         return
      }

      setSlideImageToUpload(files)
   }

   return (
      <div>
         <Formik
            initialValues={{
               alt: '',
               link: '#',
               publicStatus: false,
            }}
            validationSchema={SlideValidation}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='rtl mt-6 '>
                  <div className='text-sm flex w-fit mx-auto bg-blue-100 border-2 border-slate-200 rounded-xl'>
                     {slideImageToUploadMemo?.length ? (
                        <Image
                           key={slideImageToUploadMemo[0].name}
                           className='rounded-xl aspect-video'
                           src={URL.createObjectURL(slideImageToUploadMemo[0])}
                           alt={slideImageToUploadMemo[0].name}
                           width={690}
                           height={388.125}
                           objectFit='contain'
                        />
                     ) : (
                        <Button component='label' sx={{ width: '100%', padding: '.5rem' }}>
                           <span>انتخاب تصویر اسلاید</span>
                           <input
                              hidden
                              accept='image/*'
                              type='file'
                              name='slideImages'
                              onChange={handleSlideImageSelect}
                              disabled={isSubmitting}
                           />
                        </Button>
                     )}
                  </div>

                  <div className='flex items-end rtl gap-5 mt-6 '>
                     <div className='text-right space-y-1'>
                        <label htmlFor='alt'>
                           <span className='text-slate-400'>عنوان جایگزین</span>
                        </label>
                        {errors.alt && touched.alt ? (
                           <p className='text-sm text-red-500'>{errors.alt}</p>
                        ) : (
                           ''
                        )}
                        <input
                           name='alt'
                           onChange={(e) => setFieldValue('alt', e.target.value)}
                           value={values.alt}
                           className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                        />
                     </div>

                     <div className='text-right space-y-1'>
                        <label htmlFor='link'>
                           <span className='text-slate-400'>لینک صفحه</span>
                        </label>
                        {errors.link && touched.link ? (
                           <p className='text-sm text-red-500'>{errors.link}</p>
                        ) : (
                           ''
                        )}
                        <input
                           name='link'
                           onChange={(e) => setFieldValue('link', e.target.value)}
                           value={values.link}
                           className='mr-3 ltr w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                           type='text'
                        />
                     </div>

                     <div>
                        <span className='text-slate-400 block text-center'>عمومی</span>
                        <Switch
                           checked={values.publicStatus}
                           name='publicStatus'
                           color='success'
                           onChange={() => setFieldValue('publicStatus', !values.publicStatus)}
                        />
                     </div>

                     {isSubmitting ? (
                        <div className='bg-slate-100 border-2 border-slate-200 rounded-lg py-1 px-10'>
                           <CircularProgress color='success' size={20} />
                        </div>
                     ) : (
                        <button
                           disabled={isSubmitting}
                           className='bg-slate-100 border-2 border-slate-200 rounded-lg py-2 px-10'
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
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   )
}

export default NewSlide
