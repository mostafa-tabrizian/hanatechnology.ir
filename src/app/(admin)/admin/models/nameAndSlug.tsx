'use client'

import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { BrandValidation } from '@/formik/schema/validation'

const NameAndSlug = ({ params }: { params: { _id: string; name: string; slug: string } }) => {
   const name = params.name.charAt(0).toUpperCase() + params.name.slice(1)
   const slug = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

   const handleSubmit = async ({ name, slug }: { name: string; slug: string }) => {
      const payload = {
         _id: params._id,
         name: name.trim().toLowerCase(),
         slug: slug.trim().toLowerCase(),
      }

      try {
         const res = await fetch('/api/admin/model', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('نام دسته بندی با موفقیت تغییر کرد')
      } catch (err) {
         toast.error('در تغییر نام دسته بندی خطایی رخ داد')
         console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            name: name,
            slug: slug,
         }}
         validationSchema={BrandValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched, submitForm }) => (
            <Form className='grid grid-cols-4 col-span-4 rtl items-center w-full'>
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
                     <input
                        disabled={isSubmitting}
                        placeholder='اسلاگ'
                        name='slug'
                        onChange={(e) => setFieldValue('slug', e.target.value)}
                        value={values.slug}
                        className='w-full text-sm bg-transparent'
                        type='text'
                        onKeyDown={(e) => {
                           if (e.key == 'Enter') submitForm()
                        }}
                     />
                  </div>

                  {errors.slug && touched.slug ? (
                     <p className='text-sm text-red-500 text-right'>{errors.slug}</p>
                  ) : (
                     ''
                  )}
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default NameAndSlug
