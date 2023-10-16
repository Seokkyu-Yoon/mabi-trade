<script setup lang="ts">
import { TabName } from '@/application/trade.tab'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  name: TabName
}>()

const propName = computed(() => props.name)
const name = ref(props.name)
const emits = defineEmits<{
  (event: 'update:name', payload: TabName): void
}>()

function emitTab(value: TabName) {
  if (value === name.value) return
  return emits('update:name', value)
}

watch(propName, (newName) => {
  name.value = newName
})

const tabs: TabName[] = [
  '전체',
  '오아시스',
  '카루 숲',
  '칼리다 호수',
  '페라 화산',
  '교역 시뮬레이션',
  '수익 시뮬레이션',
]

const tabIdx = computed(() => tabs.indexOf(name.value))
function onKeydown(e: KeyboardEvent) {
  if (!e.ctrlKey) return
  const key = e.key.toLowerCase()
  if (key === 'arrowleft') {
    const newTabIdx = Math.max(tabIdx.value - 1, 0)
    const newTabName = tabs[newTabIdx]
    if (name.value === newTabName) return
    emitTab(newTabName)
    return
  }
  if (key === 'arrowright') {
    const newTabIdx = Math.min(tabIdx.value + 1, tabs.length - 1)
    const newTabName = tabs[newTabIdx]
    if (name.value === newTabName) return
    emitTab(newTabName)
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
  <div class="trade-center-tab">
    <button
      v-for="tabName in tabs"
      :key="`tab-${tabName}`"
      :active="name === tabName"
      @click="() => emitTab(tabName)"
    >
      {{ tabName }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.trade-center-tab {
  display: flex;
  gap: 10px;

  > button {
    padding: 4px 8px;
    border: 1px solid #57f;
    color: #57f;
    border-radius: 4px;
    font-weight: 500;

    &:hover,
    &[active='true'] {
      background-color: #57f;
      color: #fff;
    }
  }
}
</style>
