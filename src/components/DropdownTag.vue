<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Tags
    </a>
    <ul class="dropdown-menu">
      <li v-for="tag in uniqueTags">
        <router-link
          :to="{ name: 'tagsView', params: { tag } }"
          class="dropdown-item"
          >{{ tag }}</router-link
        >
      </li>
    </ul>
  </li>
</template>
<script>
import { computed, ref } from "vue";

export default {
  props: ["books"],
  setup(props) {
    let tags = ref([]);

    props.books.forEach((book) => {
      book.tags.forEach((tag) => {
        tags.value.push(tag);
      });
    });

    let uniqueTags = computed(() => {
      return tags.value.filter((tag, index, array) => {
        return array.indexOf(tag) == index;
      });
    });

    return { tags, uniqueTags };
  },
};
</script>
<style></style>
