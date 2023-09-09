import mongoose from 'mongoose'

export interface ISubcategory {
   _id: string
   slug: string
   name: string
   category: string
   createdAt: Date
   updatedAt: Date
}

const SubcategorySchema = new mongoose.Schema({
   slug: String,
   name: String,
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   }
})

SubcategorySchema.set('timestamps', true)

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema)
