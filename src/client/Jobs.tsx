import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

import { Template } from '@shared/types/Template'

export default class extends React.Component<{}, { data?: Template[] }> {
  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/api/templates')
      .then(response => {
        const data = response.data
        this.setState({data})
      })
  }

  render() {
    return (
      this.state.data ?
        <div>
          {this.state.data.map(dato => <Link key={dato.name} to={`/detail/${dato.name}`}><div>{JSON.stringify(dato.name)}</div></Link>)}
        </div>
      :
        <div>loading</div>
    )
  }
}