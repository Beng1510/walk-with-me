import { httpService } from './http-service.js';
import axios from 'axios'


const baseUrl = 'http://localhost:3000';


export const tripService = {
    query,
    getTripById
    // remove,
    // save,
    // getEmptyTrip
}


async function query() {
// function query(filterBy) {
    // console.log('filter by is:', filterBy)
    const res = await axios.get(`${baseUrl}/trip`)
    return res.data
    

    // const trips = httpService.get(_buildQuery(filterBy));
    // return trips;
}
// /?? good for filter?
// function _buildQuery({ name, tags, difficulty }) {
//     return `trip?name=${name}&tags=${tags}&difficulty=${difficulty}`;
// }


function getTripById(tripId) {
    return httpService.get(`trip/${tripId}`)
}


// function remove(tripId) {
//     return httpService.delete(`toy/${tripId}`)
// }

// function save(trip) {
//     const savedTrip = trip._id ? _update(trip) : _add(trip)
//     return savedTrip
// }

// function _add(trip) {
//     return httpService.post(`trip`, trip)
// }

// function update(trip) {
//     return httpService.put(`trip/${trip._id}`, trip)
// }

// function getEmptyTrip() {
//     return {
//         name: '',
//         price: '',
//         difficulty: '',
//         capacity: '',
//         tags:[]
//     }
// }




















