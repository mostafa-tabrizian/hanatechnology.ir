'use client'

import { useEffect, useState } from 'react'

import { IProduct } from '@/models/product'
import stringtoDate from '@/lib/stringToDate'
import ProductCards from '@/components/product/cards'
import FilterComponent from './filter'
import SortComponent from './sort'
import { IBrand } from '@/models/brand'
import { IModel } from '@/models/model'

const Contents = ({
   params: { dbProducts, brands, models },
}: {
   params: {
      dbProducts: IProduct[]
      brands: IBrand[]
      models: IModel[]
   }
}) => {
   const [initProducts, setInitProducts] = useState<IProduct[]>(dbProducts)
   const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

   const [filters, setFilters] = useState<{
      type: null | string
      priceRange: number[]
      brand: null | string
      model: null | string
   }>({
      type: null,
      priceRange: [0, 100],
      brand: null,
      model: null,
   })

   const [sortValue, setSortValue] = useState<string>('latest')

   useEffect(() => {
      dbProducts?.sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
      setInitProducts(dbProducts)
      setFilteredProducts(dbProducts)
   }, [dbProducts])

   useEffect(() => handleSort(filteredProducts), [sortValue])
   useEffect(() => handleFilter(), [filters])

   const handleFilter = () => {
      let products = initProducts

      if (filters.type) {
         switch (filters.type) {
            case 'discounted':
               products = products.filter((product) => product.discount !== 0)
         }
      }

      if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100) {
         products = products.filter(
            (product) =>
               filters.priceRange[0] * 200_000 <= product.price &&
               product.price <= filters.priceRange[1] * 200_000,
         )
      }

      if (filters.brand) {
         products = products.filter((product) => product.brand == filters.brand)
      }

      setFilteredProducts(products)
      if (products) handleSort(products)
   }

   const handleSort = (products: IProduct[]) => {
      let newSort
      switch (sortValue) {
         case 'latest':
            newSort = products
               .slice()
               .sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
            break
         case 'oldest':
            newSort = products
               .slice()
               .sort((a, b) => stringtoDate(a.createdAt) - stringtoDate(b.createdAt))
            break
         case 'expensive':
            newSort = products.slice().sort((a, b) => b.price - a.price)
            break
         case 'cheap':
            newSort = products.slice().sort((a, b) => a.price - b.price)
            break
      }
      if (newSort) setFilteredProducts(newSort)
   }

   return (
      <div>
         <div>
            <div className='flex gap-x-4 text-gray-400 md:hidden mb-8'>
               <FilterComponent
                  params={{
                     filters,
                     setFilters,
                     brands,
                     models
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
               if (product.public) {
                  return <ProductCards key={product._id} product={product} />
               }
            })}
         </div>
      </div>
   )
}

export default Contents
