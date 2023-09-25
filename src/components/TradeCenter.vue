<script setup lang="ts">
import { TradeCenter } from '@/data/trade.center'
import { Place } from '@/vite-env'
import { computed } from 'vue'

import TradeInfoVue from './TradeInfo.vue'

const props = defineProps<{
  tradeCenter: TradeCenter
  showPlace: boolean
}>()

const tradeCenter = computed(() => props.tradeCenter)
const tradeInfos = computed(() => [...tradeCenter.value.tradeInfos.values()])
const showPlace = computed(() => props.showPlace)

const PLACE_LABELS: Map<Place, string> = new Map()
PLACE_LABELS.set('oasis', '오아시스')
PLACE_LABELS.set('karuForest', '카루 숲')
PLACE_LABELS.set('kalidaLake', '칼리다 호수')
PLACE_LABELS.set('peraVolcano', '페라 화산')
</script>

<template>
  <div class="trade-center">
    <h1 v-if="showPlace">
      {{ PLACE_LABELS.get(tradeCenter.place) }}
    </h1>
    <trade-info-vue
      v-for="(tradeInfo, idx) in tradeInfos"
      :key="`${tradeCenter.place}-${idx}`"
      :place="tradeCenter.place"
      :tradeInfo="tradeInfo"
    />
  </div>
</template>

<style scoped lang="scss">
.trade-center {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 8px 4px;

  > h1 {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.75px;
  }
}
</style>
