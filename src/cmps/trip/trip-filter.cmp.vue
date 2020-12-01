<template>
  <section class="trip-filter">
    <form @submit.prevent="emitFilter">
      <el-input
        type="text"
        v-model="filterBy.name"
        @input="emitFilter"
        placeholder="let's search together"
      />
      <!-- <label for="all-tag">
        All
        <input
          type="radio"
          id="all-tag"
          value=""
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <label for="mountain-tag">
        Mountain
        <input
          type="radio"
          id="mountain-tag"
          value="mountain"
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <label for="seaside-tag">
        Seaside
        <input
          type="radio"
          id="seaside-tag"
          value="seaside"
          v-model="filterBy.type"
          @select="emitFilter"
        />
      </label>
      <label for="city-tag">
        City
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
      </label> -->
      <br />

      <el-radio
        type="radio"
        id="all-tag"
        value=""
        v-model="filterBy.type"
        @select="emitFilter"
        label=""
        >All
      </el-radio>

      <el-radio
        type="radio"
        id="mountain-tag"
        value="mountain"
        v-model="filterBy.type"
        @select="emitFilter"
        label="mountain"
        >Mountain
      </el-radio>
      <el-radio
        type="radio"
        id="seaside-tag"
        value="seaside"
        v-model="filterBy.type"
        @select="emitFilter"
        label="seaside"
        >Seaside
      </el-radio>
      <el-radio
        type="radio"
        id="city-tag"
        value="city"
        v-model="filterBy.type"
        @select="emitFilter"
        label="city"
        >City
      </el-radio>
      <el-radio
        type="radio"
        id="forest-tag"
        value="forest"
        v-model="filterBy.type"
        @select="emitFilter"
        label="forest"
        >Forest
      </el-radio>

      <select v-model="selected">
        <option disabled value="">Please select a destination</option>
        <option value="Usa">United States</option>
        <option value="Erup">Europe</option>
        <option value="Asia">Asia</option>

        <!-- <option v-for="trip in trips" :key="trip._id">
          <label >{{trip.location }}</label>
        </option> -->
      </select>

      <span>Selected: {{ selected }}</span>
      <el-button type="success" @click="emitFilter">Search 🍳</el-button>
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
        type: "All",
        location: "",
        region: ""
      },
      selected: "",
    };
  },

  methods: {
    emitFilter(filter) {
      console.log("this.filterBy:", this.filterBy);
      const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));
      console.log("filterByCopy:", filterByCopy);

      this.$emit("filterBy", filterByCopy);
    },
    // location() {
    //   this.trips = [...new Set(this.trips)];
    //   console.log('this.trips,loc',this.trips);
    // },
  },
  created() {},
};
</script>

<style>
</style>