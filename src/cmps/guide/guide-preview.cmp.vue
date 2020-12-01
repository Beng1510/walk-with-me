<template>
  <section class="guide-preview preview-card flex column align-center" @click="goToGuide(user._id)">
    <img
      class="profile-img-m"
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
      <h2>{{ user.name }}</h2>

      
      <p><i class="fas fa-star trip-star-rate"></i>{{ rateGuide }} ({{rateAmount}})</p>
      
   
  </section>
</template>

<script>
export default {
  name: "guide-preview",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      totalRates: 0,
    };
  },
  computed: {
    rateGuide() {
      const sum = this.user.guideInfo.reviews.reduce(
        (acc, item) => acc + item.rate,
        0
      );
      const avg = sum / this.user.guideInfo.reviews.length;
      // this.user.rate = this.avg
      return avg.toFixed(1);
    },
    rateAmount() {
      return this.user.guideInfo.reviews.length
    }
  },

  methods: {
    goToGuide(id) {
      this.$router.push(`/guide/${id}`);
    },
  },
};
</script>

<style>
</style>