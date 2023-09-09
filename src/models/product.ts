import mongoose from 'mongoose'

export interface IProduct {
   public: boolean
   _id: string
   barcode: string
   name: string
   price: number
   discount: number
   thumbnail: string
   image: [string]
   description: string
   createdAt: Date
   updatedAt: Date
}

const ProductSchema = new mongoose.Schema({
   public: {
      type: Boolean,
      default: true
   },
   barcode: String,
   name: String,
   price: Number,
   discount: Number,
   thumbnail: String,
   images: [String],
   description: String,
})

ProductSchema.set('timestamps', true)

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
