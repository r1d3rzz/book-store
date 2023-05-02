<template>
  <nav class="navbar navbar-expand-sm navbar-bg-light bg-light mb-2">
    <div class="container-fluid">
      <div>
        <router-link
          :to="{ name: 'home' }"
          class="nav-link text-primary"
          aria-current="page"
          >Book Store</router-link
        >
      </div>

      <div class="d-flex">
        <div class="nav-item">
          <router-link
            :to="{ name: 'home' }"
            class="nav-link"
            aria-current="page"
            >Home</router-link
          >
        </div>
        <div class="nav-item">
          <router-link
            :to="{ name: 'bookCreate' }"
            class="nav-link"
            aria-current="page"
            >Create</router-link
          >
        </div>
        <div class="nav-item">
          <button class="nav-link btn btn-link fw-bold" @click="signUpNavBtn">
            Sign Up
          </button>
        </div>
        <div class="nav-item">
          <button class="nav-link btn btn-link fw-bold" @click="loginNavBtn">
            Login
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="backdrop" v-if="isShow" @click.self="isShow = false">
    <div class="mt-5 model">
      <div v-if="!isLogin"><SignIn @openLoginBox="isLogin = true" /></div>
      <div v-if="isLogin"><LogIn @openSignInBox="isLogin = false" /></div>
    </div>
  </div>
</template>
<script>
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import { ref } from "vue";
export default {
  components: {
    LogIn,
    SignIn,
  },
  setup() {
    let isShow = ref(false);
    let isLogin = ref(false);

    let signUpNavBtn = () => {
      isShow.value = true;
      isLogin.value = false;
    };

    let loginNavBtn = () => {
      isShow.value = true;
      isLogin.value = true;
    };

    return { isLogin, isShow, signUpNavBtn, loginNavBtn };
  },
};
</script>
<style scoped>
nav a {
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #000000;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.662);
}

.model {
  width: 600px;
  margin: 0 auto;
  background-color: red;
}
</style>
