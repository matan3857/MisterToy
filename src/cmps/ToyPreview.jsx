import React from "react"

export function ToyPreview({ user, toy, onRemoveToy, onEditToy, onToyDetails }) {
    return (
        <div className="toy-card">
            <h4>{toy.name}</h4>
            <img src={`https://robohash.org/Talking Doll${toy.name}`} />
            <p>Price: <span>${toy.price}</span></p>
            <button className='toy-btns' onClick={() => { onRemoveToy(toy._id) }}><i className="fas fa-trash"></i> Remove</button>
            <button className='toy-btns' onClick={() => { onEditToy(toy._id) }}><i className="fas fa-edit"></i> Edit</button>
            <button className='toy-btns' onClick={() => { onToyDetails(toy._id) }}><i className="fas fa-info-circle"></i> Details</button>
        </div>
    )
}

