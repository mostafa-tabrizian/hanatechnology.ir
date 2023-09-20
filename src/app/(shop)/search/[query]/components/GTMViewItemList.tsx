/* eslint-disable camelcase */

'use client'

import { IProduct } from '@/models/product'
import { useEffect } from 'react'

const GTMViewProduct = ({
   params: { productList, query },
}: {
   params: { productList: IProduct[]; query: string }
}) => {
   const suitableList = productList.map((product) => {
      return {
         item_id: product.barcode,
         item_name: product.name,
         discount: product.discount,
         price: product.price,
         quantity: product.inStock ? 1 : 0
      }
   })

   useEffect(() => {
      // @ts-ignore
      window.dataLayer = window.dataLayer || []

      // @ts-ignore
      window.dataLayer.push({
         event: 'view_item_list',
         ecommerce: {
            item_list_name: query,
            items: suitableList,
         },
      })
   }, [])

   return <span></span>
}

export default GTMViewProduct
