import { bookingService } from "../../services/booking-service.js";



export const bookingStore = {
    strict: true,
    state: {
        bookings: [],
        // user: localLoggedinUser
    },
    getters: {
        bookings(state) {
            return state.bookings
        }
    },
    mutations: {
        setBookings(state, { bookings }) {
            state.bookings = bookings
        },
        addBooking(state, { booking }) {
            state.bookings.unshift(booking)
        }
    },
    actions: {

        async loadBookings(context) {
            const bookings = await bookingService.getBookings();
            console.log('bookings at store', bookings);
            context.commit({ type: 'setBookings', bookings })
        },

        async addBooking(context, { booking }) {
            booking.user = {
                _id: context.rootGetters.loggedinUser._id,
                name: context.rootGetters.loggedinUser.name,
                imgUrl: context.rootGetters.loggedinUser.profileImgUrl,
            },
                // booking.user = context.rootGetters.loggedinUser
                console.log('booking', booking);

            const newBooking = await bookingService.createBooking(booking);
            context.commit({ type: 'addBooking', newBooking })
        },

        async updateBooking(context, { booking }) {
            console.log('booking at store??', booking);
            const updatedBooking = await bookingService.updateBooking(booking)
            console.log('updatedBooking',updatedBooking);
            // context.commit({ type: 'setBooking', booking })
        },



    }
}