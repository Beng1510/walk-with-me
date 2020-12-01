<template>
  <section class="guide-preview preview-card flex column align-center" @click="goToGuide(user._id)">
    <img
      class="profile-img-m"
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
      <h2>{{ user.name }}</h2>
    <p><i class="fas fa-star trip-star-rate"></i>{{ user.guideInfo.rate }}</p>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  name: "guide-preview",

  methods: {
    goToGuide(id) {
      this.$router.push(`/guide/${id}`);
    },
  },
};
</script>

<style>
</style>