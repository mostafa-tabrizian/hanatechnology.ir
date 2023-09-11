'use client'

import { useEffect, useState } from 'react'

import { IProduct } from '@/models/product'
import stringtoDate from '@/lib/stringToDate'
import ProductCards from '@/components/product/cards'
import FilterComponent from './filter'
import SortComponent from './sort'

const Contents = ({ dbProducts }: { dbProducts: IProduct[] }) => {
   const [initProducts, setInitProducts] = useState<IProduct[]>(dbProducts)
   const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

   const [sortValue, setSortValue] = useState<string>('latest')
   const [typeValue, setTypeValue] = useState<string | null>(null)
   const [priceRangeFilter, setPriceRangeFilter] = useState([0, 100])
   const [categoryValue, setCategoryValue] = useState<string | null>(null)

   useEffect(() => {
      dbProducts?.sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
      setInitProducts(dbProducts)
      setFilteredProducts(dbProducts)
   }, [dbProducts])

   useEffect(() => {
      let newSort
      switch (sortValue) {
         case 'latest':
            newSort = filteredProducts
               .slice()
               .sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
            break
         case 'oldest':
            newSort = filteredProducts
               .slice()
               .sort((a, b) => stringtoDate(a.createdAt) - stringtoDate(b.createdAt))
            break
         case 'expensive':
            newSort = filteredProducts.slice().sort((a, b) => b.price - a.price)
            break
         case 'cheap':
            newSort = filteredProducts.slice().sort((a, b) => a.price - b.price)
            break
         default:
            newSort = filteredProducts
               .slice()
               .sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
            break
      }
      setFilteredProducts(newSort)
   }, [sortValue])

   useEffect(() => {
      switch (typeValue) {
         case 'discounted':
            setFilteredProducts(initProducts.filter((product) => product.discount !== 0))
            break
         default:
            break
      }
   }, [typeValue])

   useEffect(() => {
      setFilteredProducts(
         initProducts.filter(
            (product) =>
               priceRangeFilter[0] * 100_000 <= product.price &&
               product.price <= priceRangeFilter[1] * 100_000,
         ),
      )
   }, [priceRangeFilter])

   return (
      <div>
         <div>
            <div className='flex gap-x-4 text-gray-400 md:hidden mb-8'>
               <FilterComponent
                  params={{
                     priceRangeFilter,
                     setPriceRangeFilter,
                     typeValue,
                     setTypeValue,
                     categoryValue,
                     setCategoryValue,
                  }}
               />
               <SortComponent
                  params={{
                     sortValue,
                     setSortValue,
                  }}
               />
            </div>
         </div>
         <div className='py-5 grid grid-cols-2 gap-3'>
            {filteredProducts?.map((product) => {
               return <ProductCards key={product._id} product={product} />
            })}
         </div>
      </div>
   )
}

export default Contents
