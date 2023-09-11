// import BrandProducts from './brand.products'

export const generateMetadata = async ({ params }: { params: { name: string } }) => {
   return {
      title: params.name + ' | حانا تکنولوژی',
   }
}

const Brand = ({ params }: { params: { name: string } }) => {
   const brandName = params.name

   return (
      <div className='mx-6 md:mx-auto max-w-screen-md my-8 space-y-7'>
         {/* <BrandProducts brandName={brandName} /> */}
      </div>
   )
}

export default Brand
