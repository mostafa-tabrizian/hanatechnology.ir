/* eslint-disable camelcase */

'use client'

import { IProduct } from '@/models/product'
import { useEffect } from 'react'

const GTMViewProduct = ({
   params: { product, category, brand },
}: {
   params: { product: IProduct; category: string; brand: string }
}) => {
   useEffect(() => {
      // @ts-ignore
      window.dataLayer = window.dataLayer || []

      // @ts-ignore
      window.dataLayer.push({
         event: 'view_item',
         ecommerce: {
            currency: 'TRY',
            value: product.price - product.discount,
            items: [
               {
                  item_id: product.barcode,
                  item_name: product.name,
                  discount: product.discount,
                  item_brand: brand,
                  item_category: category,
                  price: product.price,
                  quantity: product.inStock ? 1 : 0,
               },
            ],
         },
      })

      return () => {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return <span></span>
}

export default GTMViewProduct
