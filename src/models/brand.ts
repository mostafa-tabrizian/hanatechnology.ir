import mongoose from 'mongoose'

export interface IBrand {
   _id: string
   slug: string
   name: string
   createdAt: Date
   updatedAt: Date
}

const BrandSchema = new mongoose.Schema({
   slug: String,
   name: String
})

BrandSchema.set('timestamps', true)

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema)
