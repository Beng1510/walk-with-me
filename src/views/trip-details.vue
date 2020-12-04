<template>
  <section v-if="trip" class="trip-details">
    <div class="img-container">
      <img
        v-for="n in 4"
        :key="n"
        class="trip-img"
        :src="require('../assets/img/trips/' + trip.imgUrls[n - 1])"
      />
    </div>
 <h1>{{ trip.name }}</h1>
  
    <div class="main-grid">

      <div class="start">

        <div class="info-trip">
          <h3>{{ trip.totalBooked }}/10 signed</h3>
          <h3>Difficulty: {{ trip.difficulty }}/5</h3>
          <h3>{{ trip.duration }}</h3>
          <h3>{{ trip.region }}</h3>
        </div>

        <div class="about-trip">
          <p v-for="(desc, idx) in this.trip.description" :key="idx">
            {{ desc }}
          </p>
           <div v-if="this.filterdBookings">Already Booked:</div>
          <ul>
            <li v-for="booking in this.filterdBookings" :key="booking._id">
              {{ booking.user.name }} - {{ booking.peopleToSign }} Tickets
              Booked
              <img
                class="trip-details-guide-img profile-img-s"
                :src="require('@/assets/img/users/' + booking.user.imgUrl)"
              />
              />
            </li>
          </ul>
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
      </div>
        </div>
        
      <div class="end">
        {{ bookedMsg }}
        <trip-book :trip="trip" :user="user" @bookTrip="bookTrip" />
        <div class="about-guide">
          <h1>Meet Your Guide</h1>
          <guide-preview :guide="this.guide" />
          <guide-review :guideId="trip.aboutGuide._id" :user="loggedInUser" />
        </div>
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
      user: null,
    };
  },

  methods: {
    bookTrip(booking) {
      // console.log('bookingssssssss:', booking)

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
      if (!this.isBooked && this.trip.totalBooked < 10) {
        return "Come & Join The Trip ";
      } else if (this.getBookingByUser === false) {
        return "You've Already Booked This Trip";
      } else return "Sorry, We're Fully Booked";
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
