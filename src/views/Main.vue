<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  TAB_ALL,
  TAB_OASIS,
  TAB_KARU_FOREST,
  TAB_KALIDA_LAKE,
  TAB_PERA_VOLCANO,
} from '@/application/tab.name'

import { TradeCenter, TradeCenterCollection } from '@/data/trade.center'

import TabControllerVue from '@/components/TabController.vue'
import TradeCenterVue from '@/components/TradeCenter.vue'

const tab = ref(TAB_ALL)
const tradeCenterCollection = TradeCenterCollection.getInstance()
const visibleOasis = computed(
  () => tab.value === TAB_ALL || tab.value === TAB_OASIS,
)
const visibleKaruForest = computed(
  () => tab.value === TAB_ALL || tab.value === TAB_KARU_FOREST,
)
const visibleKalidaLake = computed(
  () => tab.value === TAB_ALL || tab.value === TAB_KALIDA_LAKE,
)
const visiblePeraVolcano = computed(
  () => tab.value === TAB_PERA_VOLCANO || tab.value === TAB_PERA_VOLCANO,
)
</script>

<template>
  <div class="main">
    <tab-controller-vue v-model:name="tab" />
    <div class="trade-center">
      <trade-center-vue
        :visible="visibleOasis"
        :tradeCenter="tradeCenterCollection.get('oasis')"
        :showPlace="tab === TAB_ALL"
      />
      <trade-center-vue
        :visible="visibleKaruForest"
        :tradeCenter="tradeCenterCollection.get('karuForest')"
        :showPlace="tab === TAB_ALL"
      />
      <trade-center-vue
        :visible="visibleKalidaLake"
        :tradeCenter="tradeCenterCollection.get('kalidaLake')"
        :showPlace="tab === TAB_ALL"
      />
      <trade-center-vue
        :visible="visiblePeraVolcano"
        :tradeCenter="tradeCenterCollection.get('peraVolcano')"
        :showPlace="tab === TAB_ALL"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.trade-center {
  flex: 1;
  overflow: auto;
  padding: 0 4px 0 0;

  &[visible='false'] {
    display: none;
  }
}
</style>
