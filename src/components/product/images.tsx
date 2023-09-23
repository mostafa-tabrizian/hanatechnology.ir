'use client'

import { useState, useEffect } from 'react'
import Image from 'next/legacy/image'

import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

type ImageProps = {
   params: {
      name: string
      thumbnail: string
      images: string[]
   }
}

type TGallery = {
   src: string
   alt: string
}[]

const Images = ({ params: { name, thumbnail, images } }: ImageProps) => {
   const [lightboxOpen, setLightboxOpen] = useState(false)
   const [galleryList, setGalleryList] = useState<TGallery>([])
   const [currentImageIndex, setCurrentIndex] = useState(0)

   useEffect(() => {
      return () => {
         setGalleryList([])
      }
   }, [])

   useEffect(() => {
      const galleryList: TGallery = [
         {
            src: `https://tabrizian.storage.iran.liara.space/hanatechnology/products/${thumbnail}`,
            alt: name,
         },
      ]

      images.forEach((image) => {
         galleryList.push({
            src: `https://tabrizian.storage.iran.liara.space/hanatechnology/products/${image}`,
            alt: name,
         })
      })

      setGalleryList(galleryList)
   }, [thumbnail, images, name])

   return (
      <div className='space-y-3'>
         <div
            className='text-center bg-white rounded-2xl shadow-lg shadow-slate-200 '
            onClick={() => {
               setLightboxOpen(true)
               setCurrentIndex(0)
            }}
         >
            {thumbnail ? (
               <Image
                  src={`https://tabrizian.storage.iran.liara.space/hanatechnology/products/${thumbnail}`}
                  alt={thumbnail}
                  width={400}
                  height={400}
                  objectFit='cover'
                  priority
               />
            ) : (
               <h2 className='mt-6'>!برای این محصول تصویری وجود ندارد</h2>
            )}
         </div>

         <div className='flex space-x-3 justify-center'>
            {galleryList.map((data, idx) => {
               return (
                  <div
                     key={idx}
                     className='bg-white rounded-lg px-3 shadow-md'
                     onClick={() => {
                        setLightboxOpen(true)
                        setCurrentIndex(idx)
                     }}
                  >
                     <Image
                        className='opacity-0 transition-opacity duration-300'
                        src={data.src}
                        alt={data.alt}
                        width={70}
                        height={70}
                        objectFit='cover'
                        loading='lazy'
                        onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}
                     />
                  </div>
               )
            })}
         </div>

         <SlideshowLightbox
            theme='lightbox'
            lightboxIdentifier='lightbox1'
            framework='next'
            images={galleryList}
            showThumbnails={false}
            open={lightboxOpen}
            className='hidden'
            startingSlideIndex={currentImageIndex}
            modalClose='clickOutside'
            onClose={() => {
               setLightboxOpen(false)
            }}
         >
            {(images as unknown as { src: string; alt: string }[]).map((image) => (
               <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  height={500}
                  width={500}
                  data-lightboxjs='lightbox1'
                  quality={80}
                  className='rounded-lg'
               />
            ))}
         </SlideshowLightbox>
      </div>
   )
}

export default Images
