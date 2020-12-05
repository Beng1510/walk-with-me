<template>
  <section v-if="msg" class="user-msg">
    <div class="alert" :class="alertClass">
      <!-- <h2>{{ msg.txt }}</h2>
      <p>{{ msg.subTxt }}</p> -->
      <h1 >{{ msg }}</h1>
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
    }
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
    // eventBusService.$on(SHOW_MSG, msg=>{
      //     this.msg = msg;
    //     var delay = msg.delay || 2000;
    //     this.alive = true;
    //     setTimeout(() => {
      //         this.alive = false;
    //     }, delay)
    console.log('user',this.user)
    // })
    socketService.setup();
    socketService.on("sendBooking", (booking) => {
      this.msg = `${this.user.name}  booked new trip now, pending approval`;

      setTimeout(() => {
        this.closeMgs();
      }, 3500);
    });
  },
}
</script>

<style>
</style>