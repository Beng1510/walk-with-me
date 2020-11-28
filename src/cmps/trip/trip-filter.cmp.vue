<template>
  <section class="trip-filter">
    <form @submit.prevent="emitFilter">
      <input type="text" v-model="filterBy.name" @input="emitFilter" placeholder="let's search together"/>
      <label for="mountain-tag">
        mountain
        <input
          type="radio"
          id="mountain-tag"
          value="mountain"
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <label for="seaside-tag">
        seaside
        <input
          type="radio"
          id="seaside-tag"
          value="seaside"
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <label for="city-tag">
        city
        <input
          type="radio"
          id="city-tag"
          value="city"
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <label for="forest-tag">
        forest
        <input
          type="radio"
          id="forest-tag"
          value="forest"
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <select v-model="selected">
        <option disabled value="">Please select a destination</option>

        <option v-for="trip in trips" :key="trip._id">
          {{trip.location }}
        </option>

        <!-- <option>B</option>
        <option>C</option> -->
      </select>
      <span>Selected: {{ selected }}</span>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    trips: {
      type: Array,
      required: true,
    },
  },
  name: "trip-filter",

  data() {
    return {
      filterBy: {
        name: "",
        type: "",
      },
      selected: "",
    };
  },

  methods: {
    emitFilter() {
      console.log("emitting");
      const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));
      this.$emit("filterBy", filterByCopy);
    },
    // location() {
    //   this.trips = [...new Set(this.trips)];
    //   console.log('this.trips,loc',this.trips);
    // },
  },
  created() {
   
  },
};
</script>

<style>
</style>