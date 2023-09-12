import '@/app/globals.scss'
import Header from '../components/header'
import Footer from '../components/footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         
         <main className='mb-24 max-w-screen-lg overflow-x-hidden mx-auto'>{children}</main>

         <Footer />
      </>
   )
}
