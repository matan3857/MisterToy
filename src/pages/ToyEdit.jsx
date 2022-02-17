import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { editToy } from '../store/toy.actions.js'
import { toyService } from '../services/toy.service.js'

function _ToyEdit(props) {
  const [toy, setToy] = useState(null);

  useEffect(() => {
    const { toyId } = props.match.params
    const fetchData = async () => {
      const toy = await toyService.getById(toyId)
      setToy(toy)
   }
   fetchData()
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    await props.editToy(toy)
    props.history.push('/toy')
};

  if (!toy) return <div> Loading...</div>
  return (
    <div>
      <h1>ToyEdit</h1>
      <form className="edit-toy" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={toy.name}
          onChange={(ev) => setToy({ ...toy, name: ev.target.value })}
          required
        />
        <input
          type="number"
          name="price"
          value={toy.price}
          onChange={(ev) => setToy({ ...toy, price: ev.target.value })}
          required
        />
        <button>Submit Edit</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  editToy
}

export const ToyEdit = connect(null, mapDispatchToProps)(_ToyEdit)
