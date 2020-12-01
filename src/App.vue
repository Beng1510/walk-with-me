<template>
  <main class="main-layout" id="app">
    <main-header />
    <router-view />
    <main-footer />
  </main>
</template>

<script>
import mainHeader from "./cmps/basic/main-header.cmp.vue";
import mainFooter from "./cmps/basic/main-footer.cmp.vue";

export default {
   components: {
        mainHeader,
        mainFooter
    }
}
</script>

