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
   const { _id, publicStatus, name, description, price, discount }: {
      _id: string,
      publicStatus: boolean,
      name: string,
      description: string,
      price: string,
      discount: string
   } = await request.json()

   const submitData: IProduct | object = {}

   if (typeof(publicStatus) == 'boolean') submitData['public'] = publicStatus
   if (name) submitData['name'] = name
   if (description) submitData['description'] = description
   if (price?.length) submitData['price'] = price
   if (discount?.length) submitData['discount'] = discount

   await dbConnect()
   const product = await Product.findOneAndUpdate({
      _id: _id,
   }, {
      ...submitData
   })
   
   product.save()

   return NextResponse.json(product)
}

