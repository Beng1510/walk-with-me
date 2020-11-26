import { bookingService } from "../../services/booking-service.js";



export const bookingStore = {
    strict: true,
    state: {
        bookings: [],
        // user: localLoggedinUser
    },
    getters: {

    },
    mutations: {

    },
    actions: {

        async loadBookings(context) {
            const bookings = await bookingService.getBookings();

            context.commit({ type: 'setBookings', bookings })
        },

        async addBooking(context, {booking}) {

            booking.user = context.rootGetters.loggedinUser

            const newBooking = await bookingService.createBooking(booking);

            commit({ type: 'addBooking', newBooking })
        },

        async updateBooking(context, { booking }) {

            context.commit({ type: 'setBooking', booking })
        },



    }
}