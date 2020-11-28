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
    console.log('filterService:', filterBy)
    let qst = ''
    if (filterBy) {
        qst = getQueryStrPrms(filterBy)
     
    }
    const res = await axios.get(`${baseUrl}/trip${qst}`)
    
    return res.data

    // const trips = httpService.get(_buildQuery(filterBy));
    // return trips;
}
function getQueryStrPrms(filterBy) {
    
    let str = '?'
    if (filterBy.name) {
        str += `q=${filterBy.name}&`
    }
    if (filterBy.type) {
        str += `type=${filterBy.type}`
    }
    
    console.log('str:', str)
   
    return str
}

async function getTripById(tripId) {

    const res = await axios.get(`${baseUrl}/trip/${tripId}`)
    return res.data
    // return httpService.get(`trip/${tripId}`)
}


// function remove(tripId) {
//     return httpService.delete(`toy/${tripId}`)
// }

function save(trip) {
    const savedTrip = trip._id ? _update(trip) : _add(trip)
    return savedTrip
}

function _add(trip) {

    const res = axios.post(`${baseUrl}/trip`, trip)
    return res.data

    // return httpService.post(`trip`, trip)
}

// function update(trip) {
//     return httpService.put(`trip/${trip._id}`, trip)
// }

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
       
    }
}




















