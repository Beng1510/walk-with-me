<template>
  <section class="trip-list">
    <trip-preview
      v-for="trip in trips"
      :key="trip._id"
      :trip="trip"
      @emitFav="emitFav"
      @click="goToDetails(trip._id)"
    >
    </trip-preview>
  </section>
</template>

<script>
import tripPreview from "./trip-preview.cmp.vue";

export default {
  props: {
    trips: {
      type: Array,
      required: true,
    },
  },

  name: "trip-list",

  components: {
    tripPreview,
  },

  methods: {
    emitFav(id) {
      this.$emit("emitFav", id);
    },

    //    goToDetails() {
    goToDetails(id) {
      console.log("hi from list");
      router.push({ name: "trip", params: { id } });
    },
  },
};
</script>

<style>
</style>