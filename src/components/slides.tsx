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
      <div className='slides mx-auto w-full md:w-4/6 rtl relative'>
         <div className='swiper-wrapper pb-10'>
            {slides.map((slide) => {
               if (!slide.active) return

               return (
                  <Link id='slide' key={slide._id} href={slide.link} className='swiper-slide'>
                     <div className='relative aspect-video justify-center rounded-xl'>
                        <Image
                           className='rounded-xl'
                           src={`https://tabrizian.storage.iran.liara.space/hanatechnology/slides/${slide.src}`}
                           alt={slide.alt}
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           layout='fill'
                           priority
                        />
                     </div>
                  </Link>
               )
            })}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default Slides
