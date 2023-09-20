'use client'

import { useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'

// @ts-ignore
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import { ISlide } from '@/models/slide'

const Slides = ({ slides }: { slides: ISlide[] }) => {
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
            {slides.map((slide) => {
               if (!slide.active) return

               return (
                  <div key={slide._id} className='swiper-slide !flex justify-center rounded-xl'>
                     <Link href={slide.link}>
                        <Image
                           className='rounded-xl'
                           src={`https://tabrizian.storage.iran.liara.space/hanatechnology/slides/${slide.src}`}
                           alt={slide.alt}
                           width={690}
                           height={388}
                           objectFit='contain'
                           priority
                        />
                     </Link>
                  </div>
               )
            })}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default Slides
