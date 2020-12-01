<template>
  <section v-if="bookingToShow" class="back-office">
    <h2>Back Office</h2>
    Hello {{ guide.name }}
    <!-- <button @click="showAddBtn">Add Trip</button> -->
    <hr />
    Your Bookings:
    <table class="back-office-table">
      <thead>
        <tr>
          <th>Trip Name</th>
          <th>Booked By</th>
          <th>Amount of People</th>
          <th>Special Requests</th>
          <th>Status</th>
          <th>Approve Booking</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookingToShow" :key="booking._id">
          <td scope="row">{{ booking.trip.name }}</td>
          <td>{{ booking.user.name }}</td>
          <td>{{ booking.peopleToSign }}</td>
          <td>{{ booking.specialReq }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button @click.stop="approveBooking(booking)">Approve</button>
            <button @click.stop="removeBooking(booking)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>

    <add-trip :guide="this.guide" />
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";
import addTrip from "../cmps/trip/add-trip.cmp.vue";

export default {
  name: "back-office",
  data() {
    return {
      // guide: null,
      filterdBookings: null,
    };
  },

  methods: {
    async approveBooking(booking) {
      if (booking.status === "pending") {
        booking.status = "approved";
        // this.btnText = "Undo"
      } else {
        booking.status = "pending";
        // this.btnText = "Approve"
      }
      this.$store.dispatch({
        type: "updateBooking",
        booking,
      });
    },
    removeBooking(booking) {
      this.$store.dispatch({
        type: "removeBooking",
        booking,
      }),
        this.$store.dispatch({
          type: "loadBookings",
        });
    },
  },
  computed: {
    bookingToShow() {
      const bookings = this.$store.getters.bookings;
      return bookings.filter((booking) => booking.guide._id === this.guide._id);
    },
    guide() {
      return this.$store.getters.loggedinGuide;
    },
  },
  async created() {
    // this.guide = this.$store.getters.loggedinGuide;
    this.$store.dispatch({
      type: "loadBookings",
    });

    // const bookings = this.$store.getters.bookings;
    // console.log("bookings", bookings);

    // this.filterdBookings = bookings.filter(
    //   (booking) => booking.guide._id === this.guide._id
    // );
    // console.log("this.filterdBookings", this.filterdBookings);
  },
  mounted() {
    //   this.guide = this.$store.getters.loggedinGuide;
    //   const bookings = this.$store.getters.bookings;
    //   console.log("bookings", bookings);
    //   this.filterdBookings = bookings.filter(
    //     (booking) => booking.guide._id === this.guide._id
    //   );
  },
  components: {
    addTrip,
  },
};
</script>