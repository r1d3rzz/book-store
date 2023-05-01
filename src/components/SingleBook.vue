<template>
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
        <router-link
          :to="{ name: 'tagView', params: { tag } }"
          class="text-white text-decoration-none"
          >{{ tag }}</router-link
        >
      </span>
    </div>
    <p class="mb-2 badge bg-primary">Price - {{ book.price }} MMK</p>
    <p>
      {{ bookIntro }}...
      <router-link
        :to="{ name: 'bookDetail', params: { id: book.id } }"
        class="seeMore"
      >
        <span>See More</span>
      </router-link>
    </p>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  props: ["book"],
  setup(props) {
    let bookIntro = computed(() => {
      return props.book.detail.substring(0, 200);
    });
    return { bookIntro };
  },
};
</script>
<style>
.seeMore {
  user-select: none;
  text-decoration: none;
  color: gray;
}
</style>
