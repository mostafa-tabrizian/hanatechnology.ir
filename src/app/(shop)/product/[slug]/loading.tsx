const LoadingProduct = () => {
   return (
      <div className='mx-6 md:mx-auto my-16 animate-pulse max-w-screen-md space-y-8'>
         <div>
            <div className='w-full h-60 bg-gray-200 rounded mb-4'></div>

            <div className='flex space-x-6 justify-center'>
               <div className='w-16 h-16 rounded bg-gray-200'></div>
               <div className='w-16 h-16 rounded bg-gray-200'></div>
               <div className='w-16 h-16 rounded bg-gray-200'></div>
            </div>
         </div>

         <div className='w-7/12 h-10 ml-auto bg-gray-200 rounded'></div>
         <div className='w-9/12 h-6 ml-auto bg-gray-200 rounded'></div>
         <div className='w-9/12 h-6 ml-auto bg-gray-200 rounded'></div>
         <div className='w-9/12 h-6 ml-auto bg-gray-200 rounded'></div>

         <div className='flex space-x-6 items-center'>
            <div className='w-1/2 h-8 bg-gray-200 rounded'></div>
            <div className='w-1/2 h-14 bg-gray-200 rounded'></div>
         </div>
      </div>
   )
}

export default LoadingProduct
