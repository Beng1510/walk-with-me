<template>
  <section v-if="bookingToShow" class="back-office">
    <h1>Trip Manager</h1>
    <h3>Hello, {{ guide.name }}</h3>
    <h3>Your Bookings:</h3>

    <table class="back-office-table">
      <thead>
        <tr>
          <th>Trip Name</th>
          <th>Booked By</th>
          <th>Signed</th>
          <th>Special Requests</th>
          <th>Status</th>
          <th>Approve Booking</th>
        </tr>
      </thead>
      <tbody v-for="booking in bookingToShow" :key="booking._id">
        <approve-booking :booking="booking" :key="booking._id" />
      </tbody>
    </table>
    
    <add-trip :guide="this.guide" />
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";
import addTrip from "../cmps/trip/add-trip.cmp.vue";
import approveBooking from "../cmps/basic/approve-booking.vue";
// import chart from '../cmps/basic/chart.cmp.vue'

export default {
  name: "back-office",
  data() {
    return {
      filterdBookings: null,
    };
  },

  methods: {
    async approveBooking(booking) {
      if (booking.status === "pending") {
        booking.status = "approved";
      } else {
        booking.status = "pending";
      }
      this.$store.dispatch({
        type: "updateBooking",
        booking,
      });
    },
    removeBooking(booking) {
      this.$store.dispatch({
        type: "removeBooking",
        booking,
      }),
        this.$store.dispatch({
          type: "loadBookings",
        });
    },
    // async getStatusBooking() {
    //   const bookings = await this.$store.getters.bookings;
    //   const filteredBookings = bookings.filter(
    //     (booking) => booking.guide._id === this.guide._id
    //   );

    //   filteredBookings.forEach((booking) => {
    //     booking.guide._id === this.guide._id;

    //     if (booking.status === "approved") {
    //       return (this.showApproveBtn = false);
    //       // } else return this.showRejectBtn = true;

    //     }
    // });
    // },
  },
  computed: {
    bookingToShow() {
      const bookings = this.$store.getters.bookings;
      console.log(bookings, "BOOKINGGGG");
      return bookings.filter((booking) => booking.guide._id === this.guide._id);
    },
    guide() {
      return this.$store.getters.loggedinGuide;
    },
  },
  async created() {
    this.$store.dispatch({
      type: "loadBookings",
    });
    // this.getStatusBooking();
  },
  components: {
    addTrip,
    approveBooking,
    // chart
  },
};
</script>
