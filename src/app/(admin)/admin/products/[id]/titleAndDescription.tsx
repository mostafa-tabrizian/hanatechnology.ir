'use client'

import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'

import { NameAndDescriptionSchemaValidation } from '@/formik/schema/validation'

const ProductNameDescription = ({
   id,
   name,
   description,
}: {
   id: string
   name: string
   description: string | null
}) => {
   const handleSubmit = async (values: { name: string; description: string }) => {
      const submitData: { name?: string; description?: string } = {}

      if (values.name !== name) submitData.name = values.name
      if (values.description !== description) submitData.description = values.description

      if (!Object.keys(submitData).length) return

      const payload = {
         id: id,
         data: submitData,
      }

      try {
         const res = await fetch('/api/product', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('تغییرات با موفقیت ثبت گردید.')
      } catch (err) {
         toast.error('در ثبت تغییرات خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            name: name,
            description: description || '',
         }}
         validationSchema={NameAndDescriptionSchemaValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, handleBlur, isSubmitting, errors, touched }) => (
            <Form className='flex justify-center space-x-2'>
               {Object.keys(touched).length && !errors.name && !errors.description ? (
                  <button
                     type='submit'
                     disabled={isSubmitting}
                     className='border-2 border-green-600 px-1 rounded-md'
                  >
                     {isSubmitting ? (
                        <div className='flex justify-center'>
                           <CircularProgress color='success' size={25} />
                        </div>
                     ) : (
                        'ذخیره'
                     )}
                  </button>
               ) : (
                  ''
               )}

               <div className='space-y-5 '>
                  <div className='justify-end flex space-x-5 bg-blue-50 rounded-lg p-3'>
                     <input
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        onBlur={handleBlur}
                        value={values.name}
                        className='mr-3 w-full bg-transparent'
                        type='text'
                        placeholder='عنوان محصول'
                     />
                     <h2>:عنوان</h2>
                  </div>

                  {errors.name && touched.name ? (
                     <p className='text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}

                  <div className='justify-end flex space-x-5 bg-blue-50 rounded-lg p-3'>
                     <textarea
                        name='description'
                        onChange={(e) => setFieldValue('description', e.target.value)}
                        rows={3}
                        onBlur={handleBlur}
                        value={values.description}
                        className='mr-3 w-full bg-transparent'
                        placeholder='توضیحات محصول'
                     />
                     <h2>:توضیحات</h2>
                  </div>

                  {errors.description && touched.description ? (
                     <p className='text-sm text-red-500'>{errors.description}</p>
                  ) : (
                     ''
                  )}
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default ProductNameDescription
