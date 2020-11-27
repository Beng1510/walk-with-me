<template>
  <section v-if="filterdBookings" class="back-office">
    <h2>Guide Page</h2>
    Hello {{ guide.name }}
    <hr />

    My Bookings:
    <ul>
      <li v-for="booking in filterdBookings" :key="booking._id">
        {{ booking.trip.name }} | Status: {{ booking.status }}
        <button @click.stop="approveBooking(booking)">{{btnText}}</button>
      </li>
    </ul>
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";

export default {
  name: "back-office",
  data() {
    return {
      guide: null,
      filterdBookings: null,
      btnText: 'Approve'
    };
  },

  methods: {
    async approveBooking(booking) {
      // const booking = await bookingService.getBookingById(bookingId)
      if (booking.status === "pending") {
        booking.status = "approved";
        // this.btnText = "Undo"
      } else {
        booking.status = "pending";
        // this.btnText = "Approve"
      }
      console.log("book after approval", booking);

      this.$store.dispatch({
        type: "updateBooking",
        booking,
      });
    },
  },
  computed: {},
  async created() {
    this.guide = this.$store.getters.loggedinGuide;
    console.log("guide", this.guide);

    this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;
    console.log("bookings", bookings);

    this.filterdBookings = bookings.filter(
      (booking) => booking.guide._id === this.guide._id
    );
    console.log("this.filterdBookings", this.filterdBookings);
  },
  components: {},
};
</script>