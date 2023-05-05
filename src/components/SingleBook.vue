<template>
  <div class="card-header d-flex justify-content-between align-items-center">
    <div>
      <div class="fw-bold">{{ book.owner.name }}</div>
      <div class="text-muted">{{ book.created_at }}</div>
    </div>
    <div v-if="user">
      <div v-if="user.email === book.owner.email">
        <router-link :to="{ name: 'bookDetail', params: { id: book.id } }">
          <button class="btn btn-sm btn-primary">Detail</button>
        </router-link>
      </div>
    </div>
  </div>
  <div class="card-body">
    <h4 class="text-center">{{ book.title }}</h4>
    <h6>Author - {{ book.author }}</h6>
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
import getUser from "@/composables/getUser";
import { computed } from "vue";

export default {
  props: ["book"],
  setup(props) {
    let { user } = getUser();
    let bookIntro = computed(() => {
      return props.book.detail.substring(0, 200);
    });
    return { bookIntro, user };
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
