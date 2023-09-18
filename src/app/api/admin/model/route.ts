import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Model from '@/models/model'

export async function POST(req: Request) {
   try {
      const { name, slug } = await req.json()

      await dbConnect()
      const checkNameIfExist = await Model.findOne({
         name: { $regex: new RegExp('^' + name + '$', 'i') }
      })

      const checkSlugIfExist = await Model.findOne({
         slug: { $regex: new RegExp('^' + slug + '$', 'i') }
      })

      if (checkNameIfExist || checkSlugIfExist)
         return NextResponse.json({
            message: 'alreadyExist',
         })

      const model = await Model.create({
         name: name,
         slug: slug
      })

      return NextResponse.json(model)
   } catch (error) {
      console.error('Error creating model:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}

export async function PATCH(req: Request) {
   const { _id, name, slug } = await req.json()


   try {
      await dbConnect()
      const model = await Model.findOneAndUpdate(
         {
            _id: _id
         },
         {
            name: name,
            slug: slug,
         },
      )

      return NextResponse.json({
         model,
      })
   } catch (err) {
      return NextResponse.json({
         statue: 500,
         message: err,
      })
   }
}

export async function PUT(req: Request) {
   const { modelId, category } = await req.json()


   try {
      await dbConnect()
      const modelUpdated = await Model.findOneAndUpdate(
         {
            _id: modelId
         },
         {
            category: category
         },
      )

      return NextResponse.json({
         modelUpdated,
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
      const model = await Model.findOneAndDelete(
         { _id }
      )

      return NextResponse.json(model)
   } catch (error) {
      console.error('Error deleting model:', error)
      return NextResponse.json({ status: 500, message: error })
   }
}
