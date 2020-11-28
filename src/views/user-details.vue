<template>
  <section v-if="filterdBookings" class="user-details">
    <!-- <img
      class="user-details-img"
      :src="require('~@/assets/img/users/' + user.profileImgUrl)"
    /> -->
    <img
      class="guide-preview-img"
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
    <!-- {{user.profileImgUrl}} -->
    <!-- {{ user.profileImgUrl }} <br /> -->
    <h3>Hi {{ user.name }} Welcome Back</h3>
    <br />
    <h3>Favorite Trips</h3>

    <table class="user-details-favorite-table">
      <thead>
        <tr>
          <th>Trip Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in user.favoriteTrips" :key="trip._id">
          <td scope="row">{{ trip.name }}</td>

          <td>{{ trip.date }}</td>
        </tr>
      </tbody>
    </table>

    <hr />
    <h3>Your Bookings</h3>

    <table class="user-details-table">
      <thead>
        <tr>
          <th>Trip Name</th>
          <th>Guide Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in filterdBookings" :key="booking._id">
          <td scope="row">{{ booking.trip.name }}</td>
          <td>{{ booking.guide.name }}</td>
          <td>{{ booking.status }}</td>
        </tr>
      </tbody>
    </table>
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
    // console.log("userId", userId);
    // const trip = await tripService.getTripById(tripId);
    // this.trip = trip;

    this.user = this.$store.getters.loggedinUser;
    // console.log("this.user", this.user);
    this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;
    console.log("bookings", bookings);
    this.filterdBookings = bookings.filter(
      (booking) => booking.user._id === userId
    );
    console.log("this.filterdBookings", this.filterdBookings);
  },
  components: {},
};
</script>