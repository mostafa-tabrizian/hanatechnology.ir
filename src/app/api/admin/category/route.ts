import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

export async function POST(req: Request) {
   try {
      const { name, slug } = await req.json()
      await dbConnect()

      const category = await Category.create({
         name,
         slug,
      })

      return NextResponse.json(category)
   } catch (error) {
      // @ts-ignore
      if (error.code == 11000) {
         // not unique
         return NextResponse.json({ message: 'notUnique' })
      } else {
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function PATCH(req: Request) {
   const { _id, name, slug } = await req.json()

   try {
      await dbConnect()
      const category = await Category.findOneAndUpdate(
         { _id },
         {
            name,
            slug,
         },
      )

      return NextResponse.json({
         category,
      })
   } catch (error) {
      // @ts-ignore
      if (error.code == 11000) {
         return NextResponse.json({ message: 'notUnique' })
      } else {
         return NextResponse.json({ status: 500, message: error })
      }
   }
}

export async function DELETE(req: Request) {
   try {
      const { _id } = await req.json()

      await dbConnect()
      const category = await Category.findOneAndDelete({ _id })

      return NextResponse.json(category)
   } catch (error) {
      console.error('Error deleting category:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
