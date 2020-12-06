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
    return await httpService.get('booking')
}

async function createBooking(booking) {
    return await httpService.post('booking', booking)
}

async function getBookingById(bookingId) {
    return await httpService.get(`booking/${bookingId}`)
}

async function updateBooking(booking) {
    return await httpService.put(`booking/${booking._id}`, booking)
}

async function remove(booking) {
    console.log('bookingId', booking._id);
    await httpService.delete(`booking/${booking._id}`)
    return booking
}