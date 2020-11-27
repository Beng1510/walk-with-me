<template>
  <section v-if="filterdBookings" class="user-details">
    <h2>User Page</h2>
    {{ user.profileImgUrl }} <br />
    {{ user.name }} <br />
    <h3>Favorite Trips</h3>
    <ul>
      <li v-for="trip in user.favoriteTrips" :key="trip._id">
        {{ trip.name }}
        {{ trip.date }}
      </li>
    </ul>
    <hr />
    <h3>Your Bookings</h3>
    <ul>
        <li v-for="booking in filterdBookings" :key="booking._id">
    {{ booking.status }}

        </li>
    </ul>
    <hr />
    <!-- {{user.favoriteTrips}} -->
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";

export default {
    name: "user-details",
  data() {
    return {
      user: null,
      filterdBookings: null,
    };
  },

  methods: {},
  async created() {
    const userId = this.$store.getters.loggedinUser._id;
    console.log("userId", userId);
    // const trip = await tripService.getTripById(tripId);
    // this.trip = trip;
    this.user = this.$store.getters.loggedinUser;
    console.log("this.user", this.user);
 this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;
    console.log('bookings',bookings);
    this.filterdBookings = bookings.filter((booking) => booking.user._id === userId);
    console.log('this.filterdBookings',this.filterdBookings);

    // bookingService.getBookingById(userId);
  },
  components: {},
};
</script>