import { toast } from 'react-toastify'
import createS3Presign from './createS3Presign'
import putInS3Bucket from './PutInS3Bucket'

const imageUploadHandler = async (image: File, folder: string) => {
    try {
        const imageName = image.name.replace(' ', '-')

        const s3SignedUrl = await createS3Presign(imageName, folder)

        if (!s3SignedUrl) throw new Error('s3 signed url')

        const { key, uploadUrl } = await s3SignedUrl.json()

        const fileUploadResult = await putInS3Bucket(uploadUrl, image)

        if (!fileUploadResult) throw new Error('file upload to s3')

        return { key, imageName }
    } catch (err) {
        toast.error(
            'در آپلود تصویر خطایی رخ داد. (اگر از VPN استفاده می‌کنید لطفا ابتدا آن را خاموش کنید)',
        )
        console.error(err)
        return false
    }
}

export default imageUploadHandler