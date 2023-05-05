<template>
  <div v-for="book in formattBooks" :key="book.id">
    <div class="card mb-3 mx-auto text-start">
      <SingleBook :book="book" />
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import SingleBook from "./SingleBook";
import { formatDistanceToNow } from "date-fns";
export default {
  components: { SingleBook },
  props: ["books"],
  setup(props) {
    let formattBooks = computed(() => {
      return props.books.map((book) => {
        let formattTime = formatDistanceToNow(book.created_at.toDate());
        return { ...book, created_at: formattTime };
      });
    });

    return { formattBooks };
  },
};
</script>
<style></style>
