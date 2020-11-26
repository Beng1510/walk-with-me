<template>
  <section class="guide-preview">
     
      <h1>{{user.name}}</h1>
     
     
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
}
</script>

<style>

</style>