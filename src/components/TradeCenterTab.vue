<script setup lang="ts">
import { TabName } from '@/application/trade.tab'
import { computed, ref, watch } from 'vue'

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
  '시뮬레이션',
]
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
    background-color: #ccc;
    border-radius: 4px;
    font-weight: 500;

    &[active='true'] {
      background-color: #57f;
      color: #fff;
    }
  }
}
</style>
