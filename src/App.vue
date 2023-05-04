<template>
  <div class="container-fluid sticky-top">
    <div class="row">
      <NavBar />
    </div>
    <div v-if="user">
      <div class="liveChat" v-if="isChat">
        <ChatForm @closeChatRoomModel="isChat = false" :user="user" />
      </div>
      <div class="chatBtnContainer" @click="isChat = !isChat">
        <div>
          <i class="far fa-comment-alt fs-4"></i>
        </div>
        <div>Live Chat</div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import { ref } from "vue";
import ChatForm from "./components/chat/ChatForm";
import NavBar from "./components/NavBar.vue";
import getUser from "./composables/getUser";
export default {
  components: {
    ChatForm,
    NavBar,
  },
  setup() {
    let { user } = getUser();
    let isChat = ref(false);

    return { isChat, user };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.chatBtnContainer {
  background-color: white;
  width: 100px;
  height: auto;
  position: fixed;
  right: 10px;
  bottom: 20px;
  padding: 5px;
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
}
</style>
