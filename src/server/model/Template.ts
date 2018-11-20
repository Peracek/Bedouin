import mongoose from 'mongoose'

export interface Template {
  id: string,
  createdAt?: Date,
  name: string,
  jobHCL?: string,
  jobJSON?: string,
  parameters?: TemplateParameter[]
}
export type TemplateParameter = {
  word: string,
  internal: boolean,
  label?: string,
  description?: string,
  type?: "string" | "boolean" | "number",
  match?: string,
  defaultValue?: string | boolean | number 
}

interface TemplateDocument extends Template, mongoose.Document {
  id: string,
  createdAt: Date,
  jobHCL: string,
  jobJSON: string
}
// interface TemplateParameterDocument extends TemplateParameter, mongoose.Document {}

const TemplateParameterSchema = new mongoose.Schema({
  word: String,
  internal: Boolean,
  label: String,
  description: String,
  type: String,
  match: String,
  defaultValue: Object
})

const TemplateSchema = new mongoose.Schema({
  createdAt: Date,
  name: String,
  jobHCL: String,
  jobJSON: String,
  parameters: [TemplateParameterSchema]
})
TemplateSchema.pre<TemplateDocument>("save", function(next) {
  const now = new Date()
  if(!this.createdAt) {
    this.createdAt = now
  }
  next()
})
TemplateSchema.set('toJSON', { virtuals: true })
TemplateSchema.set('toObject', { virtuals: true })

// create fake error
// TemplateSchema.pre('save', next => {
//   next(new Error('Fake mongoose error'))
// })


export default mongoose.model<TemplateDocument>('Template', TemplateSchema)
