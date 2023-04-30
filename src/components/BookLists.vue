<template>
  <div v-for="book in books" :key="book.id">
    <div class="card mb-3 col-md-9 mx-auto text-start">
      <SingleBook :book="book" />
    </div>
  </div>
</template>
<script>
import SingleBook from "./SingleBook";
export default {
  components: { SingleBook },
  props: ["books"],
};
</script>
<style></style>
