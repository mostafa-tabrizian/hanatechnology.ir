'use client'

import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { NameSlugValidation } from '@/formik/schema/validation'

const NameAndSlug = ({ params }: { params: { _id: string; name: string; slug: string } }) => {
   const name = params.name.charAt(0).toUpperCase() + params.name.slice(1)
   const slug = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

   const handleSubmit = async ({ name }: { name: string }) => {
      const payload = {
         _id: params._id,
         name: name.trim(),
      }

      try {
         const res = await fetch('/api/admin/model', {
            method: 'PATCH',
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

         return toast.success('نام دسته بندی با موفقیت تغییر یافت')
      } catch (err) {
         toast.error('در تغییر نام دسته بندی خطایی رخ داد')
         return console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            name,
            slug,
         }}
         validationSchema={NameSlugValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched, submitForm }) => (
            <Form className='grid grid-cols-4 col-span-4 rtl items-start w-full'>
               <div className='col-span-2'>
                  <div className='text-right space-y-1 ml-2'>
                     <input
                        disabled={isSubmitting}
                        placeholder='نام'
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        className='w-full text-sm bg-transparent'
                        type='text'
                        onKeyDown={(e) => {
                           if (e.key == 'Enter') submitForm()
                        }}
                     />
                  </div>

                  {errors.name && touched.name ? (
                     <p className='text-sm text-red-500 text-right'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>
               <div className='col-span-2'>
                  <div className='text-right space-y-1'>
                     <input name='slug' value={slug} className='w-full text-sm bg-transparent' />
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default NameAndSlug
