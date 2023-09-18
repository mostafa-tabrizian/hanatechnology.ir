import { NextResponse } from 'next/server'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'

export async function POST(request: Request) {
    const {
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
        barcode: string
        name: string
        slug: string
        description: string
        category: object
        brand: object
        model: object
        price: number
        discount: number
        detail: string
        publicStatus: boolean
    } = await request.json()

    await dbConnect()
    const product = await Product.create({
        barcode,
        name,
        slug: slug.trim().toLowerCase(),
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
        detail: string
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
