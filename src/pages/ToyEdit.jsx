import React from 'react'
import { connect } from 'react-redux'

import { editToy } from '../store/toy.actions.js'
import { toyService } from '../services/toy.service.js'

class _ToyEdit extends React.Component {
  state = {
    toy: null,
  }

  componentDidMount = async () => {
    const { toyId } = this.props.match.params
    const toy = await toyService.getById(toyId)
    this.setState(prevState => ({ ...prevState, toy }))
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [name]: value } }))
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { toy } = this.state
    await this.props.editToy(toy)
    this.props.history.push('/toy')
  }

  render() {
    const { toy } = this.state
    if (!toy) return <div> Loading...</div>
    return (
      <div>
        <h1>ToyEdit</h1>
        <form className="edit-toy" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            value={toy.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="number"
            name="price"
            value={toy.price}
            onChange={this.handleChange}
            required
          />
          <button>Submit Edit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const mapDispatchToProps = {
  editToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)
