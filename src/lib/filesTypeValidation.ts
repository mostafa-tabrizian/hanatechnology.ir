import { toast } from 'react-toastify'

const filesTypeValidation = (files: File[]) => {
   let invalidFile: undefined | { name: string; valid: boolean }

   files.map((file) => {
      if (!['image/jpeg', 'image/webp'].includes(file.type)) {
         invalidFile = { valid: false, name: file.name }
      }
   })

   if (invalidFile) {
      toast.warning(`تایپ فایل ${invalidFile.name} می‌بایست jpeg یا webp باشد`)
      return false
   } else return true
}

export default filesTypeValidation
