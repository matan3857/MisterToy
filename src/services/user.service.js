import Axios from 'axios';
import { httpService } from './http.service'

const axios = Axios.create({
    withCredentials: true
});

// const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    update,
    getLoggedinUser
}

async function signup(userInfo) {
    const res = await axios.post(`http://localhost:3030/api/auth/signup`, userInfo)
    return res.data

    // return storageService.post(STORAGE_KEY, userInfo)
    //     .then((user) => {
    //         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    //         return user;
    //     })
}

async function login(credentials) {
    try {
        const res = await axios.post('http://localhost:3030/api/auth/login', credentials)
        const user = res.data
        if (user) {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        }
        return user
    }
    catch (err) {
        console.log('server replied: cannot login', err)
        throw err
    }
    // const res = await axios.post(`http://localhost:3030/api/auth/login`, credentials)
    // return res.data

    // return storageService.query(STORAGE_KEY).then(users => {
    //     const user = users.find(user => user.username === credentials.username &&
    //                 user.password === credentials.password)
    //     if (user) {
    //         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    //     }
    //     return user;
    // })
}

async function logout() {
    const res = await axios.post(`http://localhost:3030/api/auth/logout`)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    console.log('res from user service',res)
    return res.data
    
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

async function update(user) {
    try {
        // const res = await axios.put(`http://localhost:3030/api/user/${user._id}`, user)
        const updatedUser = await httpService.put('user', user)
        if (updatedUser) {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(updatedUser))
        }
        return updatedUser
    }
    catch (err) {
        console.log('server replied: cannot login', err)
        throw err
    }
}