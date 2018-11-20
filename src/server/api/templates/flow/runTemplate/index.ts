import axios from 'axios'

import TemplateSchema, { Template } from '@model/Template'


const getFilledJobJSON = (template: Template, values?: { [key: string]: any }) => {
  let jobJSON = template.jobJSON!

  if(values) {
    const { parameters } = template

    if(!parameters) {
      throw 'TODO: template has no parameters'
    }

    parameters.forEach(({ word, internal }) => {
      const value = values[word]
      if(!value) {
        throw `TODO: '${word}' parameter value missing`
      }

      const leadingDot = internal ? '' : `\\.`
      const re = new RegExp(`\\[\\[ ${leadingDot}${word} \\]\\]`, 'g')
      jobJSON = jobJSON.replace(re, value)
    })
  }

  return jobJSON
}

const runOnNomad = (jobName: string, jobJSON: string) => {
  const payload = `{"job":${jobJSON}}`
  return axios
    .post(`http://localhost:4646/v1/job/${jobName}`, payload)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const runTemplate = async (templateId: string, values?: { [key: string]: any }) => {
  const template = await TemplateSchema.findById(templateId)
  if(!template) {
    throw 'TODO: not found'
  }

  const jobJSON = getFilledJobJSON(template, values)
  const jobName = JSON.parse(jobJSON).ID as string

  await runOnNomad(jobName, jobJSON)
}

export default runTemplate