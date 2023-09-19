import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import User, { IUser } from '@/models/user'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
   const session: { _doc: { username: string } } | null = await getServerSession(authOptions)

   await dbConnect()
   const user = await User.findOne(
      {
         username: session?._doc.username,
      },
      'name',
   )
      .exec()
      .then((res: IUser) => res)

   return NextResponse.json(user)
}
