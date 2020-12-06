<template>
  <section v-if="msg" class="user-msg">
    <div class="alert" :class="alertClass">
      <h1>{{ msg }}</h1>
    </div>
  </section>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../../services/eventBus-service.js";
import socketService from "../../services/socket-service.js";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      alive: false,
      msg: null,
    };
  },

  computed: {
    alertClass() {
      if (!this.msg) return;
      return `alert-${this.msg.type}`;
    },
  },
  methods: {
    closeMgs() {
      this.msg = null;
    },
  },
  created() {
    

    // if(){
    // socketService.setup();
    socketService.on("sendBooking", (booking) => {
    
      this.msg = `${booking.user.name} booked new trip now, pending approval`;
      setTimeout(() => {
        this.closeMgs();
      }, 3500);
    });

    socketService.on("approveBooking", (booking) => {
    
      this.msg = `${booking.guide.name} approved your booking`;
      setTimeout(() => {
        this.closeMgs();
      }, 3500);
    });
    // } else {

    // socketService.on("sendApproveBooking", (booking) => {
    //   console.log('bookingdddddd:', this.booking)
    //   this.msg = `The trip in the name of ${this.booking.trip.name} has been approved for you!`;
    //   setTimeout(() => {
    //     this.closeMgs();
    //   }, 3500);
    // });
    // }
  },
};
</script>

<style>
</style>