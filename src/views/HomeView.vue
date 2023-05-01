<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="error">
        <div class="alert alert-warning fs-3">{{ error }}</div>
      </div>
      <div v-if="books.length">
        <div class="container">
          <div class="row">
            <div class="col-md-8"><BookLists :books="books" /></div>
            <div class="col-md-4"><TagsCloud :books="books" /></div>
          </div>
        </div>
      </div>
      <div v-else>
        <LoadingLogos />
      </div>
    </div>
  </div>
</template>
<script>
import TagsCloud from "../components/TagsCloud";
import LoadingLogos from "../components/LoadingLogos";
import BookLists from "../components/BookLists";
import getBooks from "../composables/getBooks";
export default {
  components: {
    TagsCloud,
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
