<template>
  <div class="card">
    <div class="card-header fs-3">Login</div>
    <div class="card-body text-start">
      <div class="form-group mb-3">
        <label for="email">Eamil</label>
        <input type="email" id="email" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" />
      </div>

      <div class="form-group d-flex justify-content-between align-items-center">
        <div class="fs-6 text-muted">
          If you have not account
          <span class="text-primary" role="button" @click="register"
            >Register</span
          >
          Here.
        </div>
        <button class="btn btn-primary">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["openSignInBox"],
  setup(props, { emit }) {
    let register = () => {
      emit("openSignInBox");
    };

    return { register };
  },
};
</script>
<style></style>
