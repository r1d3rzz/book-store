<template lang="">
  <nav class="navbar navbar-expand-lg navbar-bg-light bg-light mb-2">
    <div class="container-fluid">
      <a class="navbar-brand brandText" href="/">Book Store</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
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

          <span v-if="books.length">
            <DropdownTag :books="books" />
          </span>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import DropdownTag from "@/components/DropdownTag.vue";
import getBooks from "@/composables/getBooks";
export default {
  components: { DropdownTag },
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
