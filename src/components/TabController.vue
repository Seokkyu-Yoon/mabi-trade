<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  TAB_ALL,
  TAB_OASIS,
  TAB_KARU_FOREST,
  TAB_KALIDA_LAKE,
  TAB_PERA_VOLCANO,
} from '@/application/tab.name'
const props = defineProps<{
  name: symbol
}>()

const propName = computed(() => props?.name)
const name = ref(props?.name)
const emits = defineEmits<{ (event: 'update:name', payload: symbol): void }>()
const emitTab = function (value: symbol) {
  if (value === name.value) return
  return emits('update:name', value)
}

const isAll = computed(() => name.value === TAB_ALL)
const isOasis = computed(() => name.value === TAB_OASIS)
const isKaruForest = computed(() => name.value === TAB_KARU_FOREST)
const isKalidaLake = computed(() => name.value === TAB_KALIDA_LAKE)
const isPeraVolcano = computed(() => name.value === TAB_PERA_VOLCANO)

watch(propName, (newName) => {
  name.value = newName
})
</script>

<template>
  <div class="tab-controller">
    <button :active="isAll" @click="() => emitTab(TAB_ALL)">전체</button>
    <button :active="isOasis" @click="() => emitTab(TAB_OASIS)">
      오아시스
    </button>
    <button :active="isKaruForest" @click="() => emitTab(TAB_KARU_FOREST)">
      카루 숲
    </button>
    <button :active="isKalidaLake" @click="() => emitTab(TAB_KALIDA_LAKE)">
      칼리다 호수
    </button>
    <button :active="isPeraVolcano" @click="() => emitTab(TAB_PERA_VOLCANO)">
      페라 화산
    </button>
  </div>
</template>

<style scoped lang="scss">
.tab-controller {
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
