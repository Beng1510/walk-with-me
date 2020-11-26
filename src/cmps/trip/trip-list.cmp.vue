<template>
  <section class="trip-list">
      <trip-preview 
      v-for="trip in trips" 
      :key="trip._id" 
      :trip="trip" 
      @emitFav="emitFav">
      </trip-preview>
  </section>
</template>

<script>

import tripPreview from './trip-preview.cmp.vue';

export default {
    props: {
        trips: {
            type: Array,
            required: true
        }
    },

    name: 'trip-list',

    components: {
        tripPreview
    }, 

    methods: {
         emitFav(id) {
           this.$emit('emitFav', id);
       } 
    }
}
</script>

<style>

</style>