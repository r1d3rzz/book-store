<template>
  <div class="row">
    <div v-if="books.length">
      <BookLists :books="books" />
    </div>
  </div>
</template>
<script>
import BookLists from "../components/BookLists";
import getBooks from "../composables/getBooks";
export default {
  components: { BookLists },
  setup() {
    let { books, error, load } = getBooks();
    load();
    return { books, error };
  },
};
</script>
<style lang=""></style>
