<template>
  <section class="user-msg">
   
 <div v-if="alive" class="alert" :class="alertClass" >
       <h2> {{msg.txt}} </h2>
       <p> {{msg.subTxt}} </p>
    </div>

  </section>
</template>

<script>

import {eventBusService, SHOW_MSG} from '../../services/eventBus-service.js'

export default {
    data() {
         return {
            alive : false,
            msg: null
        }
    },

    computed: {
        alertClass() {
            if (!this.msg) return;
            return `alert-${this.msg.type}`
        }
    },
     created() {
        eventBusService.$on(SHOW_MSG, msg=>{
            this.msg = msg;
            var delay = msg.delay || 2000;
            this.alive = true;
            setTimeout(() => {
                this.alive = false;
            }, delay)
        })
    },
}
</script>

<style>

</style>