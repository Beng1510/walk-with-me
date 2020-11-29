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
      <select v-model="selected" >
        <option disabled value="">Please select a destination</option>
        <option  value="Usa">United States</option>
        <option  value="Erup">Europe</option>
        <option  value="Asia">Asia</option>

        <!-- <option v-for="trip in trips" :key="trip._id">
          <label >{{trip.location }}</label>
        </option> -->
      </select>

      <span>Selected: {{ selected }}</span>
      <button>Search 🍳</button>
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
        location:"",
        
      },
      selected: "",
    };
  },

  methods: {
    emitFilter(filter) {
     
      
      const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));
      // console.log('filterByCopy:', filterByCopy)
      
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