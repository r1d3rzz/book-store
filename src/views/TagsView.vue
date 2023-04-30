<template>
  <div v-if="books.length">
    <BookLists :books="filterBooks" />
  </div>
</template>
<script>
import { computed } from "vue";
import BookLists from "../components/BookLists";
import getBooks from "@/composables/getBooks";

export default {
  components: { BookLists },
  props: ["tag"],
  setup(props) {
    let { books, error, load } = getBooks();
    load();
    let filterBooks = computed(() => {
      return books.value.filter((book) => {
        return book.tags.includes(props.tag);
      });
    });
    return { books, error, filterBooks };
  },
};
</script>
<style></style>
