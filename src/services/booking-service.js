import { httpService } from './http-service.js'
import axios from 'axios'


const baseUrl = 'http://localhost:3030';


export const bookingService = {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking,
    remove

}

async function getBookings() {
    // const res = await axios.get(`${baseUrl}/booking`)
    // return res.data
    return httpService.get('booking')
}

async function createBooking(booking) {
// console.log('booking1212312321321:', booking)

    return httpService.post('booking',booking)
}

async function getBookingById(bookingId) {
    
    // const res = await axios.get(`${baseUrl}/booking/${bookingId}`)
    // return res.data
    return httpService.get(`booking/${bookingId}`)

}

async function updateBooking(booking) {

    // console.log('booking:', booking)
    // const res = await axios.put(`${baseUrl}/booking/${booking._id}`,booking)
    // return res.data 
    return httpService.put(`booking/${booking._id}`, booking)
}

async function remove(bookingId) {

    // const res = await axios.delete(`${baseUrl}/booking/${booking._id}`)
    // return res.data
    return httpService.delete(`booking/${bookingId}`)

}