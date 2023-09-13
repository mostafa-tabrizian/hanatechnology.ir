'use client'

import { useEffect } from 'react'
import Image from 'next/legacy/image'

// @ts-ignore
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const Slides = () => {
   useEffect(() => {
      new Swiper('.slides', {
         loop: true,
         effect: 'fade',
         autoplay: {
            delay: 5000,
         },
         fadeEffect: {
            crossFade: true,
         },
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
         },
      })
   }, [])

   return (
      <div className='slides rtl relative'>
         <div className='swiper-wrapper pb-10'>
            {/* {comments.map((comment) => { */}
            {/* return ( */}

            <div className='swiper-slide rounded-xl'>
               <Image
                  className='rounded-xl'
                  src={'/slide/1.jpg'}
                  alt='slide1'
                  width={690}
                  height={388}
                  objectFit='contain'
               />
            </div>

            <div className='swiper-slide rounded-xl'>
               <Image
                  className='rounded-xl'
                  src={'/slide/2.jpg'}
                  alt='slide2'
                  width={690}
                  height={388}
                  objectFit='contain'
               />
            </div>

            <div className='swiper-slide rounded-xl'>
               <Image
                  className='rounded-xl'
                  src={'/slide/3.jpg'}
                  alt='slide3'
                  width={690}
                  height={388}
                  objectFit='contain'
               />
            </div>

            <div className='swiper-slide rounded-xl'>
               <Image
                  className='rounded-xl'
                  src={'/slide/4.jpg'}
                  alt='slide4'
                  width={690}
                  height={388}
                  objectFit='contain'
               />
            </div>

            {/* ) */}
            {/* })} */}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default Slides
