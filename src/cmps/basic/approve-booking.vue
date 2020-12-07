<template>
<tr>
          <td scope="row">{{ booking.trip.name }}</td>
          <td>{{ booking.user.name }}</td>
          <td>{{ booking.peopleToSign }}</td>
          <td>{{ booking.specialReq }}</td>
          <td>{{ booking.status }}</td>
          <td>{{ booking.datePicked }}</td>
          <td>
            <button :class="{active: isApproved}" @click="approveBooking(booking)">
            <!-- <button v-if="booking.status !== 'approved'" class="action approve-btn"   @click.stop="approveBooking(booking)"> -->
            <!-- <button v-if="booking.status === 'pending'" @click.stop="approveBooking(booking)"> -->
              Accept
            </button>
            <button class="approve-btn" @click.stop="removeBooking(booking)">
            <!-- <button v-if="booking.status === 'approved'" @click.stop="removeBooking(booking)"> -->
              Decline
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
    approveBooking(booking) {
      console.log("🚀 ~ file: approve-booking.vue ~ line 48 ~ approveBooking ~ booking", booking)
      console.log("🚀 ~ file: approve-booking.vue ~ line 50 ~ approveBooking ~  this.isApproved",  this.isApproved)

      // this.isApproved = !this.isApproved
      console.log("🚀 ~ file: approve-booking.vue ~ line 50 ~ approveBooking ~  this.isApproved",  this.isApproved)
      if (booking.status === "pending") {
        booking.status = "approved";
        this.isApproved = true
      } else {
        booking.status = "pending";
        this.isApproved = false
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
    approveBtn() {
      console.log("🚀 ~ file: approve-booking.vue ~ line 71 ~ approveBtn ~ this.isApproved", this.isApproved)
      
      this.isApproved = !this.isApproved
      console.log("🚀 ~ file: approve-booking.vue ~ line 71 ~ approveBtn ~ this.isApproved", this.isApproved)
    }
  }
};
</script>

<style></style>
