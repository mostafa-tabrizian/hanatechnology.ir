import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import Product, { IProduct } from '@/models/product'
import dbConnect from '@/lib/dbConnect'

export async function POST(req: Request) {
    const { productId } = (await req.json()) as {
        productId: string
    }

    const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ status: 403 })

    await dbConnect()
    const product = await Product.findOne({
        _id: productId
    }).exec()
        .then((res: IProduct) => res)

    const userId = session._doc._id

    // @ts-ignore
    if (product.likes.includes(userId)) {
        // @ts-ignore
        const index = product.likes.indexOf(userId)
        product.likes.splice(index, 1)
        console.log(product);
        // @ts-ignore
        product.save()

    } else {
        // @ts-ignore
        product.likes.push(userId)
        // @ts-ignore
        product.save()
    }


    return NextResponse.json({ message: 'like submitted.' })
}

// export async function PATCH(request: Request) {
//     const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)
//     const payload = await request.json()

//     if (!session) return

//     try {
//         const user = await User.findOneAndUpdate(
//             { mobileNumber: session._doc.mobileNumber },
//             { name: payload.name }
//         )

//         const { password: _, ...filteredUser } = user._doc

//         return NextResponse.json(filteredUser)
//     } catch (err) {
//         console.error('err api/user', err)

//         return NextResponse.json({
//             statue: 500,
//             undefined,
//         })
//     }
// }
