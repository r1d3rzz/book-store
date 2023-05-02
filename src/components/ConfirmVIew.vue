<template>
  <div class="backdrop" @click.self="closeModel">
    <div class="model">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  emits: ["close"],
  setup(props, { emit }) {
    let closeModel = () => {
      emit("close");
    };

    return { closeModel };
  },
};
</script>
<style>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.582);
  z-index: 999;
}
.model {
  width: 400px;
  padding: 20px 10px;
  border-radius: 5px;
  color: black;
  margin: 0 auto;
  margin-top: 100px;
  background-color: white;
}
</style>
