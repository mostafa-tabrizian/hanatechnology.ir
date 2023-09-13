'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Slider from '@mui/material/Slider'
import { IBrand } from '@/models/brand'

const FilterComponent = ({
   params: {
      priceRangeFilter,
      setPriceRangeFilter,
      typeValue,
      setTypeValue,
      brandValue,
      setBrandValue,
      brands,
   },
}: {
   params: {
      priceRangeFilter: number[]
      setPriceRangeFilter: Dispatch<SetStateAction<number[]>>
      typeValue: string | null
      setTypeValue: Dispatch<SetStateAction<string | null>>
      brandValue: string | null
      setBrandValue: Dispatch<SetStateAction<string | null>>
      brands: IBrand[]
   }
}) => {
   const [filterToolsDrawer, setFilterToolsDrawer] = useState(false)
   const [typeCollapse, setTypeCollapse] = useState(false)
   const [brandCollapse, setBrandCollapse] = useState(false)

   const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
         event.type === 'keydown' &&
         ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
      ) {
         return
      }

      setFilterToolsDrawer(false)
      setTypeCollapse(false)
      setBrandCollapse(false)
   }

   return (
      <>
         <button
            onClick={() => setFilterToolsDrawer(true)}
            className='border rounded-2xl border-slate-200 bg-white shadow shadow-slate-200 flex py-2 justify-center items-center flex-1'
         >
            <span className='font-bold text-slate-600 text-base'>فیلتر محصولات</span>
            <svg
               stroke='currentColor'
               fill='none'
               strokeWidth='0'
               viewBox='0 0 24 24'
               className='w-5 h-5 text-gray-400 ml-2'
               height='1em'
               width='1em'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
               ></path>
            </svg>
         </button>

         <Drawer anchor='bottom' open={filterToolsDrawer} onClose={toggleDrawer()}>
            <div className='p-6 bg-slate-100'>
               <div className='text-center'>
                  <span className='font-bold text-base'>فیلتر محصولات</span>
               </div>

               <div className='bg-white text-right py-2 my-6 px-5 rounded-xl'>
                  <span>
                     بازه قیمتی از{' '}
                     <span className='mx-2'>
                        {(priceRangeFilter[0] * 200_000).toLocaleString('fa')} تومان
                     </span>{' '}
                     تا{' '}
                     <span className='mx-2'>
                        {(priceRangeFilter[1] * 200_000).toLocaleString('fa')} تومان
                     </span>
                  </span>

                  <Slider
                     getAriaLabel={() => 'بازه قیمتی'}
                     value={priceRangeFilter}
                     onChange={(e, newValue) => setPriceRangeFilter(newValue as number[])}
                     valueLabelDisplay='auto'
                     getAriaValueText={(value) => `تومان ${(value * 200_000).toLocaleString('fa')}`}
                     valueLabelFormat={(value) => `تومان ${(value * 200_000).toLocaleString('fa')}`}
                  />
               </div>

               <div className='bg-white py-2 my-6 px-5 rounded-xl'>
                  <button
                     className='flex justify-between w-full'
                     onClick={() => setTypeCollapse((prev) => !prev)}
                  >
                     <div>
                        <svg
                           stroke='currentColor'
                           fill='none'
                           strokeWidth='0'
                           viewBox='0 0 24 24'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 9l-7 7-7-7'
                           ></path>
                        </svg>
                     </div>
                     <div className='flex gap-x-2'>
                        <span className='font-bold text-base'>نوع محصولات</span>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 20 20'
                           fill='none'
                           className='w-5 h-5 text-secondary-700'
                        >
                           <path
                              fill='currentColor'
                              d='M18.333 5v2.017c0 1.316-.833 2.15-2.15 2.15h-2.85V3.342c0-.925.759-1.675 1.684-1.675a3.35 3.35 0 0 1 2.341.975c.6.608.975 1.441.975 2.358Z'
                           ></path>
                           <path
                              fill='currentColor'
                              d='M1.667 5.833V17.5A.83.83 0 0 0 3 18.167L4.425 17.1a.84.84 0 0 1 1.1.083l1.383 1.392a.84.84 0 0 0 1.184 0l1.4-1.4a.826.826 0 0 1 1.083-.075L12 18.167a.835.835 0 0 0 1.333-.667V3.333c0-.916.75-1.666 1.667-1.666H5C2.5 1.667 1.667 3.158 1.667 5v.833Z'
                              opacity='0.4'
                           ></path>
                           <path
                              fill='currentColor'
                              d='M10 8.125H5a.63.63 0 0 1-.625-.625A.63.63 0 0 1 5 6.875h5a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Zm-.625 3.333h-3.75A.63.63 0 0 1 5 10.833a.63.63 0 0 1 .625-.625h3.75a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z'
                           ></path>
                        </svg>
                     </div>
                  </button>
                  <Collapse in={typeCollapse}>
                     <hr />
                     <RadioGroup
                        aria-labelledby='demo-controlled-radio-buttons-group'
                        name='controlled-radio-buttons-group'
                        value={typeValue}
                        className='rtl'
                        onChange={(e) => setTypeValue((e.target as HTMLInputElement).value)}
                     >
                        <FormControlLabel
                           value='discounted'
                           control={<Radio />}
                           label='تخفیف دار'
                        />
                     </RadioGroup>
                  </Collapse>
               </div>
               <div className='bg-white py-2 my-6 px-5 rounded-xl'>
                  <button
                     className='flex justify-between w-full'
                     onClick={() => setBrandCollapse((prev) => !prev)}
                  >
                     <div>
                        <svg
                           stroke='currentColor'
                           fill='none'
                           strokeWidth='0'
                           viewBox='0 0 24 24'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 9l-7 7-7-7'
                           ></path>
                        </svg>
                     </div>
                     <div className='flex gap-x-2'>
                        <span className='font-bold text-base'>برند محصولات</span>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 48 48'
                           fill='none'
                           className='w-5 h-5 text-secondary-700'
                        >
                           <path
                              fill='currentColor'
                              d='M32.151 4h6.772C41.727 4 44 6.292 44 9.12v6.829c0 2.828-2.273 5.12-5.077 5.12h-6.772c-2.805 0-5.077-2.292-5.077-5.12v-6.83C27.074 6.293 29.346 4 32.151 4Z'
                              opacity='0.4'
                           ></path>
                           <path
                              fill='currentColor'
                              d='M15.849 26.931c2.805 0 5.077 2.292 5.077 5.12v6.83c0 2.825-2.272 5.119-5.077 5.119H9.077C6.273 44 4 41.706 4 38.88v-6.829c0-2.828 2.273-5.12 5.077-5.12h6.772Zm23.074 0c2.804 0 5.077 2.292 5.077 5.12v6.83C44 41.705 41.727 44 38.923 44h-6.772c-2.805 0-5.077-2.294-5.077-5.12v-6.829c0-2.828 2.272-5.12 5.077-5.12h6.772ZM15.849 4c2.805 0 5.077 2.292 5.077 5.12v6.829c0 2.828-2.272 5.12-5.077 5.12H9.077C6.273 21.069 4 18.777 4 15.949v-6.83C4 6.293 6.273 4 9.077 4h6.772Z'
                           ></path>
                        </svg>
                     </div>
                  </button>
                  <Collapse in={brandCollapse}>
                     <hr />
                     <RadioGroup
                        aria-labelledby='demo-controlled-radio-buttons-group'
                        name='controlled-radio-buttons-group'
                        value={brandValue}
                        className='rtl'
                        onChange={(e) => setBrandValue((e.target as HTMLInputElement).value)}
                     >
                        {brands.map((brand) => (
                           <FormControlLabel
                              key={brand._id}
                              value={brand._id}
                              control={<Radio />}
                              label={`${brand.name} | ${brand.slug}`}
                           />
                        ))}
                     </RadioGroup>
                  </Collapse>
               </div>
               <Button
                  onClick={toggleDrawer()}
                  variant='contained'
                  sx={{
                     borderRadius: '15px',
                     width: '100%',
                     padding: '.5rem 0',
                     marginButton: '1.5rem',
                  }}
               >
                  اعمال فیلتر
               </Button>
            </div>
         </Drawer>
      </>
   )
}

export default FilterComponent
