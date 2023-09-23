/* eslint-disable camelcase */

'use client'

import { useEffect } from 'react'

const GTMSearch = ({ query }: { query: string }) => {
   useEffect(() => {
      console.log('gtmSearch', query)

      // @ts-ignore
      window.dataLayer = window.dataLayer || []

      // @ts-ignore
      window.dataLayer.push({
         event: 'search',
         search_term: query,
      })

      return () => {}
   }, [query])

   return <span></span>
}

export default GTMSearch
