import Link from 'next/link'
import Image from 'next/legacy/image'

import dbConnect from '@/lib/dbConnect'
import Slide from '@/models/slide'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import NewSlide from './components/newSlide'
import Delete from './components/delete'
import PublicStatus from './components/publicStatus'

const getSlides = async () => {
   dbConnect()
   return await Slide.find()
}

export const metadata = {
   title: 'حانا تکنولوژی | پنل ادمین | اسلاید ها',
}

const AdminSlides = async () => {
   const slides = (await getSlides()).reverse()

   return (
      <div className='md:mx-auto mx-6 max-w-screen-lg space-y-10 my-16 relative'>
         <Breadcrumbs aria-label='breadcrumb'>
            <Link className='text-gray-400' href='/'>
               فروشگاه
            </Link>
            <Link className='text-gray-400' href='/admin'>
               ادمین
            </Link>
            <h5 className='font-semibold'>اسلاید ها</h5>
         </Breadcrumbs>

         <NewSlide />
         <hr />

         <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {slides.length ? (
               slides.map((slide) => {
                  return (
                     <div key={slide._id} className='relative'>
                        <Delete
                           params={JSON.parse(JSON.stringify({ _id: slide._id, src: slide.src }))}
                        />
                        <PublicStatus
                           params={JSON.parse(
                              JSON.stringify({ _id: slide._id, publicStatus: slide.public }),
                           )}
                        />
                        <Image
                           className='rounded-xl aspect-video'
                           src={`https://tabrizian.storage.iran.liara.space/hanatechnology/slides/${slide.src}`}
                           alt={slide.alt}
                           width={690}
                           height={388.125}
                           objectFit='contain'
                           loading='lazy'
                        />
                     </div>
                  )
               })
            ) : (
               <span className='text-slate-400'>هیچ اسلایدی وجود ندارد!</span>
            )}
         </div>
      </div>
   )
}

export default AdminSlides
