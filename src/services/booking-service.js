<<<<<<< HEAD
import { httpService } from './http-service.js';
import axios from 'axios';
=======
import { httpService } from './http-service.js'
import axios from 'axios'

>>>>>>> c0f0139e934bd116c7a4299a355a0dc892769308

const baseUrl = 'http://localhost:3000';


export const bookingService = {
    createBooking
  
}


function createBooking(booking) {
   const res = axios.post(`${baseUrl}/booking`,booking)
   return res.data
}