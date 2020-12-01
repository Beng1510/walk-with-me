<template>
  <section class="guide-list card-grid">
    <guide-preview v-for="(user) in sortedUsers" :key="user._id" :user="user">
    </guide-preview>
  </section>
</template>

<script>
import guidePreview from "./guide-preview.cmp.vue";

export default {
  name: "guide-list",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  components: {
    guidePreview,
  },

  methods: {},
  computed: {
    // sorted_users() {
    //   return this.users.sort((a, b) => {return b.guideInfo.rate - a.guideInfo.rate});
    // },
    sortedUsers() {
      return _.orderBy(this.users, 'guideInfo.rate', 'desc' )
    }
  },
};
</script>

<style>
</style>