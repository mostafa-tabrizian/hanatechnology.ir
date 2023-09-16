import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Category from '@/models/category'

export async function POST(req: Request) {
   try {
      const { name, slug } = await req.json()

      await dbConnect()
      const checkNameIfExist = await Category.findOne({
         name: name
      })

      const checkSlugIfExist = await Category.findOne({
         slug: slug
      })

      if (checkNameIfExist || checkSlugIfExist)
         return NextResponse.json({
            message: 'alreadyExist',
         })

      const category = await Category.create({
         name: name,
         slug: slug
      })

      return NextResponse.json(category)
   } catch (error) {
      console.error('Error creating category:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}

export async function PATCH(req: Request) {
   const { _id, name, slug } = await req.json()


   try {
      await dbConnect()
      const category = await Category.findOneAndUpdate(
         {
            _id: _id
         },
         {
            name: name,
            slug: slug,
         },
      )

      return NextResponse.json({
         category,
      })
   } catch (err) {
      return NextResponse.json({
         statue: 500,
         message: err,
      })
   }
}

export async function DELETE(req: Request) {
   try {
      const { _id } = await req.json()

      await dbConnect()
      const category = await Category.findOneAndDelete(
         { _id }
      )

      return NextResponse.json(category)
   } catch (error) {
      console.error('Error deleting category:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
