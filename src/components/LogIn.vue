<template>
  <div class="card">
    <div class="card-header fs-3">Login</div>
    <div class="card-body text-start">
      <form @submit.prevent="login">
        <div class="alert alert-warning" v-if="error">
          {{ error }}
        </div>

        <div class="form-group mb-3">
          <label for="email">Eamil</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>

        <div
          class="form-group d-flex justify-content-between align-items-center"
        >
          <div class="fs-6 text-muted">
            If you have not account
            <span class="text-primary" role="button" @click="register"
              >Register</span
            >
            Here.
          </div>
          <button class="btn btn-primary" v-if="!isLoading">Login</button>

          <button
            class="btn btn-primary d-flex justify-content-end align-items-center"
            disabled
            v-if="isLoading"
          >
            <div class="spinner-border me-2 spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div>loading...</div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";

export default {
  emits: ["openSignInBox", "closeModel"],
  setup(props, { emit }) {
    let register = () => {
      emit("openSignInBox");
    };

    let email = ref("");
    let password = ref("");
    let router = useRouter();
    let isLoading = ref(false);

    let { error, loginUser } = useLogin();

    let login = async () => {
      isLoading.value = true;
      let res = await loginUser(email.value, password.value);
      if (res) {
        isLoading.value = false;
        emit("closeModel");
        router.push({ name: "userProfile" });
      } else {
        isLoading.value = false;
      }
    };

    return { register, email, password, error, login, isLoading };
  },
};
</script>
<style></style>
