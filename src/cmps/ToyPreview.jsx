import React from "react"

export function ToyPreview({ user, toy, onRemoveToy, onEditToy, onToyDetails }) {
    return (
        <div className="toy-card">
            <h4>{toy.name}</h4>
            <img src={`https://robohash.org/Talking Doll${toy.name}`} />
            <p>Price: <span>${toy.price}</span></p>
            <button onClick={() => { onRemoveToy(toy._id) }} className="trash-btn"><i className="fas fa-trash"></i>Remove</button>
            <button onClick={() => { onEditToy(toy._id) }} className="edit-btn"><i className="fas fa-edit"></i>Edit</button>
            <button onClick={() => { onToyDetails(toy._id) }} className="complete-btn"><i className="fas fa-info-circle"></i>Details</button>
        </div>
    )
}

