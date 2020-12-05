<template>

  <tr>
    <td scope="row">{{ booking.trip.name }}</td>
    <td>{{ booking.guide.name }}</td>
    <td>{{ booking.status }}</td>
    <td>
      <button @click.stop="removeBooking(booking)">Cancel</button>
      <!-- <button v-if="booking.status === 'pending'" @click.stop="approveBooking(booking)"> -->
      <!-- Approve -->
      <!-- </button> -->
    </td>
  </tr>

      <!-- <button @click.stop="removeBooking(booking)">Cancel</button> -->



</template>

<script>
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
  components: {},

  computed: {},

  methods: {
    removeBooking(booking) {
      this.$store.dispatch({
        type: "removeBooking",
        booking: JSON.parse(JSON.stringify(this.booking))
      }),
        this.$store.dispatch({
          type: "loadBookings",
        });
    },
  },
  created(){
    console.log('trip',this.booking.trip);
  }
};
</script>

<style></style>
