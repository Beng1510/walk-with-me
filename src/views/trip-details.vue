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
    <div class="info-container">
      <h1>{{ trip.name }}</h1>
      <h3>{{ trip.date }}</h3>
      <h3>
        Price: {{ trip.price }}$ - Trip capacity: {{ trip.capacity }}/10 -
        Difficulty: {{ trip.difficulty }}/5
      </h3>
      <p class="trip-details-description">{{ trip.description }}</p>
      Join These Hikers:
      <ul>
        <li v-for="booking in this.filterdBookings" :key="booking._id">
          <img
            class="trip-details-guide-img profile-img-s"
            :src="require('@/assets/img/users/' + booking.user.imgUrl)"
          />
          {{ booking.user.name }}
        </li>
      </ul>
      <trip-book :trip="trip" @bookTrip="bookTrip" />
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

    <h2>Guide Details</h2>
    <guide-preview :guide="this.guide" />
    <guide-review :guideId="trip.aboutGuide._id" :user="loggedInUser" />
    <!-- <div class="trip-details-guide-container flex space-around">
      <div class="trip-details-guide-info">
        <img
          class="trip-details-guide-img profile-img-l"
          :src="require('@/assets/img/users/' + trip.aboutGuide.imgUrl)"
        />
        <h3>
          {{ trip.aboutGuide.name }} --- Rate: {{ trip.aboutGuide.rate }}/5
        </h3>
      </div>

    </div> -->
  </section>
</template>

<script>
import { tripService } from "../services/trip-service.js";
import { userService } from "../services/user-service.js";
import guideReview from "../cmps/review/guide-review.cmp.vue";
import guidePreview from "../cmps/guide/guide-preview.cmp.vue";
import tripBook from "../cmps/trip/trip-book.cmp.vue";

export default {
  data() {
    return {
      trip: null,
      mapPos: null,
      filterdBookings: null,
      guide: null,
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
    this.guide = await userService.getUserById(this.trip.aboutGuide._id);

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
    guidePreview,
  },
};
</script>
