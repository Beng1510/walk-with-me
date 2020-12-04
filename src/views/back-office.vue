<template>
  <section v-if="bookingToShow" class="back-office">
    <h2>Back Office</h2>
    Hello {{ guide.name }}
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
      <tbody v-for="booking in bookingToShow" :key="booking._id">
        <!-- <approve-booking :bookings="bookingToShow" :key="booking._id" /> -->
        <approve-booking :booking="booking" :key="booking._id" />
        <!-- <tr v-for="booking in bookingToShow" :key="booking._id">
          <td scope="row">{{ booking.trip.name }}</td>
          <td>{{ booking.user.name }}</td>
          <td>{{ booking.peopleToSign }}</td>
          <td>{{ booking.specialReq }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button v-if="booking.status === 'pending'" @click.stop="approveBooking(booking)">
              Approve
            </button>
            <button v-if="booking.status === 'approved'" @click.stop="removeBooking(booking)">
              Reject
            </button>
          </td>
        </tr> -->
      </tbody>
    </table>

    <add-trip :guide="this.guide" />
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";
import addTrip from "../cmps/trip/add-trip.cmp.vue";
import approveBooking from '../cmps/basic/approve-booking.vue'
export default {
  name: "back-office",
  data() {
    return {
      filterdBookings: null,
     
    };
  },

  methods: {
    async approveBooking(booking) {
      if (booking.status === "pending") {
        booking.status = "approved";
      } else {
        booking.status = "pending";
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
    // async getStatusBooking() {
    //   const bookings = await this.$store.getters.bookings;
    //   const filteredBookings = bookings.filter(
    //     (booking) => booking.guide._id === this.guide._id
    //   );

    //   filteredBookings.forEach((booking) => {
    //     booking.guide._id === this.guide._id;
       
    //     if (booking.status === "approved") {
    //       return (this.showApproveBtn = false);
    //       // } else return this.showRejectBtn = true;
        

    //     }
      // });
    // },
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
    this.$store.dispatch({
      type: "loadBookings",
    });
    // this.getStatusBooking();
  },
  components: {
    addTrip,
    approveBooking
  },
};
</script>