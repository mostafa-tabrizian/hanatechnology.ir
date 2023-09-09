'use client'

import useSWR from 'swr'

import { IProduct } from '@/models/product'
import ProductCards from '@/components/product/cards'
import fetcher from '@/lib/fetcher'

const Products = () => {
   const {
      data: products,
      isLoading,
      error,
   }: { data: [IProduct]; isLoading: boolean; error: unknown } = useSWR('/api/product', fetcher)

   return (
      <ProductCards
         // @ts-ignore
         products={products}
         pageTarget='/product/'
         userTarget='client'
      />
   )
}

export default Products
