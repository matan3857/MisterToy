import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        }
        catch (err) {
            showErrorMsg('Wrong username or password')
            console.log('Cannot login', err)
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        }
        catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        }
        catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}

export function onUpdate(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.update(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        }
        catch (err) {
            showErrorMsg('Wrong password')
            console.log('Cannot update user', err)
        }
    }
}
