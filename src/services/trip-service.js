import { httpService } from './http-service.js';
import axios from 'axios'


const baseUrl = 'http://localhost:3000';


export const tripService = {
    query,
    getTripById,
    // remove,
    save,
    getEmptyTrip
}


async function query(filterBy = {}) {
    let qst = ''
    if (filterBy) {
        qst = getQueryStrPrms(filterBy)
     
    }
    const res = await axios.get(`${baseUrl}/trip${qst}`)
    
    // return res.data
    // const trips = httpService.get(_buildQuery(filterBy));

    return trips;
}
function getQueryStrPrms(filterBy) {
    console.log('filterBy',filterBy);
    let str = '?'
    if (filterBy.name) {
        str += `q=${filterBy.name}&`
    }
    if (filterBy.type) {
        str += `type=${filterBy.type}`
    }
    if (filterBy.region) {
        str += `region=${filterBy.region}`
    }
    return str
}

async function getTripById(tripId) {

    const res = await axios.get(`${baseUrl}/trip/${tripId}`)
    return res.data
    // return httpService.get(`trip/${tripId}`)
}


function save(trip) {
    const savedTrip = trip._id ? _update(trip) : _add(trip)
    return savedTrip
}

async function _add(trip) {
    const res = await axios.post(`${baseUrl}/trip`, trip)
    return res.data

    // return httpService.post(`trip`, trip)
}

async function _update(trip) {
    // return httpService.put(`trip/${trip._id}`, trip)
    const res = await axios.put(`${baseUrl}/trip/${trip._id}`, trip);
    return res.data;
}

function getEmptyTrip() {
    return {
        name: '',
        price: '',
        difficulty: '',
        capacity: 0,
        type: '',
        imgUrls: [
            'default1.jpeg'
        ],
        createdAt: new Date(),

    }
}




















