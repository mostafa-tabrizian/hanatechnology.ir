import { hashSync, genSaltSync, compareSync } from 'bcryptjs'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'
import verification from '@/models/verification'

const getCodeData = async (mobileNumber: string) => {
   const censoredMobileNumber = `${mobileNumber.slice(0, 4)}*${mobileNumber.slice(-2)}`

   const res = await verification.find({
      mobileNumber: censoredMobileNumber
   }).exec()

   return res[res.length - 1]
}

const checkCodeExpiration = async (createdAt: Date) => {
   const ninetySec = 90 * 1000
   const now = new Date().getTime()
   const createdAtDate = new Date(createdAt).getTime()

   if ((now - createdAtDate) >= ninetySec) return false
   else return true
}

const checkVerificationCode = async (userCode: string, trueCode: string) => {
   return compareSync(userCode, trueCode)
}

export async function POST(req: Request) {
   try {
      const { code, mobileNumber, password } = (await req.json()) as {
         code: string,
         mobileNumber: string
         password: string
      }

      const codeData = await getCodeData(mobileNumber)

      const expirationCheckRes = await checkCodeExpiration(codeData.createdAt)
      if (!expirationCheckRes) return NextResponse.json({ message: 'codeExpired' })

      const verifiactionCheckRes = await checkVerificationCode(code, codeData.code)
      if (!verifiactionCheckRes) return NextResponse.json({ message: 'invalidCode' })

      const hashedPassword = hashSync(password, genSaltSync(10))

      await dbConnect()
      const user = await User.create({
         mobileNumber: mobileNumber.toLowerCase(),
         password: hashedPassword,
      })

      return NextResponse.json({
         user: {
            mobileNumber: user.mobileNumber,
         },
      })
   } catch (error) {
      return NextResponse.json({ status: 500 })
   }
}
