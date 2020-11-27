import { httpService } from './http-service.js'
import axios from 'axios'


const baseUrl = 'http://localhost:3000';


export const bookingService = {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking
  
}

async function getBookings() {
const res = await axios.get(`${baseUrl}/booking`)
return res.data

}

async function createBooking(booking) {
   const res = await axios.post(`${baseUrl}/booking`,booking)
   return res.data
}

async function getBookingById(bookingId) {
    const res = await axios.get(`${baseUrl}/booking/${bookingId}`)

    return res.data
}

async function updateBooking(booking) {
    const res = await axios.put(`${baseUrl}/booking/${booking._id}`,booking)
    return res.data 
}