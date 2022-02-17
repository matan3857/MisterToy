import { utilService } from './util.service.js'
import { httpService } from './http.service'
import Axios from 'axios';

const axios = Axios.create({
    withCredentials: true
});

const STORAGE_KEY = 'toy'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

async function query(filterBy = {}) {
    const res = await axios.get('http://localhost:3030/api/toy', { params: filterBy })
    return res.data
}

async function getById(toyId) {
    const res = await axios.get(`http://localhost:3030/api/toy/${toyId}`)
    return res.data
}

async function remove(toyId) {
    const res = await axios.delete(`http://localhost:3030/api/toy/${toyId}`)
    return res.data
}

async function save(toy) {
    let res
    if (toy._id) {
        // res = await axios.put(`http://localhost:3030/api/toy`, toy)
        // return res.data
        const updatedToy = await httpService.put('toy', toy)
        return updatedToy
    } else {
        res = await axios.post(`http://localhost:3030/api/toy`, toy)
        return res.data
    }
}

function getEmptyToy() {
    return {
        name: `Talking Doll${utilService.getRandomIntInclusive(100, 999)}`,
        price: utilService.getRandomIntInclusive(20, 100),
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: Date.now(),
        inStock: true
    }
}

function filterToys(toys, filterBy) {
    switch (filterBy.sortBy) {
        case 'name':
            toys.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            break;

        case 'price':
            toys.sort(function (a, b) {
                return a.price - b.price
            });
            break;

        case 'created':
            toys.sort(function (a, b) {
                return a.createdAt - b.createdAt
            });
            break;

        default:
            break;
    }

    if (filterBy.inStock === 'inStock') {
        toys = toys.filter(toy => toy.inStock === true)
    }

    if (filterBy.selectedOptions.length > 0) {
        toys = toys.filter(toy => {
            return filterBy.selectedOptions.some(option => toy.labels.includes(option))
        })
    }
    return toys.filter(toy => toy.name.toLowerCase().includes(filterBy.name.toLowerCase()))
}