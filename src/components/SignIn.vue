<template>
  <div class="card">
    <div class="card-header fs-3">Sign Up</div>
    <div class="card-body text-start">
      <form @submit.prevent="signUp">
        <div class="alert alert-warning mb-3" v-if="p_error">
          {{ p_error }}
        </div>

        <div class="alert alert-warning mb-3" v-if="error">
          {{ error }}
        </div>

        <div class="form-group mb-3">
          <label for="name">Display Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="name"
            required
          />
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

        <div class="form-group mb-3">
          <label for="c_password">Confrim Password</label>
          <input
            type="password"
            id="c_password"
            class="form-control"
            v-model="c_password"
            required
          />
        </div>

        <div
          class="form-group d-flex justify-content-between align-items-center"
        >
          <div class="fs-6 text-muted">
            If you have already account
            <span class="text-primary" role="button" @click="login">Login</span>
            Here.
          </div>
          <button class="btn btn-primary" v-if="!isLoading">Sign Up</button>

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
import { auth } from "../../firebase/config";
import { useRouter } from "vue-router";

export default {
  emits: ["openLoginBox", "closeModel"],
  setup(props, { emit }) {
    let login = () => {
      emit("openLoginBox");
    };

    let name = ref("");
    let email = ref("");
    let password = ref("");
    let c_password = ref("");
    let p_error = ref(null);
    let error = ref(null);
    let router = useRouter();
    let isLoading = ref(false);

    let signUp = async () => {
      isLoading.value = true;
      try {
        let res = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        res.user.updateProfile({ displayName: name.value });
        emit("closeModel");
        isLoading.value = false;
        router.push({ name: "home" });
      } catch (err) {
        isLoading.value = false;
        error.value = err.message;
      }
    };

    return {
      login,
      signUp,
      p_error,
      error,
      name,
      email,
      password,
      c_password,
      isLoading,
    };
  },
};
</script>
<style></style>
