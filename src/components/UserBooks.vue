<template>
  <div v-if="filterBooks.length">
    <div v-if="error">
      <div class="alert alert-warning" v-if="error">{{ error }}</div>
    </div>
    <div v-if="filterBooks.length">
      <div class="card text-start">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center p-2">
            <div class="fs-3">The books you posted</div>
            <div class="badge bg-dark p-2">
              Total Books ({{ filterBooks.length }})
            </div>
          </div>

          <div class="card bg-dark">
            <div class="card-body">
              <BookLists :books="filterBooks" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingLogos />
    </div>
  </div>
</template>
<script>
import LoadingLogos from "./LoadingLogos";
import BookLists from "./BookLists";
import getBooks from "@/composables/getBooks";
import { computed } from "vue";

export default {
  components: {
    LoadingLogos,
    BookLists,
  },
  props: ["user"],
  setup(props) {
    let { books, error, load } = getBooks();
    load();

    let filterBooks = computed(() => {
      return books.value.filter((book) => {
        return book.owner.email === props.user.email;
      });
    });

    return { error, books, filterBooks };
  },
};
</script>
<style></style>
