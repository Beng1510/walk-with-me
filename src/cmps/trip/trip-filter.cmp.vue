<template>
  <section class="trip-filter">
    <form @submit.prevent="emitFilter">
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
            v-model="selected"
            placeholder="Select a type"
            id="type-input"
          >
            <el-option
              type="radio"
              id="all-tag"
              value=""
              v-model="filterBy.type"
              @select="emitFilter"
              label="all"
            >
            </el-option>
            <el-option
              type="radio"
              id="mountain-tag"
              value="mountain"
              v-model="filterBy.type"
              @select="emitFilter"
              label="mountain"
              >Mountain
            </el-option>
            <el-option
              type="radio"
              id="seaside-tag"
              value="seaside"
              v-model="filterBy.type"
              @select="emitFilter"
              label="seaside"
              >Seaside
            </el-option>
            <el-option
              type="radio"
              id="city-tag"
              value="city"
              v-model="filterBy.type"
              @select="emitFilter"
              label="city"
              >City
            </el-option>
            <el-option
              type="radio"
              id="forest-tag"
              value="forest"
              v-model="filterBy.type"
              @select="emitFilter"
              label="forest"
              >Forest
            </el-option>
          </el-select>
        </div>
        <div class="input flex column">
          <label for="dest-input">Trip destination</label>
          <el-select
            v-model="selected"
            placeholder="Selaect a destination"
            id="dest-input"
          >
            <el-option value="Usa">United States</el-option>
            <el-option value="Europe">Europe</el-option>
            <el-option value="Asia">Asia</el-option>
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
        type: "All",
        location: "",
        region: "",
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

<style></style>
