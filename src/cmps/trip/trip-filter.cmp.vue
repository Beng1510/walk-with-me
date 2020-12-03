<template>
  <section class="trip-filter">
    <form @submit.prevent="emitFilter">
      <!-- <el-input
        type="text"
        v-model="filterBy.name"
        @input="emitFilter"
        placeholder="let's search together"
      /> -->

      <!-- <label for="all-tag">
        All
        <input
          type="radio"
          id="all-tag"
          value=""
          v-model="filterBy.type"
          @select="emitFilter" hidden checked
        />
      </label>
      <label for="mountain-tag">
        Mountain
        <input
          type="radio"
          id="mountain-tag"
          value="mountain"
          v-model="filterBy.type"
          @select="emitFilter" hidden
        />
      </label>
      <label for="seaside-tag" class="tag">
        Seaside
        <input
          type="radio"
          id="seaside-tag"
          value="seaside"
          v-model="filterBy.type"
          @select="emitFilter" hidden
        />
      </label>
      <label for="city-tag" class="tag">
        City
        <input
          type="radio"
          id="city-tag"
          value="city"
          v-model="filterBy.type"
          @select="emitFilter" hidden
        />
      </label>
      <label for="forest-tag" class="tag">
        Forest
        <input
          type="radio"
          id="forest-tag"
          value="forest"
          v-model="filterBy.type"
          @select="emitFilter" hidden
        />
      </label> -->
      <br />

      <div class="selector-filter flex space-between align-center">
        <div class="input flex column">
          <label for="txt-input">Free text</label>
          <input
            type="text"
            class="txt-input"
            id="txt-input"
            v-model="filterBy.name"
            @input="emitFilter"
            placeholder="Type to search"
          />
        </div>
        <div class="input flex column">
          <label for="type-input">Trip type</label>
          <el-select
            v-model="filterBy.type"
            placeholder="Select a type"
            id="type-input"
          >
            <el-option
              id="all-tag"
              value="All"
              @select="emitFilter"
              label="All"
            >
            </el-option>
            <el-option
              id="mountain-tag"
              value="mountain"
              @select="emitFilter"
              label="Mountain"
              >Mountain
            </el-option>

            <el-option
              id="city-tag"
              value="city"
              @select="emitFilter"
              label="City"
              >City
            </el-option>
            <el-option
              id="forest-tag"
              value="forest"
             
              @select="emitFilter"
              label="Forest"
              >Forest
            </el-option>
          </el-select>
        </div>
        <div class="input flex column">
          <label for="dest-input">Trip destination</label>
          <el-select
           v-model="filterBy.region"
            placeholder="Select a destination"
            id="dest-input"
          >
            <el-option value="All">All</el-option>
            <el-option value="USA">USA</el-option>
            <el-option value="Europe">Europe</el-option>
            <el-option value="Asia">Asia</el-option>
            <el-option value="Australia">Australia</el-option>
          </el-select>
        </div>

        <button @click="emitFilter" class="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
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
        // location: "",
        region: "",
      },
      selected: "",
    };
  },

  methods: {
    emitFilter(filter) {
      console.log("this.filterBy4444:", this.filterBy);
      const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));
      console.log("filterByCopy:", filterByCopy);

      this.$emit("filterBy", filterByCopy);
    },
    // location() {
    //   this.trips = [...new Set(this.trips)];
    //   console.log('this.trips,loc',this.trips);
    // },
  },
  created() {
    const filterObj = JSON.parse(JSON.stringify(this.$store.getters.filterBy))
    this.filterBy = filterObj
    
  },
};
</script>

<style></style>
