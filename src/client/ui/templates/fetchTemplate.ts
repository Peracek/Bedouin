import axios from 'axios'

type TODOTemplate = { name: string }

const fetchTemplate = (id: string) =>
  axios
    .get(`/api/templates/${id}`)
    .then(response => {
      return response.data as TODOTemplate
    })

    export default fetchTemplate