import mongoose from 'mongoose'

const TemplateSchema = new mongoose.Schema({
  name: String,
  jobDescription: String
})

// create fake error
// TemplateSchema.pre('save', next => {
//   next(new Error('Fake mongoose error'))
// })


mongoose.model('Template', TemplateSchema)

export default mongoose.model('Template')