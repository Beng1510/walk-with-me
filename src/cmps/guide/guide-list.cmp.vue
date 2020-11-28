<template>
  <section class="guide-list">
    <guide-preview v-for="user in users" :key="user._id" :user="user">
    </guide-preview>
  </section>
</template>

<script>
import guidePreview from "./guide-preview.cmp.vue";

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  name: "guide-list",

  components: {
    guidePreview,
  },

  methods: {},
};
</script>

<style>
</style>