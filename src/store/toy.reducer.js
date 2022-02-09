const initialState = {
    toys: [],
    filterBy: {
        name: '',
        inStock: false,
        selectedOptions: []
    }
}
export function toyReducer(state = initialState, action) {
    var newState = state
    var toys
    switch (action.type) {
        case 'SET_TOYS':
            newState = {...state, toys: action.toys }
            break
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            newState = {...state, toys }
            break
        case 'ADD_TOY':
            newState = {...state, toys: [...state.toys, action.toy] }
            break
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            newState = {...state, toys }
            break
        case 'SET_FILTER':
            newState = {...state, filterBy: {...state.filterBy, ...action.filterBy } }
            break
            // case 'ADD_TO_CART':
            //     newState = { ...state, cart:[...state.cart, action.car]}
            //     break
            // case 'REMOVE_FROM_CART':
            //     cart = state.cart.filter(car => car._id !== action.carId)
            //     newState = { ...state, cart}
            //     break
            // case 'CLEAR_CART':
            //     newState = { ...state, cart: []}
            //     break
            // case 'UNDO_REMOVE_CAR':
            //     if (state.lastRemovedCar) {
            //         newState = { ...state, cars: [...state.cars, state.lastRemovedCar], lastRemovedCar: null}
            //     }
            //     break
        default:
    }
    return newState

}