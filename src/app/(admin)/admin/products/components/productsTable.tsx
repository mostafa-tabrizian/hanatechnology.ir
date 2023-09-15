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
            <Image
               className='rounded-xl'
               src={`/product/${value}`}
               alt={String(value)}
               height={50}
               width={50}
               objectFit='cover'
            />
         ),
      },
      {
         field: 'name',
         headerName: <span>عنوان</span>,
         width: 250,
         type: 'element',
         renderCell: ({ value }) => (
            <Link href={`/admin/products/${value}`}>
               <span>{value}</span>
            </Link>
         ),
      },
      {
         field: 'price',
         headerName: <span>قیمت</span>,
         type: 'number',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
      },
      {
         field: 'discount',
         headerName: <span>تخفیف</span>,
         type: 'number',
         width: 100,
         renderCell: ({ value }) => <span>{value.toLocaleString('fa')}</span>,
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
