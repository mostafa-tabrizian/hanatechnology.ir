import mongoose from 'mongoose'

export interface IProduct {
   public: boolean
   _id: string
   barcode: string
   name: string
   slug: string
   category: string
   model: string
   brand: string
   price: number
   discount: number
   thumbnail: string
   images: [string]
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
   slug: String,
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   },
   model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true
   },
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
   },
   price: Number,
   discount: Number,
   thumbnail: String,
   images: [String],
   description: String,
})

ProductSchema.set('timestamps', true)

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
