<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-light mb-3">
    <div class="container-fluid">
      <router-link
        :to="{ name: 'home' }"
        class="nav-link text-primary"
        aria-current="page"
        >Book Store</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="user">
            <router-link
              :to="{ name: 'bookCreate' }"
              class="nav-link"
              aria-current="page"
              >Create</router-link
            >
          </li>
          <li class="nav-item" v-if="!user">
            <button
              class="nav-link btn btn-link fw-bold text-dark"
              @click="signUpNavBtn"
            >
              Sign Up
            </button>
          </li>
          <li class="nav-item" v-if="!user">
            <button
              class="nav-link btn btn-link fw-bold text-dark"
              @click="loginNavBtn"
            >
              Login
            </button>
          </li>
          <li class="nav-item dropdown" v-if="user">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user.displayName }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" :to="{ name: 'userProfile' }"
                  >Profile</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="backdrop" v-if="isShow" @click.self="isShow = false">
    <div class="mt-5 model">
      <div v-if="!isLogin">
        <SignIn @openLoginBox="isLogin = true" @loginAgain="isLogin = true" />
      </div>
      <div v-if="isLogin">
        <LogIn @openSignInBox="isLogin = false" @closeModel="isShow = false" />
      </div>
    </div>
  </div>
</template>
<script>
import getUser from "../composables/getUser";
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
    let { user } = getUser();

    let signUpNavBtn = () => {
      isShow.value = true;
      isLogin.value = false;
    };

    let loginNavBtn = () => {
      isShow.value = true;
      isLogin.value = true;
    };

    return { isLogin, isShow, signUpNavBtn, loginNavBtn, user };
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
