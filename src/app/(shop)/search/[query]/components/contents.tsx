'use client'

import { useEffect, useState, memo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { IProduct } from '@/models/product'
import stringtoDate from '@/lib/stringToDate'
import ProductCards from '@/components/product/cards'
import FilterComponent, { FilterOptions } from './filter'
import SortComponent, { SortOptions } from './sort'
import { IBrand } from '@/models/brand'
import { IModel } from '@/models/model'

const Contents = memo(
   ({
      params: { dbProducts, brands, models },
   }: {
      params: {
         dbProducts: IProduct[]
         brands: IBrand[]
         models: IModel[]
      }
   }) => {
      const [loading, setLoading] = useState(true)
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
         return () => {
            setInitProducts([])
            setFilteredProducts([])
         }
      }, [])

      useEffect(() => {
         dbProducts?.sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))
         setInitProducts(dbProducts)
         setFilteredProducts(dbProducts)
         setLoading(false)
      }, [dbProducts])

      useEffect(() => {
         const handleSort = (products: IProduct[]) => {
            let newSort

            switch (sortValue) {
               case 'latest':
                  newSort = [...products].sort(
                     (a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt),
                  )
                  break
               case 'oldest':
                  newSort = [...products].sort(
                     (a, b) => stringtoDate(a.createdAt) - stringtoDate(b.createdAt),
                  )
                  break

               case 'expensive':
                  newSort = [...products].sort((a, b) => b.price - a.price)
                  break
               case 'cheap':
                  newSort = [...products].sort((a, b) => a.price - b.price)
                  break
               default:
                  break
            }

            if (newSort) setFilteredProducts(newSort)
         }

         const handleFilter = () => {
            let products = initProducts

            if (filters.type) {
               switch (filters.type) {
                  case 'discounted':
                     products = products.filter((product) => product.discount && product.inStock)
                     break
                  case 'available':
                     products = products.filter((product) => product.inStock)
                     break
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

            if (filters.model) {
               products = products.filter((product) => product.model == filters.model)
            }

            setFilteredProducts(products)
            handleSort(products)
         }

         handleFilter()
      }, [filters, initProducts, sortValue])

      return (
         <div>
            <div>
               <div className='flex md:hidden gap-x-4 text-gray-400 mb-8'>
                  <FilterComponent
                     filters={filters}
                     setFilters={setFilters}
                     brands={brands}
                     models={models}
                  />
                  <SortComponent sortValue={sortValue} setSortValue={setSortValue} />
               </div>
            </div>
            <div className='md:grid md:grid-cols-4 md:gap-3 items-start'>
               {filteredProducts.length ? (
                  <div className='py-5 grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-3'>
                     {filteredProducts.map((product) => {
                        if (product.active) {
                           return <ProductCards key={product._id} product={product} />
                        }
                        return
                     })}
                  </div>
               ) : (
                  <span className='grid-cols-2 md:col-span-3 text-lg font-medium text-center mt-5'>
                     {loading ? (
                        <CircularProgress color='primary' size={40} />
                     ) : (
                        '💢 با این فیلتر ها هیچ محصولی موجود نمی‌باشد'
                     )}
                  </span>
               )}

               <div className='col-span-1 hidden md:block'>
                  <SortOptions sortValue={sortValue} setSortValue={setSortValue} />
                  <FilterOptions
                     filters={filters}
                     setFilters={setFilters}
                     brands={brands}
                     models={models}
                  />
               </div>
            </div>
         </div>
      )
   },
)

Contents.displayName = 'Contents'

export default Contents
