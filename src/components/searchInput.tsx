'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const SearchInput = () => {
   const [searchQuery, setSearchQuery] = useState('')
   const router = useRouter()

   const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (searchQuery.trim()) {
         router.push(`/search?query=${searchQuery}`)
      }
   }

   return (
      <div className='flex justify-center w-full md:w-auto items-center relative mt-1'>
         <form onSubmit={handleFormSubmit} className='flex w-full'>
            <input
               onChange={(e) => setSearchQuery(e.target.value)}
               className='rounded-xl bg-blue-50 shadow shadow-blue-100 rtl w-full pr-10 py-2'
               type='text'
               placeholder='جستجوی محصولات...'
            />
         </form>
         <svg
            className='h-7 w-7 absolute right-2 top-1 text-slate-300'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
         >
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
         </svg>
      </div>
   )
}

export default SearchInput
