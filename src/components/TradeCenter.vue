<script setup lang="ts">
import { TradeCenter } from '@/data/trade.center'
import { computed } from 'vue'

import TradeItem from './TradeItem.vue'

const props = defineProps<{
  tradeCenter: TradeCenter
  showName: boolean
}>()

const tradeCenter = computed(() => props.tradeCenter)
const tradeItems = computed(() => tradeCenter.value.getTradeItems())
const showName = computed(() => props.showName)
</script>

<template>
  <div class="trade-center">
    <h1 v-if="showName">
      {{ tradeCenter.name }}
    </h1>
    <trade-item
      v-for="(tradeItem, idx) in tradeItems"
      :key="`${tradeCenter.name}-${idx}`"
      :tradeItem="tradeItem"
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
