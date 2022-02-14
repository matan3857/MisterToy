import { toyService } from "../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'



export function loadToys(filterBy) {
    return async (dispatch) => {
        try {
            const toys = await toyService.query(filterBy)
            console.log('Toys from DB:', toys)
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        }
        catch (err) {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
        }
    }
}

export function onRemoveToy(toyId) {
    return async (dispatch) => {
        try {
            await toyService.remove(toyId)
            console.log('Toy Deleted Succesfully!');
            dispatch({
                type: 'REMOVE_TOY',
                toyId
            })
            showSuccessMsg('Toy removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove toy - Admin only')
            console.log('Cannot remove toy', err)
        }
    }
}

export function onAddToy(toy) {
    
    const labelsChoose = toy.labels.map(label => label.label)
    toy.labels = [...labelsChoose]
    toy.createdAt = Date.now()

    return async (dispatch) => {
        try {
            // const toy = toyService.getEmptyToy();
            const savedToy = await toyService.save(toy)
            console.log('Added Toy', savedToy);
            dispatch({
                type: 'ADD_TOY',
                toy: savedToy
            })
            showSuccessMsg('Toy added')
            return savedToy
        }
        catch (err) {
            showErrorMsg('Cannot add toy')
            console.log('Cannot add toy', err)
        }
    }
}

export function editToy(toy) {
    return async (dispatch) => {
        try {
            const updatedToy = await toyService.save(toy)
            console.log('updatedToy',updatedToy)
            dispatch({
                type: 'UPDATE_TOY',
                updatedToy
            })
            showSuccessMsg('Toy edited')
            return updatedToy
        }
        catch(err) {
            console.log('err',err)
            showErrorMsg('Cannot edit toy', err)
        }
            
    }
}

export function handleChange(event, filterBy) {
    return (dispatch) => {
        var name, value;
        var filter;
        console.log('filterBy', filterBy)

        if (Array.isArray(event)) {
            filter = { selectedOptions: event.map(option => option.label) }
        } else {
            name = event.target.name;
            value = event.target.value;
            filter = {
                [name]: value
            }
        }
        dispatch({
            type: 'SET_FILTER',
            filterBy: filter
        })
        loadToys({ ...filterBy, ...filter })(dispatch)
    }
}


//NOT ASYNC!!!

// export function loadToys(filterBy) {
//     return (dispatch) => {
//         toyService.query(filterBy)
//             .then(toys => {
//                 console.log('Toys from DB:', toys)
//                 dispatch({
//                     type: 'SET_TOYS',
//                     toys
//                 })
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot load toys')
//                 console.log('Cannot load toys', err)
//             })
//     }
// }
// export function onRemoveToy(toyId) {
//     return (dispatch, getState) => {
//         toyService.remove(toyId)
//             .then(() => {
//                 console.log('Toy Deleted Succesfully!');
//                 dispatch({
//                     type: 'REMOVE_TOY',
//                     toyId
//                 })
//                 showSuccessMsg('Toy removed')
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot remove toy')
//                 console.log('Cannot remove toy', err)
//             })
//     }
// }

// export function onAddToy() {
//     return (dispatch) => {
//         const toy = toyService.getEmptyToy();
//         return toyService.save(toy)
//             .then(savedToy => {
//                 console.log('Added Toy', savedToy);
//                 dispatch({
//                     type: 'ADD_TOY',
//                     toy: savedToy
//                 })
//                 showSuccessMsg('Toy added')
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot add toy')
//                 console.log('Cannot add toy', err)
//             })
//     }
// }

// export function editToy(toy) {
//     return (dispatch) => {
//         return toyService.save(toy)
//             .then(toy => {
//                 dispatch({
//                     type: 'UPDATE_TOY',
//                     toy
//                 })

//                 showSuccessMsg('Toy edited')
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot edit toy', err)
//             })
//     }
// }