<template>
  <section v-if="user" class="user-details">
    <h2>User Page</h2>
    {{ user.profileImgUrl }} <br />
    {{ user.name }} <br />
<h3> Favorite Trips </h3>
    <ul>
      <li v-for="trip in user.favoriteTrips" :key="trip._id">
        {{ trip.name }}
        {{ trip.date }}
      </li>
    </ul>
    <hr/>
    <h3> Bookings </h3>
    <!-- {{user.favoriteTrips}} -->
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";

export default {
  data() {
    return {
      user: null,
      booking: null,
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

    // bookingService.getBookingById(userId);
  },
  components: {},
};
</script>