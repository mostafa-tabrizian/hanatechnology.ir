'use client'

import Image from 'next/legacy/image'
import Lightbox from 'react-spring-lightbox'
import { useState, useEffect } from 'react'

type ParamsType = {
   params: {
      name: string
      thumbnail: string
      images: string[]
   }
}

const Images = ({ params: { name, thumbnail, images } }: ParamsType) => {
   const [lightboxOpen, setLightboxOpen] = useState(false)
   const [galleryList, setGalleryList] = useState<{ id: string; src: string; alt: string }[]>([])
   const [currentImageIndex, setCurrentIndex] = useState(0)

   const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1)

   const gotoNext = () =>
      currentImageIndex + 1 < images.length + 1 && setCurrentIndex(currentImageIndex + 1)

   useEffect(() => {
      const galleryList: { id: string; src: string; alt: string }[] = []

      galleryList.push({
         id: thumbnail,
         src: thumbnail,
         alt: name,
      })

      images.map((image) => {
         galleryList.push({
            id: image,
            src: image,
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
               <Image src={thumbnail} alt={thumbnail} width={400} height={400} objectFit='cover' />
            ) : (
               <h2 className='mt-6'>&quot;!برای این محصول تصویری وجود ندارد&quot;</h2>
            )}
         </div>
         <div className='flex space-x-3 justify-center'>
            {galleryList.map((data, index) => {
               return (
                  <div
                     key={index}
                     className='bg-white rounded-lg px-3 shadow-md'
                     onClick={() => {
                        setLightboxOpen(true)
                        setCurrentIndex(index)
                     }}
                  >
                     <Image
                        src={data.src}
                        alt={data.alt}
                        width={70}
                        height={70}
                        objectFit='cover'
                     />
                  </div>
               )
            })}
         </div>

         <Lightbox
            isOpen={lightboxOpen}
            onPrev={gotoPrevious}
            onNext={gotoNext}
            images={galleryList}
            currentIndex={currentImageIndex}
            // renderHeader={deleteButton}
            style={{ backdropFilter: 'blur(10px) brightness(.5)' }}
            onClose={() => setLightboxOpen(false)}
         />
      </div>
   )
}

export default Images
