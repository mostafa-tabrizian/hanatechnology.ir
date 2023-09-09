import { NextResponse } from 'next/server'
import Coupon from '@/models/coupon'
import RecaptchaCheck from '@/lib/recaptchCheck';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {

   const { code, gReCaptchaToken }: { code: string, gReCaptchaToken: string } = await req.json()

   const recaptchaRes = await RecaptchaCheck(gReCaptchaToken)
   if (!recaptchaRes) return NextResponse.json({ message: 'recaptcha fail' })

   await dbConnect()
   const coupon = await Coupon.findOne({
      code: code
   })

   if (new Date() > coupon.expiresAt) return NextResponse.json({ message: 'coupon date expired'})
   else if (coupon.qty <= 0) return NextResponse.json({ message: 'coupon qty is zero'})

   return NextResponse.json(coupon)
}
