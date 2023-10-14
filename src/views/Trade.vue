<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { TabName } from '@/application/trade.tab'

import { useTradeStore } from '@/stores/trade'

import { TradeCenterCollection } from '@/data/trade.center'

import PopupVue from '@/components/Popup.vue'
import TradePopupLauncherVue from '@/components/TradePopupLauncher.vue'
import TradeCenterTabVue from '@/components/TradeCenterTab.vue'
import TradeCenterVue from '@/components/TradeCenter.vue'
import TradeSimulationVue from '@/components/TradeSimulation.vue'
import ProfitSimulationVue from '@/components/ProfitSimulation.vue'
import ButtonResetWeeklyVue from '@/components/ButtonResetWeekly.vue'

const tradeStore = useTradeStore()
const tradeCenterCollection = TradeCenterCollection.getInstance()
const tradeCenterOasis = tradeCenterCollection.get('오아시스')
const tradeCenterKaruForest = tradeCenterCollection.get('카루 숲')
const tradeCenterKalidaLake = tradeCenterCollection.get('칼리다 호수')
const tradeCenterPeraVolcano = tradeCenterCollection.get('페라 화산')

const tab = ref<TabName>('전체')
const tabIsAll = computed(() => tab.value === '전체')
const tabIsOasis = computed(() => tab.value === '오아시스')
const tabIsKaruForest = computed(() => tab.value === '카루 숲')
const tabIsKalidaLake = computed(() => tab.value === '칼리다 호수')
const tabIsPeraVolcano = computed(() => tab.value === '페라 화산')
const tabIsTradeSimulation = computed(() => tab.value === '교역 시뮬레이션')
const tabIsProfitSimulation = computed(() => tab.value === '수익 시뮬레이션')

const visibleOasis = computed(() => tabIsAll.value || tabIsOasis.value)
const visibleKaruForest = computed(
  () => tabIsAll.value || tabIsKaruForest.value,
)
const visibleKalidaLake = computed(
  () => tabIsAll.value || tabIsKalidaLake.value,
)
const visiblePeraVolcano = computed(
  () => tabIsAll.value || tabIsPeraVolcano.value,
)
const visibleSimulation = computed(() => tabIsTradeSimulation.value)
const visibleProfitSimulation = computed(() => tabIsProfitSimulation.value)

const refPopupReset = ref<typeof PopupVue | null>(null)
function openPopupReset() {
  refPopupReset.value?.open()
}
function closePopupReset() {
  refPopupReset.value?.close()
}
function resetTradeStore() {
  tradeStore.reset()
  closePopupReset()
}

function onKeydown(e: KeyboardEvent) {
  if (!refPopupReset.value) return
  if (!refPopupReset.value?.isShowing()) return
  const key = e.key.toLowerCase()
  if (key === 'escape') {
    closePopupReset()
    return
  }
  if (key === 'enter') {
    resetTradeStore()
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
  <div class="main">
    <popup-vue ref="refPopupReset">
      <div class="popup-reset">
        <p>Q.정말로 주간 교역 정보를 초기화 하시겠습니까?</p>
        <div>
          <button class="submit" @click.stop="resetTradeStore">확인</button>
          <button class="cancel" @click.stop="closePopupReset">취소</button>
        </div>
      </div>
    </popup-vue>
    <trade-center-tab-vue v-model:name="tab" />
    <trade-popup-launcher-vue />
    <button-reset-weekly-vue
      :visible="!visibleProfitSimulation"
      @click="openPopupReset"
    />
    <div class="con">
      <trade-center-vue
        :visible="visibleOasis"
        :tradeCenter="tradeCenterOasis"
        :showName="tabIsAll"
      />
      <trade-center-vue
        :visible="visibleKaruForest"
        :tradeCenter="tradeCenterKaruForest"
        :showName="tabIsAll"
      />
      <trade-center-vue
        :visible="visibleKalidaLake"
        :tradeCenter="tradeCenterKalidaLake"
        :showName="tabIsAll"
      />
      <trade-center-vue
        :visible="visiblePeraVolcano"
        :tradeCenter="tradeCenterPeraVolcano"
        :showName="tabIsAll"
      />
      <trade-simulation-vue :visible="visibleSimulation" />
      <profit-simulation-vue :visible="visibleProfitSimulation" />
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

  > .popup {
    .popup-reset {
      > p {
        font-size: 20px;
        letter-spacing: -0.75px;
        font-weight: 600;
      }

      > div {
        margin-top: 12px;
        display: flex;
        gap: 8px;
        justify-content: center;

        > button {
          padding: 4px 8px;
          color: #fff;
          border-radius: 4px;

          &.submit {
            background-color: #d57;
          }
          &.cancel {
            background-color: #888;
          }
        }
      }
    }
  }

  > .reset {
    margin-right: auto;
    background-color: #d57;
    padding: 4px 8px;
    color: #fff;
    border-radius: 4px;
  }

  > .con {
    flex: 1;
    overflow: auto;
    padding: 0 4px 0 0;
  }
}
</style>
