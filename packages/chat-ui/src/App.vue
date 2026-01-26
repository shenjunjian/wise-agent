<script setup lang="ts">
import { ref } from "vue";
import { useWiseAgent } from "./useWiseAgent";

const wiseAgent = useWiseAgent();

const inputStr = ref("");
function send() {
  wiseAgent.chat(inputStr.value);
}
</script>

<template>
  <div>
    <div>
      <h1>内容区</h1>
    </div>

    <input v-modal="inputStr" />
  </div>
</template>

<style scoped></style>
