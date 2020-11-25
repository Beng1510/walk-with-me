import { httpService } from './http-service.js';

export const tripService = {
    query,
    getTripById,
    remove,
    save,
    getEmptyTrip
}


function query(filterBy) {
    console.log('filter by is:', filterBy)
    const trips = httpService.get(buildQuery(filterBy));
    return trips;
}


function buildQuery({ name, tags, difficulty }) {
    return `toy?name=${name}&tags=${tags}&difficulty=${difficulty}`;
}

function getTripById(tripId) {
    return httpService.get(`trip/${tripId}`)
}

function remove(tripId) {
    return httpService.delete(`toy/${tripId}`)
}

function save(trip) {
    const savedTrip = trip._id ? _update(trip) : _add(trip)
    return savedTrip
}


function _add(trip) {
    return httpService.post(`trip`, trip)
}

function _update(trip) {
    return httpService.put(`trip/${trip._id}`, trip)
}

function getEmptyTrip() {
    return {
        name: '',
        price: '',
        difficulty: '',
        capacity: '',
        tags:[]
    }
}




















