<template>
  <section v-if="guide" class="guide-preview preview-card flex column align-center" @click="goToGuide(guide._id)">
    <img
      class="profile-img-m"
      :src="require('@/assets/img/users/' + guide.profileImgUrl)"
    />
      <h2>{{ guide.name }}</h2>
      <p><i class="fas fa-star trip-star-rate"></i> {{ rateGuide }} ({{rateAmount}}) </p>
  </section>
</template>

<script>
export default {
  name: "guide-preview",
  props: {
    guide: {
      type: Object,
      // required: true,
    },
  },
  data() {
    return {
      totalRates: 0,
    };
  },
  computed: {
    rateGuide() {
      const sum = this.guide.guideInfo.reviews.reduce(
        (acc, item) => acc + item.rate,
        0
      );
      const avg = sum / this.guide.guideInfo.reviews.length;
      // this.user.rate = this.avg
      return avg.toFixed(1);
    },
    rateAmount() {
      return this.guide.guideInfo.reviews.length
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