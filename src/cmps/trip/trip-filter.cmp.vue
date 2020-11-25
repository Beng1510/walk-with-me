<template>
  <section class="trip-filter">
      <form @submit.prevent="emitFilter">
          <input type="text" v-model="filterBy.name" @input="emitFilter">
          <label for="mountain-tag">
            <input type="radio" id="mountain-tag" value="mountain" v-model="filterBy.type" @select="emitFilter">
          </label>
          <label for="seaside-tag">
                <input type="radio" id="seaside-tag" value="seaside" v-model="filterBy.type" @select="emitFilter">
            </label>
            <label for="city-tag">
                <input type="radio" id="city-tag" value="city" v-model="filterBy.type" @select="emitFilter">
          </label>
          <label for="forest-tag">
                <input type="radio" id="forest-tag" value="forest" v-model="filterBy.type" @select="emitFilter">
          </label>
      </form>
  </section>
</template>

<script>
export default {
    name: 'trip-filter',

    data() {
        return {
            filterBy: {
                name: '',
                type: ''
                }
        };
    },

    methods: {
        emitFilter() {
            const filterByCopy = JSON.parse(JSON.stringify(this.filterBy));
            this.$emit('filterBy', filterByCopy);
        }
    }
}
</script>

<style>

</style>