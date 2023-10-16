<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const visible = computed(() => props.visible)

const emits = defineEmits(['click'])
function emitClick() {
  return emits('click')
}

function onKeydown(e: KeyboardEvent) {
  if (!visible.value) return
  if (!e.ctrlKey) return
  if (e.key.toLowerCase() === 'r') {
    emitClick()
    return
  }
}
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <button v-if="visible" class="btn-reset-weekly" @click="emitClick">
    주간 교역 정보 초기화
  </button>
</template>

<style lang="scss" scoped>
.btn-reset-weekly {
  margin-right: auto;
  border: 1px solid #d57;
  color: #d57;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    background-color: #d57;
    color: #fff;
  }
}
</style>
