<template>
  <section class="guide-preview" @click="goToGuide(user._id)">
      <img :src="user.profileImgUrl">
      <h1>{{user.name}}</h1>
      <h3>{{user.guideInfo.rate}}</h3>
  </section>
</template>

<script>
export default {
  
    props: {
        user: {
            type: Object,
            required: true
        },
    },

    name: 'guide-preview',

    methods: {
        goToGuide(id) {
            this.$router.push(`/guide/${id}`);
        }
    }
}
</script>

<style>

</style>