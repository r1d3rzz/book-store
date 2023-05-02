<template>
  <div class="card">
    <div class="card-header fs-3">Sign Up</div>
    <div class="card-body text-start">
      <div class="form-group mb-3">
        <label for="name">Display Name</label>
        <input type="text" id="name" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label for="email">Eamil</label>
        <input type="email" id="email" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" />
      </div>

      <div class="form-group mb-3">
        <label for="c_password">Confrim Password</label>
        <input type="password" id="c_password" class="form-control" />
      </div>

      <div class="form-group d-flex justify-content-between align-items-center">
        <div class="fs-6 text-muted">
          If you have already account
          <span class="text-primary" role="button" @click="login">Login</span>
          Here.
        </div>
        <button class="btn btn-primary">Sign Up</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["openLoginBox"],
  setup(props, { emit }) {
    let login = () => {
      emit("openLoginBox");
    };

    return { login };
  },
};
</script>
<style></style>
