<template>
  <div class="backdrop">
    <div class="card chatDisplayContainer text-start">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <div>
          <div>
            Hello <span class="fw-bold">{{ user.displayName }}</span>
          </div>
          <div class="text-muted">logged as {{ user.email }}</div>
        </div>
        <button class="btn btn-sm btn-primary" @click="closeChatRoom">
          Close
        </button>
      </div>
      <div class="card-body">
        <div class="chatTextContainer">
          <div v-for="text in 20" :key="text">
            <div class="mb-3">
              <span class="chatText">this is testing</span>
            </div>
          </div>
        </div>
        <div>
          <div class="input-group">
            <input
              type="text"
              placeholder="Type here..."
              class="form-control group-item"
            />
            <button class="btn btn-sm btn-primary">
              <i class="fas fa-paper-plane fa-lg" style="padding: 0 5px"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["closeChatRoomModel"],
  props: ["user"],
  setup(props, { emit }) {
    let user = props.user;

    let closeChatRoom = () => {
      emit("closeChatRoomModel");
    };

    return { closeChatRoom, user };
  },
};
</script>
<style scoped>
.chatDisplayContainer {
  background-color: white;
  width: 400px;
  height: auto;
  position: fixed;
  right: 100px;
  bottom: 85px;
  border-radius: 5px;
}
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.568);
}
.chatText {
  background-color: lightgrey;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  border-bottom-left-radius: 0;
}

.chatTextContainer {
  height: 400px;
  overflow: auto;
}
</style>
