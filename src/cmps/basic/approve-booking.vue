<template>
<tr>
          <td scope="row">{{ booking.trip.name }}</td>
          <td>{{ booking.user.name }}</td>
          <td>{{ booking.peopleToSign }}</td>
          <td>{{ booking.specialReq }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button v-if="booking.status !== 'approved'" class="action approve-btn"   @click.stop="approveBooking(booking)">
            <!-- <button v-if="booking.status === 'pending'" @click.stop="approveBooking(booking)"> -->
              Approve
            </button>
            <button class="approve-btn" @click.stop="removeBooking(booking)">
            <!-- <button v-if="booking.status === 'approved'" @click.stop="removeBooking(booking)"> -->
              Reject
            </button>
          </td>
        </tr>
</template>

<script>


export default {
    name: "approve-booking",
    props: {
        booking: {
            type: Object
        }
    },
    data() {
        return {
            isApproved: false
        }
    },
  components: {
   
  },

  computed: {
   
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
  }
};
</script>

<style></style>
