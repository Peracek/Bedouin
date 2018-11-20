import mongoose, { Schema } from 'mongoose'

const JobRunSchema = new Schema({
  createdAt: Date,
  parameterValues: Object
})
JobRunSchema.pre<TODO>("save", function(next) {
  const now = new Date()
  if(!this.createdAt) {
    this.createdAt = now
  }
  next()
})

const JobSchema = new Schema({
  id: String,
  template: { type: Schema.Types.ObjectId, ref: 'Template' },
  runs: [JobRunSchema]
})

export default mongoose.model('Job', JobSchema)
