<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="error">
        <div class="alert alert-warning fs-3">{{ error }}</div>
      </div>
      <div v-if="books.length">
        <BookLists :books="books" />
      </div>
      <div v-else>
        <LoadingLogos />
      </div>
    </div>
  </div>
</template>
<script>
import LoadingLogos from "../components/LoadingLogos";
import BookLists from "../components/BookLists";
import getBooks from "../composables/getBooks";
export default {
  components: {
    LoadingLogos,
    BookLists,
  },
  setup() {
    let { books, error, load } = getBooks();
    load();
    return { books, error };
  },
};
</script>
<style lang=""></style>
