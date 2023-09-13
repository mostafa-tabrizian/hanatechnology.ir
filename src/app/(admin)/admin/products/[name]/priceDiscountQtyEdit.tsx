'use client'

import { useRef } from 'react'
import { toast } from 'react-toastify'

type PropsType = {
   _id: string
   price: string
   discount: string
}

const PriceDiscountEdit = ({ params: { _id, price, discount } }: { params: PropsType }) => {
   const priceRef = useRef<HTMLInputElement>(null)
   const discountRef = useRef<HTMLInputElement>(null)

   const checkKey = (e: { key: string }) => {
      if (e.key == 'Enter') submit()
   }

   const submit = async () => {
      const payload = {
         _id: _id,
         price: priceRef?.current?.value,
         discount: discountRef?.current?.value,
      }

      try {
         const res = await fetch('/api/course', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         if (!res.ok) throw new Error()

         toast.success('تغییرات با موفقیت ثبت گردید')
      } catch (err) {
         toast.error('در ثبت تغییرات خطایی رخ داد!')
         console.error(err)
      }
   }

   return (
      <div className='space-y-5'>
         <div className='flex ml-auto w-fit bg-slate-200 rounded-lg p-3'>
            <input
               ref={priceRef}
               className='bg-transparent placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm'
               min={0}
               placeholder={price.toLocaleString()}
               onKeyDown={checkKey}
               type='number'
               name='priceInput'
               id='priceInput'
            />
            <label htmlFor='priceInput'>
               <h2> :قیمت</h2>
            </label>
         </div>
         <div className='flex ml-auto w-fit bg-slate-200 rounded-lg p-3'>
            <input
               ref={discountRef}
               className='bg-transparent placeholder:text-black placeholder:font-semibold placeholder:text-sm font-semibold text-sm w-20'
               min={0}
               max={100}
               placeholder={discount.toLocaleString()}
               onKeyDown={checkKey}
               type='number'
               name='discountInput'
               id='discountInput'
            />
            <label htmlFor='discountInput'>
               <h2> :تخفیف به تومان</h2>
            </label>
         </div>
      </div>
   )
}

export default PriceDiscountEdit
