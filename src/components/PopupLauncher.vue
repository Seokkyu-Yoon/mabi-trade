<script setup lang="ts">
import { reactive } from 'vue'

const msgs = reactive<string[][]>([])

defineExpose<{
  push(msg: string[]): void
}>({
  push(msg: string[]) {
    msgs.push(msg)
  },
})
</script>

<template>
  <div class="popup">Sample</div>
</template>

<style lang="scss" scoped>
.popup-launcher {
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  padding: 4px 8px;
}
</style>
