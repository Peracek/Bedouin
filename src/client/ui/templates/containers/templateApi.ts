import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { mapValues, trim } from 'lodash'
import { ComponentDecorator } from 'recompost'

import { isAPIErrorBody } from '@shared/types/APIErrorBody'
import { Template, TemplateParameter } from '@shared/types/Template'
import absolutify from '@utils/absolutify'

const endpoint = {
  templates: `/api/templates`,
  template: (name: string) => `/api/templates/${name}`,
  templateParams: (name: string) => `/api/templates/${name}/parameters`
}

const fetchTemplate = (name: string) =>
  axios
    .get(endpoint.template(name))
    .then(response => {
      return response.data as Template
    })

const uploadTemplateFile = (name: string, file: File) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)

  return axios
    .post(endpoint.templates, data)
    .then(response => {
      let { location } = response.headers
      location = absolutify(location, 'ws:')
      return { location }
    })
    .catch(err => {
      if(err.response) {
        const data = (err.response as AxiosResponse).data
        if(isAPIErrorBody(data)) {
          return data // FIXME: translate this to something useful
        }
      }
      throw err
    })
}

const normalizeParameterValues = (param: TemplateParameter) => {
  return mapValues(param, val => {
    if(typeof val === 'string') {
      const trimmed = trim(val)
      return trimmed.length === 0 ? null : trimmed
    }
    return val
  }) as TemplateParameter
}

const postParameters = (parameters: TemplateParameter[], templateName: string) => {
  parameters.map(p => normalizeParameterValues(p))
  axios
    .post(endpoint.templateParams(templateName), parameters)
}

type TemplateApiState = {
  template?: Template,
  fetching: boolean
}
export type InjectedProps = {
  uploadTemplateFile: typeof uploadTemplateFile,
  postParameters: (p: TemplateParameter[]) => Promise<TODO>
} & TemplateApiState

const templateApi = ((BaseComponent: React.ComponentType) => {
  return class extends React.Component<any, TemplateApiState> {
    state = {
      fetching: Boolean(this.props.templateName) 
    }
    additionalProps = {
      uploadTemplateFile,
      postParameters: (p: TemplateParameter[]) => postParameters(p, this.props.templateName)
    }

    componentDidMount() {
      const { templateName } = this.props
      if(!templateName) return

      fetchTemplate(templateName)
        .then(template => this.setState({ template, fetching: false }))
    }

    render() {
      return React.createElement<any>(BaseComponent, {
        ...this.props,
        ...this.additionalProps,
        ...this.state
      })
    }
  }
}) as any as ComponentDecorator<{ templateName?: string }, InjectedProps>

export default templateApi