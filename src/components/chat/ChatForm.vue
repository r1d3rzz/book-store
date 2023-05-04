<template>
  <div class="backdrop">
    <div class="card chatDisplayContainer text-start">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <div>
          <div>
            <span class="fw-bold">{{ user.displayName }}</span>
          </div>
          <div class="text-muted">logged as {{ user.email }}</div>
        </div>
        <button class="btn btn-sm btn-primary" @click="closeChatRoom">
          Close
        </button>
      </div>
      <div class="card-body">
        <div class="alert alert-warning" v-if="error">{{ error }}</div>
        <ChatDisplay />
        <div>
          <div class="input-group">
            <input
              type="text"
              placeholder="Type here..."
              class="form-control group-item"
              v-model="message"
            />
            <button
              class="btn btn-sm btn-primary"
              @click="sendMessage"
              :disabled="isSend"
            >
              <i class="fas fa-paper-plane fa-lg" style="padding: 0 5px"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatDisplay from "./ChatDisplay";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { ref } from "vue";

export default {
  components: { ChatDisplay },
  emits: ["closeChatRoomModel"],
  props: ["user"],
  setup(props, { emit }) {
    let user = props.user;
    let message = ref("");
    let isSend = ref(false);
    let { error, addDocs } = useCollection("messages");

    let closeChatRoom = () => {
      emit("closeChatRoomModel");
    };

    let sendMessage = async () => {
      if (message.value) {
        isSend.value = true;
        let chat = {
          message: message.value,
          name: user.displayName,
          created_at: timestamp(),
        };
        message.value = "";
        await addDocs(chat).then(() => {
          isSend.value = false;
        });
      } else {
        error.value = "Enter a Message";
        setTimeout(() => {
          error.value = null;
        }, 2000);
      }
    };

    return { closeChatRoom, user, message, sendMessage, error, isSend };
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
</style>
