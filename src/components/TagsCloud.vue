<template>
  <div class="card text-start tagCloudContainer">
    <div class="card-header fs-3 text-center">Tags</div>
    <div class="card-body d-flex flex-wrap">
      <div class="fs-6 me-1 mb-1" v-for="tag in uniqueTags" :key="tag">
        <router-link
          :to="{ name: 'tagView', params: { tag } }"
          class="tagLink text-decoration-none text-white"
          >{{ tag }}</router-link
        >
      </div>
    </div>
  </div>
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
    return { uniqueTags };
  },
};
</script>
<style scoped>
.tagLink {
  background-color: blue;
  padding: 3px 5px;
  border-radius: 5px;
}

.router-link-exact-active {
  background-color: red;
}

.tagCloudContainer {
  position: fixed;
}
</style>
