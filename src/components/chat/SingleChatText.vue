<template>
  <div
    class="mb-3"
    :class="{
      'text-end': user.displayName === message.name,
    }"
  >
    <span class="fw-bold me-2">{{ message.name }}</span>
    <small class="text-muted">{{ message.created_at }}</small>
    <br />
    <span
      class="chatText"
      :class="{ 'text-border': user.displayName === message.name }"
    >
      <span>{{ message.message }}</span>
    </span>
  </div>
</template>
<script>
import getUser from "@/composables/getUser";

export default {
  props: ["message"],
  setup() {
    let { user } = getUser();

    return { user };
  },
};
</script>
<style>
.chatText {
  background-color: rgba(211, 211, 211, 0.792);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  border-bottom-left-radius: 0;
}
.text-border {
  background-color: rgba(173, 216, 230, 0.673);
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
}
</style>
