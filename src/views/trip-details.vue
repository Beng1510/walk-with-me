<template>
  <section v-if="trip" class="trip-details">
    <button class="back-btn"><router-link to="/">Back</router-link></button>

    <div class="trip-details-header flex space-between">
      <div class="trip-details-img-container">
        <img
          class="trip-main-img"
          :src="require('../assets/img/trips/' + trip.imgUrls[0])"
        />
      </div>

      <div class="trip-details-map">
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
    </div>
    <div class="trip-details-info-container">
      <h2>{{ trip.name }} --- {{ trip.date }}</h2>
      <!-- <h3>Type: {{ trip.type }}</h3> -->
      <!-- <h3>Trip date: {{ trip.date }}</h3> -->
      <!-- <h3>Trip type: {{ trip.tags }}</h3> -->
      <h3>
        Price: {{ trip.price }}$ - Trip capacity: {{ trip.capacity }}/10 -
        Difficulty: {{ trip.difficulty }}/5
      </h3>
      <!-- <h3>Trip capacity: {{ trip.capacity }}/10</h3>
    <h3>Trip difficulty: {{ trip.difficulty }}</h3> -->
      <p class="trip-details-description">{{ trip.description }}</p>
      Join These Hikers:
      <ul>
        <li v-for="booking in this.filterdBookings" :key="booking._id">
          {{ booking.user.name }}
        </li>
      </ul>
      <trip-book :trip="trip" @bookTrip="bookTrip" />
    </div>

    <h2>Guide Details</h2>
    <div class="trip-details-guide-container flex space-around">
      <div class="trip-details-guide-info">
        <img
          class="trip-details-guide-img"
          :src="require('@/assets/img/users/' + trip.aboutGuide.imgUrl)"
        />
        <h3>
          {{ trip.aboutGuide.name }} --- Rate: {{ trip.aboutGuide.rate }}/5
        </h3>
      </div>

      <guide-review :guideId="trip.aboutGuide._id" :user="loggedInUser" />
    </div>
  </section>
</template>

<script>
import { tripService } from "../services/trip-service.js";
import guideReview from "../cmps/review/guide-review.cmp.vue";
import tripBook from "../cmps/trip/trip-book.cmp.vue";

export default {
  data() {
    return {
      trip: null,
      mapPos: null,
      filterdBookings: null,
    };
  },

  methods: {
    bookTrip(booking) {
      this.$store.dispatch({ type: "addBooking", booking });
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  async created() {
    const tripId = this.$route.params.id;
    const trip = await tripService.getTripById(tripId);
    this.trip = trip;
    this.mapPos = this.trip.latlang;

    this.$store.dispatch({
      type: "loadBookings",
    });

    const bookings = this.$store.getters.bookings;

    this.filterdBookings = bookings.filter(
      (booking) => booking.trip._id === tripId
    );

  },
  components: {
    guideReview,
    tripBook,
  },
};
</script>