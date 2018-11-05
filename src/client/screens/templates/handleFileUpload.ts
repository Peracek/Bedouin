import axios from 'axios'

import absolutify from '@utils/absolutify'

const handleFileUpload = (name: string, file: File) => {
  const data = new FormData()
  data.append('name', name)
  data.append('file', file)

  return axios
  .post('/api/templates', data)
  .then(response => {
    let { location } = response.headers
    location = absolutify(location, 'ws:')
    return location
  })
  .catch(err => {
    if(err.response) {
      console.log(err.response)
      debugger
      // FIXME: throw again? how does that work?
    }
  })
}

export default handleFileUpload