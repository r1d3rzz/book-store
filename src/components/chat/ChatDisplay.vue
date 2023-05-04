<template>
  <div class="chatTextContainer" ref="messageDisplay">
    <div v-for="message in formattMessages" :key="message.id">
      <div class="mb-3">
        <span class="fw-bold me-2">{{ message.name }}</span>
        <small class="text-muted">{{ message.created_at }}</small>
        <br />
        <span class="chatText">
          <span>{{ message.message }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase/config";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
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
.chatText {
  background-color: rgba(211, 211, 211, 0.601);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  border-bottom-left-radius: 0;
}

.chatTextContainer {
  height: 330px;
  overflow: auto;
}
</style>
