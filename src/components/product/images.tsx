'use client'

import Image from 'next/legacy/image'
import Lightbox from 'react-spring-lightbox'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'

type ParamsType = {
   params: {
      isAdmin: boolean
      name: string
      thumbnail: string
      images: string[]
   }
}

const Images = ({ params: { isAdmin, name, thumbnail, images } }: ParamsType) => {
   const [loading, setLoading] = useState(false)
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
         src: `/product/${thumbnail}`,
         alt: name,
      })

      images.map((image) => {
         galleryList.push({
            id: image,
            src: `/product/${image}`,
            alt: name,
         })
      })

      setGalleryList(galleryList)
   }, [thumbnail, images])

   // const deleteButton = () => {
   //    if (!isAdmin) return

   //    const deleteImage = async () => {
   //       const imageId = galleryList[currentImageIndex].id
   //       const imageSrc = galleryList[currentImageIndex].src
   //       const imageSrcSplit = imageSrc.split('/')
   //       const imageKey = imageSrcSplit[imageSrcSplit.length - 1]

   //       try {
   //          setLoading(true)

   //          const resS3 = await fetch('/api/product/image/s3', {
   //             method: 'DELETE',
   //             body: JSON.stringify({ imageKey }),
   //          })

   //          if (!resS3.ok) throw new Error()

   //          const resDB = await fetch('/api/product/image', {
   //             method: 'DELETE',
   //             body: JSON.stringify({ imageId }),
   //          })

   //          if (!resDB.ok) throw new Error()

   //          toast.success('تصویر با موفقیت حذف گردید.')
   //       } catch (err) {
   //          toast.error('تصویر موجود نمی باشد یا در حذف تصویر خطایی رخ داد!')
   //          console.error(err)
   //       } finally {
   //          setLoading(false)
   //          setLightboxOpen(false)
   //       }
   //    }

   // return (
   //    <button onClick={() => deleteImage()}>
   //       <div className='py-2 bg-white rounded-full justify-center flex'>
   //          {loading ? (
   //             <CircularProgress color='error' size={33} />
   //          ) : (
   //             <svg
   //                className='h-8 w-8 text-red-700'
   //                viewBox='0 0 24 24'
   //                fill='none'
   //                stroke='currentColor'
   //                strokeWidth='2'
   //                strokeLinecap='round'
   //                strokeLinejoin='round'
   //             >
   //                {' '}
   //                <polyline points='3 6 5 6 21 6' />{' '}
   //                <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />{' '}
   //                <line x1='10' y1='11' x2='10' y2='17' />{' '}
   //                <line x1='14' y1='11' x2='14' y2='17' />
   //             </svg>
   //          )}
   //       </div>
   //    </button>
   // )
   // }

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
                  src={`/product/${thumbnail}`}
                  alt={thumbnail}
                  width={400}
                  height={400}
                  objectFit='cover'
               />
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
