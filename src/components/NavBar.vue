<template lang="">
  <nav class="navbar navbar-expand-lg navbar-bg-light bg-light mb-2">
    <div class="container-fluid">
      <router-link
        :to="{ name: 'home' }"
        class="nav-link text-primary"
        aria-current="page"
        >Book Store</router-link
      >
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'bookCreate' }"
              class="nav-link"
              aria-current="page"
              >Create</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import getBooks from "@/composables/getBooks";
import { onUpdated } from "vue";
export default {
  setup() {
    let { books, load } = getBooks();
    load();
    return { books };
  },
};
</script>
<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #000000;
}
</style>
