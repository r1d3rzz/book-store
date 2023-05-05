<template>
  <div class="chatTextContainer" ref="messageDisplay">
    <div v-for="message in formattMessages" :key="message.id">
      <SingleChatText :message="message" />
    </div>
  </div>
</template>
<script>
import SingleChatText from "./SingleChatText";
import { db } from "@/firebase/config";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
  components: { SingleChatText },
  setup() {
    let messages = ref([]);
    let messageDisplay = ref(null);

    onUpdated(() => {
      messageDisplay.value.scrollTop = messageDisplay.value.scrollHeight;
    });

    let formattMessages = computed(() => {
      return messages.value.map((msg) => {
        let formatTime = formatDistanceToNow(msg.created_at.toDate());
        return { ...msg, created_at: formatTime };
      });
    });

    db.collection("messages")
      .orderBy("created_at")
      .onSnapshot((snap) => {
        let results = [];
        snap.docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && results.push(document);
        });
        messages.value = results;
      });

    return { messages, formattMessages, messageDisplay };
  },
};
</script>
<style scoped>
.chatTextContainer {
  height: 330px;
  overflow: auto;
}
</style>
