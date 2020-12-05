<template>
<div class="flex column"> 
  <!-- <tr> -->
    <!-- <td scope="row">{{ booking.trip.name }}</td> -->
    <!-- <td>{{ booking.guide.name }}</td> -->
    <!-- <td>{{ booking.status }}</td> -->
    <!-- <td> -->
      <!-- <trip-list :trips="tripsToShow" @emitFav="toggleFav" /> -->
<trip-preview
      v-for="trip in tripsToShow"
      :key="trip._id"
      :tripId="trip._id"
      @emitFav="emitFav"
      @click="goToDetails(trip._id)"
    >
    </trip-preview>
      <button @click.stop="removeBooking(booking)">Cancel</button>
      <!-- <button v-if="booking.status === 'pending'" @click.stop="approveBooking(booking)"> -->
      <!-- Approve -->
      <!-- </button> -->
    <!-- </td> -->
  <!-- </tr> -->
</div>
</template>

<script>
// import tripList from "../trip/trip-list.cmp.vue";
import tripPreview from '../trip/trip-preview.cmp.vue'
export default {
  name: "booking-list",
  props: {
    booking: {
      type: Object,
    },
  },
  data() {
    return {
      isApproved: false,
    };
  },
  components: {
    // tripList,
    tripPreview
  },

  computed: {
    tripsToShow() {
      const trips = this.$store.getters.tripsForDisplay;
      const filteredTrips = trips.filter((trip) => trip._id === this.booking.trip._id);
      return filteredTrips
    },
  },

  methods: {
    removeBooking(booking) {
      this.$store.dispatch({
        type: "removeBooking",
        booking: JSON.parse(JSON.stringify(this.booking)),
      }),
        this.$store.dispatch({
          type: "loadBookings",
        });
    },
      toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
     emitFav(trip) {
      this.$emit("emitFav", trip);
    },
  },
  created(){
  }
};
</script>

<style></style>
