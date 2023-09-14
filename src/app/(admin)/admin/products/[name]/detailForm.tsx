'use client'

import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { IProduct } from '@/models/product'
import { ICategory } from '@/models/category'
import { IBrand } from '@/models/brand'
import { IModel } from '@/models/model'

import { Switch } from '@mui/material'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Autocomplete from '@mui/material/Autocomplete'

import { ProductEditForm } from '@/formik/schema/validation'

const DetailForm = ({
   params: { product, categories, brands, models },
}: {
   params: {
      product: IProduct
      categories: ICategory[]
      brands: IBrand[]
      models: IModel[]
   }
}) => {
   // @ts-ignore
   const [selectedCategoryId, selectCategoryId] = useState(product.category._id)
   const [categoryModels, setCategoryModels] = useState([])

   const handleSubmit = async (values: {
      barcode: string
      name: string
      slug: string
      description: string
      category: object
      brand: object
      model: object
      price: number
      discount: number
      detail: object
      publicStatus: boolean
   }) => {
      try {
         const payload = {
            _id: product._id,
            ...values,
         }

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

   useEffect(() => {
      const matchedCategoryModels: IModel[] = []

      models.map((model) => {
         if (model.category == selectedCategoryId) {
            matchedCategoryModels.push(model)
         }
      })

      // @ts-ignore
      setCategoryModels(matchedCategoryModels)
   }, [selectedCategoryId])

   return (
      <Formik
         initialValues={{
            barcode: product.barcode,
            name: product.name,
            slug: product.slug,
            description: product.description,
            // @ts-ignore
            category: product.category,
            // @ts-ignore
            brand: product.brand,
            // @ts-ignore
            model: product.model,
            price: product.price,
            discount: product.discount,
            // @ts-ignore
            detail: JSON.stringify(product.detail),
            publicStatus: product.public,
         }}
         validationSchema={ProductEditForm}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='flex justify-end gap-2 mt-6'>
               <div className='space-y-5 w-full'>
                  <div className='text-right space-y-1'>
                     <label htmlFor='barcode'>
                        <span className='text-slate-400'>کد محصول</span>
                     </label>
                     <input
                        name='barcode'
                        onChange={(e) => setFieldValue('barcode', e.target.value)}
                        value={values.barcode}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        type='text'
                     />
                  </div>

                  {errors.barcode && touched.barcode ? (
                     <p className='text-sm text-red-500'>{errors.barcode}</p>
                  ) : (
                     ''
                  )}

                  <div className='text-right space-y-1'>
                     <label htmlFor='name'>
                        <span className='text-slate-400'>عنوان محصول</span>
                     </label>
                     <input
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        type='text'
                     />
                  </div>

                  {errors.name && touched.name ? (
                     <p className='text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}

                  <div className='text-right space-y-1'>
                     <label htmlFor='slug'>
                        <span className='text-slate-400'>اسلاگ محصول</span>
                     </label>
                     <input
                        name='slug'
                        onChange={(e) => setFieldValue('slug', e.target.value)}
                        value={values.slug}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        type='text'
                     />
                  </div>

                  {errors.slug && touched.slug ? (
                     <p className='text-sm text-red-500'>{errors.slug}</p>
                  ) : (
                     ''
                  )}

                  <div className='text-right space-y-1'>
                     <label htmlFor='slug'>
                        <span className='text-slate-400'>توضیحات</span>
                     </label>
                     <textarea
                        name='description'
                        onChange={(e) => setFieldValue('description', e.target.value)}
                        rows={8}
                        value={values.description}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                     />
                  </div>

                  {errors.description && touched.description ? (
                     <p className='text-sm text-red-500'>{errors.description}</p>
                  ) : (
                     ''
                  )}

                  <Autocomplete
                     className='rtl'
                     id='category'
                     value={values.category as unknown as ICategory}
                     options={categories}
                     isOptionEqualToValue={(option, value) => option._id === value._id}
                     getOptionLabel={(option: ICategory) => option.name}
                     onChange={(e, value) => {
                        if (value) {
                           selectCategoryId(value._id)
                           setFieldValue('category', value)
                        }
                     }}
                     renderInput={(params) => <TextField {...params} label='دسته بندی' />}
                     sx={{ width: '100%' }}
                  />

                  {errors.category && touched.category ? (
                     // @ts-ignore
                     <p className='text-sm text-red-500'>{errors.category}</p>
                  ) : (
                     ''
                  )}

                  <Autocomplete
                     className='rtl'
                     id='brand'
                     value={values.brand as unknown as IBrand}
                     options={brands}
                     isOptionEqualToValue={(option, value) => option._id === value._id}
                     getOptionLabel={(option: IBrand) => option.name}
                     onChange={(e, value) => value && setFieldValue('brand', value)}
                     renderInput={(params) => <TextField {...params} label='برند' />}
                     sx={{ width: '100%' }}
                  />

                  {errors.brand && touched.brand ? (
                     // @ts-ignore
                     <p className='text-sm text-red-500'>{errors.brand}</p>
                  ) : (
                     ''
                  )}

                  <Autocomplete
                     className='rtl'
                     id='model'
                     value={values.model as unknown as IModel}
                     options={categoryModels}
                     isOptionEqualToValue={(option, value) => option._id === value._id}
                     getOptionLabel={(option: IModel) => option.name}
                     onChange={(e, value) => value && setFieldValue('model', value)}
                     renderInput={(params) => <TextField {...params} label='مدل' />}
                     sx={{ width: '100%' }}
                  />

                  {errors.model && touched.model ? (
                     // @ts-ignore
                     <p className='text-sm text-red-500'>{errors.model}</p>
                  ) : (
                     ''
                  )}

                  <div className='text-right space-y-1'>
                     <label htmlFor='price'>
                        <span className='text-slate-400'>قیمت به تومان</span>
                     </label>
                     <input
                        name='price'
                        onChange={(e) => setFieldValue('price', e.target.value)}
                        value={values.price}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        type='number'
                     />
                  </div>

                  {errors.price && touched.price ? (
                     <p className='text-sm text-red-500'>{errors.price}</p>
                  ) : (
                     ''
                  )}

                  <div className='text-right space-y-1'>
                     <label htmlFor='discount'>
                        <span className='text-slate-400'>تخفیف به تومان</span>
                     </label>
                     <input
                        name='discount'
                        onChange={(e) => setFieldValue('discount', e.target.value)}
                        value={values.discount}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                        type='number'
                     />
                  </div>

                  {errors.discount && touched.discount ? (
                     <p className='text-sm text-red-500'>{errors.discount}</p>
                  ) : (
                     ''
                  )}

                  <div className='text-right space-y-1'>
                     <label htmlFor='detail'>
                        <span className='text-slate-400'>جزئیات با فرمت آبجکت</span>
                     </label>
                     <textarea
                        name='detail'
                        onChange={(e) => setFieldValue('detail', e.target.value)}
                        rows={8}
                        // @ts-ignore
                        value={values.detail}
                        className='mr-3 rtl w-full text-sm bg-slate-100 border-2 border-slate-200 rounded-lg p-2'
                     />
                  </div>

                  {errors.detail && touched.detail ? (
                     // @ts-ignore
                     <p className='text-sm text-red-500'>{errors.detail}</p>
                  ) : (
                     ''
                  )}

                  <div className='flex items-center gap-5 rtl'>
                     <span className='text-slate-400'>عمومی</span>

                     <Switch
                        checked={values.publicStatus}
                        name='publicStatus'
                        color='success'
                        onChange={() => setFieldValue('publicStatus', !values.publicStatus)}
                     />
                  </div>

                  <button
                     type='submit'
                     disabled={isSubmitting}
                     className='border-2 border-green-600 w-full rounded-lg'
                  >
                     {isSubmitting ? <CircularProgress color='success' size={25} /> : 'ذخیره'}
                  </button>
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default DetailForm
