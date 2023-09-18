import { toast } from 'react-toastify'

const deleteFromS3Bucket = async (imageUrl: string, folder: string) => {
   try {
      const imageSplit = imageUrl.split('/')
      const imageKeyName = imageSplit[imageSplit.length - 1]
      const res = await fetch('/api/admin/product/image/s3', {
         method: 'DELETE',
         body: JSON.stringify({
            folder,
            key: imageKeyName,
         }),
      })

      if (!res.ok) throw new Error()

      return res
   } catch (err) {
      toast.error('در آپلود عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
      console.error(err)
   }
}

export default deleteFromS3Bucket