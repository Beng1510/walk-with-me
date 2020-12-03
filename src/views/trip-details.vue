<template>
  <section v-if="trip" class="trip-details">
    <button class="back-btn"><router-link to="/">Back</router-link></button>
      <div class="img-container">
        <img
          v-for="n in 5"
          :key="n"
          class="trip-main-img"
          :src="require('../assets/img/trips/' + trip.imgUrls[0])"
        />
      </div>

    <div class="img-container"  v-for="(n) in 4"
          :key="n">
        <img
          class="trip-main-img"
          :src="require('../assets/img/trips/' + trip.imgUrls[n-1])"
        />
      </div>

    <div class="info-container">
      <h3>{{ trip.date }}</h3>
      <h3>
        Price: {{ trip.price }}$ - Number of Hikers Booked:
        {{ trip.totalBooked }}/10 - Difficulty: {{ trip.difficulty }}/5
      </h3>
      <!-- <p class="trip-details-description">{{ trip.description }}</p> -->
<ul>
  <li v-for="(desc, idx) in this.trip.description" :key="idx">
<p>{{desc}}</p>
  </li>
</ul>


      {{ bookedMsg }}

       <div v-if="this.filterdBookings"> Already Booked: </div>

      <ul>
        <li v-for="booking in this.filterdBookings" :key="booking._id">
          {{ booking.user.name }} - {{booking.peopleToSign}} Tickets Booked
          <img
            class="trip-details-guide-img profile-img-s"
            :src="require('@/assets/img/users/' + booking.user.imgUrl)"
          />
        </li>
      </ul>

      <trip-book :trip="trip" :user="loggedInUser" @bookTrip="bookTrip" />
    </div>
    <div class="about-trip">
      <p class="description">{{ trip.description }}</p>
    </div>
    <trip-book :trip="trip" @bookTrip="bookTrip" />
    <div class="about-guide">
      <h2>Guide Details</h2>
      <guide-preview :guide="this.guide" />
      <guide-review :guideId="trip.aboutGuide._id" :user="loggedInUser" />
    </div>
    <div class="map">
      <GmapMap
        :center="mapPos"
        :zoom="12"
        map-type-id="terrain"
        style="width: 600px; height: 400px"
      >
        <GmapMarker
          :position="mapPos"
          :clickable="true"
          :draggable="true"
          @click="center = mapPos"
        />
      </GmapMap>
    </div>
  </section>
</template>

<script>
import { tripService } from "../services/trip-service.js";
import { userService } from "../services/user-service.js";
import guideReview from "../cmps/review/guide-review.cmp.vue";
import guidePreview from "../cmps/guide/guide-preview.cmp.vue";
import tripBook from "../cmps/trip/trip-book.cmp.vue";

export default {
  name: "trip-details",
  data() {
    return {
      trip: null,
      mapPos: null,
      filterdBookings: null,
      isBooked: false,
      guide: null,
    };
  },

  methods: {
    bookTrip(booking) {
      this.$store.dispatch({ type: "addBooking", booking });
    },
    getBookingByUser(user) {
      const bookings = this.$store.getters.bookings;
      const filteredBookingsByUser = bookings.filter(
        (booking) => booking.user._id === user._id
      );

      filteredBookingsByUser.some((booking) => {
        if (booking.trip.name === this.trip.name) {
          return (this.isBooked = true);
        }
      });
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    getDateString(trip) {
      var date = new Date(this.trip.date);
      return date.toLocaleDateString("en-GB");
    },
    bookedMsg() {
      // console.log('this.isBooked',this.isBooked);
      if (!this.isBooked && this.trip.totalBooked < 10) {
        return "Come & Join The Trip ";
      } else if (this.getBookingByUser === false) {
        return "You've Already Booked This Trip";
      } else return "Sorry, We're Fully Booked";
    },

    // getBookingByUser(user) {
    //   const bookings = this.$store.getters.bookings;

    //   const filteredBookingsByUser = bookings.filter(
    //     (booking) => booking.user._id === this.user._id
    //   );

    //   filteredBookingsByUser.some((booking) => {
    //     if (booking.trip.name === this.trip.name) {
    //       return (this.isBooked = false);
    //     }
    //   });
    // },
  },
  async created() {
    const tripId = this.$route.params.id;
    const trip = await tripService.getTripById(tripId);
    this.trip = trip;
    this.mapPos = this.trip.latlang;
    this.guide = await userService.getUserById(this.trip.aboutGuide._id);

    this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;
    const filteredBookingsByTrip = bookings.filter(
      (booking) => booking.trip._id === tripId
    );
    this.filterdBookings = filteredBookingsByTrip;

    this.getBookingByUser(this.loggedInUser);
  },
  components: {
    guideReview,
    tripBook,
    guidePreview,
  },
};
</script>
