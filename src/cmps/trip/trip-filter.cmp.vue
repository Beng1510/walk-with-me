<template>
  <section class="trip-filter">
    <form @submit.prevent="updateFilterPage(filterBy)">
      <div class="selector-filter flex space-between align-center">
        <div class="input flex column">
          <label for="txt-input">Free Text</label>
          <input
            type="text"
            class="txt-input"
            id="txt-input"
            v-model="filterBy.name"
            @input="emitFilter"
            placeholder="Type to Search"
          />
        </div>
        <div class="input flex column">
          <label for="type-input">Trip Type</label>
          <el-select
            v-model="filterBy.type"
            placeholder="Select a Type"
            id="type-input"
          >
            <el-option
              id="all-tag"
              value=""
              @select="emitFilter"
             
            >
            </el-option>
            <el-option
              id="mountain-tag"
              value="mountain"
              @select="emitFilter"
              
              >Mountain
            </el-option>

            <el-option
              id="city-tag"
              value="city"
              @select="emitFilter"
              
              >City
            </el-option>
            <el-option
              id="forest-tag"
              value="forest"
              @select="emitFilter"
             
              >Forest
            </el-option>
          </el-select>
        </div>
        <div class="input flex column">
          <label for="dest-input">Trip Destination</label>
          <el-select
           v-model="filterBy.region"
            placeholder="Select a Destination"
            id="dest-input"
          >
            <el-option value="">All</el-option>
            <el-option value="USA">USA</el-option>
            <el-option value="Europe">Europe</el-option>
            <el-option value="Asia">Asia</el-option>
            <el-option value="Australia">Australia</el-option>
          </el-select>
        </div>

        <button class="search-btn">
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
      const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));

      this.$emit("filterBy", filterByCopy);
    },
    updateFilterPage(filterBy) {
      console.log('filterBy ???',filterBy);
        this.$store.commit({ type: "setFilterBy", filterBy: this.filterBy });
        this.$router.push("/trip");
    },
  },
  created() {
    const filterObj = JSON.parse(JSON.stringify(this.$store.getters.filterBy))
    this.filterBy = filterObj
    
  },
};
</script>

<style></style>
