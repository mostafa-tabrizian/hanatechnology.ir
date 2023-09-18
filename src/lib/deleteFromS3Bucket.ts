import { toast } from 'react-toastify'

const deleteFromS3Bucket = async (image: string, folder: string) => {
   try {
      const res = await fetch('/api/admin/product/image/s3', {
         method: 'DELETE',
         body: JSON.stringify({
            folder,
            key: image,
         }),
      })

      if (!res.ok) throw new Error()

      return res
   } catch (err) {
      toast.error('در حذف عکس خطایی رخ داد. لطفا مجدد تلاش کنید.')
      console.error(err)
   }
}

export default deleteFromS3Bucket