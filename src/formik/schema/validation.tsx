import * as yup from 'yup'
import * as rule from './rules'

export const ProductSchemaValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('توضیحات محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),

   brand: yup.string().required('برند محصول را وارد کنید'),
})

export const NameAndDescriptionSchemaValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),
})