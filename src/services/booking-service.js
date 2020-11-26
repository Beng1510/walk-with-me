import { httpService } from './http-service.js';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';


export const bookingService = {
    createBooking
  
}


function createBooking(booking) {
   const res = axios.post(`${baseUrl}/booking`,booking)
   return res.data
}