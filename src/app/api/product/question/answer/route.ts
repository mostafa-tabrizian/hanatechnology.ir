import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import Product from '@/models/product'
import RecaptchaCheck from '@/lib/recaptchCheck'
import dbConnect from '@/lib/dbConnect'

export async function POST(req: Request) {

    const payload: {
        questionId: string
        gReCaptchaToken: string
        body: string
    } = await req.json()
    
    const { questionId, gReCaptchaToken, body } = payload

    const recaptchaRes = await RecaptchaCheck(gReCaptchaToken)
    if (!recaptchaRes) return NextResponse.json({ message: 'recaptcha fail' })

    const session: { _doc: { _id: string, avatar: string, name: string } } | null = await getServerSession(authOptions)

    if (!session) return NextResponse.json({ status: 403 })

    await dbConnect()
    const product = await Product.findOne({
        'questions._id': questionId
    }).exec()
        .then((res) => res)

    // @ts-ignore
    product.questions[0].answers.push({
        user: {
            id: session._doc._id,
            avatar: session._doc.avatar,
            name: session._doc.name
        },
        body: body,
        createdAt: new Date()
    })

    // @ts-ignore
    product.save()

    return NextResponse.json({ message: 'answer submitted.' })
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
