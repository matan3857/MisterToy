const initialState = {
    // user: userService.getLoggedinUser(),
    user: '',
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = {...state, user: action.user }
            break;
        default:
    }
    return newState;

}