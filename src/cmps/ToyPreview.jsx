import React from "react"
import { userReducer } from "../store/user.reducer"

export function ToyPreview({user, toy, onRemoveToy, onEditToy, onToyDetails }) {
    return (
        <div className="toy-card">
            <h4>{toy.name}</h4>
            <img src={`https://robohash.org/Talking Doll${toy.name}`} />
            <p>Price: <span>${toy.price}</span></p>
            {/* {user && user.isAdmin && <React.Fragment> */}
                <button onClick={() => { onRemoveToy(toy._id) }} className="trash-btn"><i className="fas fa-trash"></i></button>
                <button onClick={() => { onEditToy(toy._id) }} className="edit-btn"><i className="fas fa-edit"></i></button>
            {/* </React.Fragment> */}
            {/* } */}
            <button onClick={() => { onToyDetails(toy._id) }} className="complete-btn"><i className="fas fa-info-circle"></i></button>
        </div>
    )
}

