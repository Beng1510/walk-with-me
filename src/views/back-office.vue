<template>
  <section v-if="filterdBookings" class="back-office">
    <h2>Guide Page</h2>
    Hello {{ guide.name }}
    <hr />

    My Bookings:
    <ul>
      <li v-for="booking in filterdBookings" :key="booking._id">
        {{ booking.trip.name }} | Status: {{ booking.status }}
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
    };
  },

  methods: {},
  created() {
    const guide = this.$store.getters.loggedinGuide;
    console.log("guide", guide);
    this.guide = guide;
    // const trip = await tripService.getTripById(tripId);
    // this.trip = trip;

    //     this.user = this.$store.getters.loggedinUser;
    //     console.log("this.user", this.user);
    this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;
    console.log("bookings", bookings);
    this.filterdBookings = bookings.filter(
      (booking) => booking.guide._id === guide._id
    );
    console.log("this.filterdBookings", this.filterdBookings);

    // bookingService.getBookingById(userId);
  },
  components: {},
};
</script>