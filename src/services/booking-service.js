import { httpService } from './http-service.js'

const baseUrl = 'http://localhost:3030';

export const bookingService = {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking,
    remove

}

async function getBookings() {
    return httpService.get('booking')
}

async function createBooking(booking) {
    return httpService.post('booking',booking)
}

async function getBookingById(bookingId) {
    return httpService.get(`booking/${bookingId}`)
}

async function updateBooking(booking) {
    return httpService.put(`booking/${booking._id}`, booking)
}

async function remove(booking) {
    console.log('bookingId',booking._id);
    return httpService.delete(`booking/${booking._id}`)

}