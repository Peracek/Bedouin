import * as React from 'react'

import { Template } from '@shared/types/Template'

type Props = {
  template: Template
}
const TemplateDetail = ({ template }: Props) => (
  <div>
    <h2>{template.name}</h2>
    <button>Edit template params</button>
    <button>Deploy</button>
    <button>Back to list</button>
  </div>
)

export default TemplateDetail
