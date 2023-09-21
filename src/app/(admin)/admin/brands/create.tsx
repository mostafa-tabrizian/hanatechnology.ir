'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import { NameSlugValidation } from '@/formik/schema/validation'

const BrandNewInput = () => {
   const router = useRouter()

   const handleSubmit = async (
      { name, slug }: { name: string; slug: string },
      // @ts-ignore
      { resetForm },
   ) => {
      const payload = {
         name: name.trim(),
         slug: slug.trim().toLowerCase(),
      }

      try {
         const res = await fetch('/api/admin/brand', {
            method: 'POST',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.message == 'notUnique')
            return toast.warning('این برند از قبل ثبت شده است')
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('در ثبت اطلاعات خطایی رخ داد')
         }

         toast.success('برند با موفقیت ثبت گردید')
         resetForm()
         router.refresh()
      } catch (err) {
         toast.warning('در ثبت برند خطایی رخ داد')
         console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            name: '',
            slug: '',
         }}
         validationSchema={NameSlugValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='flex justify-center rtl items-start space-x-3 space-x-reverse w-full'>
               <div className='text-right mr-3 space-y-1'>
                  <input
                     placeholder='نام'
                     name='name'
                     onChange={(e) => setFieldValue('name', e.target.value)}
                     value={values.name}
                     className='rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                     type='text'
                  />
                  {errors.name && touched.name ? (
                     <p className='text-sm text-red-500 text-right'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>
               <div className='text-right mr-3 space-y-1'>
                  <input
                     placeholder='اسلاگ'
                     name='slug'
                     onChange={(e) => setFieldValue('slug', e.target.value)}
                     value={values.slug}
                     className='rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                     type='text'
                  />
                  
                  <p className='text-[.6rem] text-yellow-500 text-right'>
                     اسلاگ غیر قابل تغییر خواهد بود
                  </p>

                  {errors.slug && touched.slug ? (
                     <p className='text-sm text-red-500 text-right'>{errors.slug}</p>
                  ) : (
                     ''
                  )}
               </div>
               <button type='submit'>
                  {isSubmitting ? (
                     <CircularProgress color='success' size={25} />
                  ) : (
                     <svg
                        className='h-8 w-8 text-slate-500'
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
                        <line x1='12' y1='5' x2='12' y2='19' />{' '}
                        <line x1='5' y1='12' x2='19' y2='12' />
                     </svg>
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default BrandNewInput
