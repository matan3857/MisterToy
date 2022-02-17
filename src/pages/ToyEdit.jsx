import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { onEditToy } from '../store/toy.actions.js'
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
    await props.onEditToy(toy)
    props.history.push('/toy')
  };

  if (!toy) return <div> Loading...</div>
  return (
    <div className='toy-edit'>
      <div className='styled-container'>
        <p>Toy Edit</p>
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
          <button className='toy-edit-btn'>Submit Edit</button>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  onEditToy
}

export const ToyEdit = connect(null, mapDispatchToProps)(_ToyEdit)
