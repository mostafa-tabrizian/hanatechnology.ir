import mongoose from 'mongoose'

export interface ICategory {
   _id: string
   slug: string
   name: string
   createdAt: Date
   updatedAt: Date
}

const CategorySchema = new mongoose.Schema({
   slug: String,
   name: String
})

CategorySchema.set('timestamps', true)

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)
