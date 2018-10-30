import axios from 'axios'
import * as React from 'react'

export default class extends React.Component<{}, { data?: any[] }> {
  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/templates')
      .then(response => {
        const data = response.data
        this.setState({data})
      })
  }

  render() {
    return (
      this.state.data ?
        <div>
          {this.state.data.map(dato => <div key={dato.id}>{JSON.stringify(dato.name)}</div>)}
        </div>
      :
        <div>loading</div>
    )
  }
}