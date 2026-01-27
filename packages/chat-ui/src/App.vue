<script setup lang="ts">
import { ref } from "vue";
import { useWiseAgent } from "./useWiseAgent";

const wiseAgent = useWiseAgent();

const inputStr = ref("");
function send() {
  wiseAgent.chat();
}
</script>

<template>
  <div>
    <div>
      <h1>内容区</h1>
    </div>

    <input v-modal="inputStr" /><button @click="send">submit</button>
  </div>
</template>

<style scoped></style>
