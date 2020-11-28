<template>
  <section v-if="trip" class="trip-details">
    <button class="back-btn"><router-link to="/">Back</router-link></button>
    <h2>trip Details</h2>
    <div class="trip-detials-header flex space-between">
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
          style="width: 500px; height: 300px"
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

    <h2>Name: {{ trip.name }}</h2>
    <!-- <h3>Type: {{ trip.type }}</h3> -->
    <h3>Trip date: {{ trip.date }}</h3>
    <h3>Trip type: {{ trip.tags }}</h3>
    <h3>Price: {{ trip.price }}$</h3>
    <h3>Trip capacity: {{ trip.capacity }}/10</h3>
    <h3>Trip difficulty: {{ trip.difficulty }}</h3>
    <p>Description {{ trip.description }}</p>

    <trip-book :trip="trip" @bookTrip="bookTrip" />

    <h2>Guide Details</h2>
    <h3>Guide name: {{ trip.aboutGuide.name }}</h3>
    <h3>Guide rate: {{ trip.aboutGuide.rate }}</h3>
    <h3>ID {{ trip.aboutGuide._id }} just for chacking!!!!!</h3>
    <img class="guidImg" :src="trip.aboutGuide.imgUrl" alt="Image..." />

    <guide-review :guideId="trip.aboutGuide._id" />
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
    };
  },

  methods: {
    bookTrip(booking) {
      this.$store.dispatch({ type: "addBooking", booking });
    },
  },
  async created() {
    const tripId = this.$route.params.id;
    const trip = await tripService.getTripById(tripId);
    this.trip = trip;
    this.mapPos = this.trip.latlang;
  },
  components: {
    guideReview,
    tripBook,
  },
};
</script>