import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import User, { IUser } from '@/models/user'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)

   if (!session) return NextResponse.json({ status: 403 })

   await dbConnect()
   const user = await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }, 'name').exec()
      .then((res: IUser) => res)

   return NextResponse.json(user)
}
