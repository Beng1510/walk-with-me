<template>
  <section class="guide-preview" @click="goToGuide(user._id)">
    <!-- <img :src="user.profileImgUrl"> -->
    <img
      class="guide-preview-img"
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
    <div class="guide-preview-info-container">
      <h2>{{ user.name }}</h2>
      Guide Rating:
      <p>{{ rateGuide }} ({{rateAmount}}) </p>
      <br />
      <p><i class="fas fa-star trip-star-rate"></i></p>
      <br />

      <!-- <p>{{user.guideInfo.description}}</p><br/>

     Review: "<p>{{user.guideInfo.reviews[0].txt}}</p>" -->
    </div>
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