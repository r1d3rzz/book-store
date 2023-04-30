<template lang="">
  <nav class="navbar bg-body-tertiary bg-light mb-3">
    <div><a class="navbar-brand" href="#">Books Store</a></div>
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'bookCreate' }">Create</router-link>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style lang=""></style>
