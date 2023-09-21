'use client'

import Link from 'next/link'
import Image from 'next/legacy/image'

import { DataGrid } from '@mui/x-data-grid'
import { IProduct } from '@/models/product'

interface IColumns {
   field: string
   headerName: JSX.Element
   width: number
   type: string
   renderCell: ({ value }: { value: string | number }) => JSX.Element
}

const ProductsTable = ({ products }: { products: IProduct[] }) => {
   const columns: IColumns[] = [
      {
         field: 'id',
         headerName: <span>ردیف</span>,
         width: 30,
         type: 'number',
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'thumbnail',
         headerName: <span>تصویر</span>,
         width: 80,
         type: 'element',
         renderCell: ({ value }) => (
            <Link
               target='_blank'
               href={`https://tabrizian.storage.iran.liara.space/hanatechnology/products/${
                  value as string
               }`}
            >
               <Image
                  className='rounded-xl'
                  src={`https://tabrizian.storage.iran.liara.space/hanatechnology/products/${
                     value as string
                  }`}
                  alt={String(value)}
                  height={50}
                  width={50}
                  objectFit='cover'
               />
            </Link>
         ),
      },
      {
         field: 'active',
         headerName: <span>فعال</span>,
         width: 75,
         type: 'element',
         renderCell: ({ value }) =>
            value ? (
               <svg
                  className='h-5 w-5 text-green-700'
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
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M9 12l2 2l4 -4' />
               </svg>
            ) : (
               <svg
                  className='h-5 w-5 text-rose-700'
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
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M10 10l4 4m0 -4l-4 4' />
               </svg>
            ),
      },
      {
         field: 'inStock',
         headerName: <span>موجود</span>,
         width: 75,
         type: 'element',
         renderCell: ({ value }) =>
            value ? (
               <svg
                  className='h-5 w-5 text-green-700'
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
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M9 12l2 2l4 -4' />
               </svg>
            ) : (
               <svg
                  className='h-5 w-5 text-rose-700'
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
                  <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' />{' '}
                  <path d='M10 10l4 4m0 -4l-4 4' />
               </svg>
            ),
      },
      {
         field: 'name',
         headerName: <span>عنوان</span>,
         width: 300,
         type: 'element',
         renderCell: ({ value }) => (
            <Link href={`/admin/products/${(value as string).replaceAll(' ', '-')}`}>
               <span>{value}</span>
            </Link>
         ),
      },
      {
         field: 'price',
         headerName: <span>قیمت</span>,
         type: 'element',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'discount',
         headerName: <span>تخفیف</span>,
         type: 'element',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },

      {
         field: 'createdAt',
         headerName: <span>تاریخ ایجاد</span>,
         type: 'element',
         width: 200,
         renderCell: ({ value }) => <span>{value}</span>,
      },
   ]

   const rows = products?.map((product, index) => {
      return {
         id: index,
         ...product,
      }
   })

   return (
      <div style={{ width: '100%' }} className='rtl'>
         <DataGrid
            rows={rows}
            // @ts-ignore
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
               },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            density='comfortable'
         />
      </div>
   )
}

export default ProductsTable
