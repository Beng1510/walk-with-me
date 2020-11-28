<template>
  <section v-if="filterdBookings" class="back-office">
    <h2>Back Office</h2>
    Hello {{ guide.name }}
    <button>Add Trip</button>
    <hr />
    Your Bookings:
    <table class="back-office-table">
      <thead>
        <tr>
          <th>Trip Name </th>
          <th>Booked By</th>
          <th>Amount of People</th>
          <th>Special Requests</th>
          <th>Status</th>
          <th>Approve Booking</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in filterdBookings" :key="booking._id">
          <td scope="row">{{ booking.trip.name  }}</td>  
       <td>{{ booking.user.name }}  </td> 
       <td>{{ booking.peopleToSign }}  </td> 
       <td>{{ booking.specialReq }}  </td> 
       <td>{{ booking.status }}  </td> 
       <td><button @click.stop="approveBooking(booking)">{{ btnText }}</button></td>
       </tr>
   </tbody>

</table>
  </section>
</template>

<script>
import { userService } from "../services/user-service.js";
import { bookingService } from "../services/booking-service.js";

export default {
  name: "back-office",
  data() {
    return {
      guide: null,
      filterdBookings: null,
      btnText: "Update",
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
      console.log("book after approval", booking);

      this.$store.dispatch({
        type: "updateBooking",
        booking,
      });
    },
  },
  computed: {},
  async created() {
    // this.guide = this.$store.getters.loggedinGuide;
    console.log("guide", this.guide);

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
    this.guide = this.$store.getters.loggedinGuide;
    const bookings = this.$store.getters.bookings;
    console.log("bookings", bookings);

    this.filterdBookings = bookings.filter(
      (booking) => booking.guide._id === this.guide._id
    );
  },
  components: {},
};
</script>