import dbConnect from '@/lib/dbConnect'
import Product, { IProduct } from '@/models/product'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function GET() {
   await dbConnect()
   const products = await Product.find()

   return NextResponse.json(products)
}

// export async function POST(request: Request) {
//    const { publicState, productId, color, size, quantity, price, discount } = await request.json()

//    const colorData = await prisma.color
//       .create({
//          data: {
//             color: color,
//          },
//       })
//       .then((res) => res)

//    const sizeData = await prisma.size
//       .create({
//          data: {
//             size: parseInt(size),
//          },
//       })
//       .then((res) => res)

//    const locationData = await prisma.productLocation.create({
//       data: {
//          public: publicState,
//          productId: productId,
//          colorId: colorData.id,
//          sizeId: sizeData.id,
//          quantity: parseInt(quantity),
//          price: parseInt(price),
//          discount: parseInt(discount),
//       },
//    })

//    return NextResponse.json(locationData)
// }

export async function PATCH(request: Request) {
   const {
      _id,
      barcode,
      name,
      slug,
      description,
      category,
      brand,
      model,
      price,
      discount,
      detail,
      publicStatus
   }: {
      _id: string
      barcode: string
      name: string
      slug: string
      description: string
      category: object
      brand: object
      model: object
      price: number
      discount: number
      detail: object
      publicStatus: boolean
   } = await request.json()

   await dbConnect()
   const product = await Product.findOneAndUpdate({
      _id: _id,
   }, {
      barcode,
      name,
      slug,
      description,
      category,
      brand,
      model,
      price,
      discount,
      detail: JSON.parse(detail),
      publicStatus
   })

   return NextResponse.json(product)
}

