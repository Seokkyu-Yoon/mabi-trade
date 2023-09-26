<script setup lang="ts">
import { TradeCenter } from '@/data/trade.center'
import { TradeItem } from '@/data/trade.item'
import { computed } from 'vue'

import TradeItemVue from './TradeItem.vue'
import { TradeSimulator } from '@/application/trade.simulator'

const props = defineProps<{
  visible: boolean
  tradeCenter: TradeCenter
  showName: boolean
  tradeSimulator?: TradeSimulator
}>()

const visible = computed(() => props.visible)
const tradeCenter = computed(() => props.tradeCenter)
const tradeItems = computed(() => tradeCenter.value.getTradeItems())
const showName = computed(() => props.showName)
const tradeSimulator = computed(() => props?.tradeSimulator || null)
</script>

<template>
  <div class="trade-center" :visible="visible">
    <h1 v-if="showName">
      {{ tradeCenter.name }}
    </h1>
    <trade-item-vue
      v-for="(tradeItem, idx) in tradeItems"
      :key="`${tradeCenter.name}-${idx}`"
      :tradeItem="tradeItem"
      :tradeSimulator="tradeSimulator"
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
