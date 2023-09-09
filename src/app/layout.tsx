'use client'

import '@/app/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body>
            <SessionProvider>
               <ToastContainer
                  position='top-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='light'
               />

               <main className='overflow-x-hidden mx-auto'>{children}</main>
            </SessionProvider>
         </body>
      </html>
   )
}
