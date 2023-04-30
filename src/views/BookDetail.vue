<template>
  <div class="row" v-if="book">
    <div class="col-md-9 mx-auto mt-5 text-start">
      <div class="card">
        <div class="card-header">
          <h3>{{ book.title }}</h3>
        </div>
        <div class="card-body">
          <h4>Author - {{ book.author }}</h4>
          <div>
            Tags -
            <span
              v-for="tag in book.tags"
              :key="tag"
              class="badge bg-danger me-1 mb-1"
            >
              {{ tag }}
            </span>
          </div>
          <p class="mb-2 badge bg-primary">Price - {{ book.price }}</p>
          <p>{{ book.detail }}</p>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-end">
            <button @click="goBack" class="btn btn-dark">Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getBook from "@/composables/getBook";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  setup(props) {
    let router = useRouter();
    let { book, error, load } = getBook(props.id);
    load();
    let goBack = () => router.go(-1);
    return { book, error, goBack };
  },
};
</script>
<style></style>