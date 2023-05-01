<template>
  <div class="container" v-if="books.length">
    <div class="row">
      <div class="col-md-8">
        <BookLists :books="filterBooks" />
      </div>
      <div class="col-md-4">
        <TagsCloud :books="books" />
      </div>
    </div>
  </div>
</template>
<script>
import TagsCloud from "../components/TagsCloud";
import BookLists from "../components/BookLists";
import getBooks from "@/composables/getBooks";
import { computed } from "vue";
export default {
  props: ["tag"],
  components: {
    TagsCloud,
    BookLists,
  },

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
