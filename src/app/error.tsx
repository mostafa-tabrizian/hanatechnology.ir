'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
   useEffect(() => {
      console.error(error)
   }, [error])

   return (
      <div className='space-y-5'>
         <h2>! خطایی رخ داد</h2>
         <p>{error.message}</p>
         <button onClick={() => reset()}>تلاش مجدد</button>
      </div>
   )
}
