<template>
  <section v-if="!user.isGuide" class="user-details">
    <img
      class="guide-preview-img profile-img-l "
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
   
    <h2>Hi {{ user.name }}, Welcome Back</h2>
    <br />
    <h3>Favorite Trips</h3>
    <trip-list v-if="user" :trips="user.favoriteTrips" @emitFav="toggleFav" />

    <hr />
    <div class="user-bookings-list" v-if="bookingToShow">
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
          <tr v-for="booking in bookingToShow" :key="booking._id">
            <td scope="row">{{ booking.trip.name }}</td>
            <td>{{ booking.guide.name }}</td>
            <td>{{ booking.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";
import tripList from "../cmps/trip/trip-list.cmp.vue";

export default {
  name: "user-details",
  data() {
    return {
      user: null,
      filterdBookings: null,
    };
  },

  methods: {
    toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
  },
  computed: {
    bookingToShow() {
      const bookings = this.$store.getters.bookings;
      return bookings.filter((booking) => booking.user._id === this.user._id);
    },
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.$store.dispatch({
      type: "loadBookings",
    });
  },
  components: {
    tripList,
  },
};
</script>