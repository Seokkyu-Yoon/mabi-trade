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
import { useTradeStore } from '@/stores/trade'

const tradeStore = useTradeStore()

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

const showTradeStorePopup = ref(false)
const showTradeStorePopupTransition = ref(false)
function openTradeStorePopup() {
  showTradeStorePopup.value = true
  openTradeStorePopupTransition()
}
function closeTradeStorePopup() {
  showTradeStorePopup.value = false
}
function openTradeStorePopupTransition() {
  showTradeStorePopupTransition.value = true
}
function closeTradeStorePopupTransition() {
  showTradeStorePopupTransition.value = false
}
function resetTradeStore() {
  tradeStore.reset()
  closeTradeStorePopupTransition()
}
</script>

<template>
  <div class="main">
    <div
      v-if="showTradeStorePopup"
      class="popup"
      @click.stop="closeTradeStorePopupTransition"
    >
      <transition name="popup" appear @afterLeave="closeTradeStorePopup">
        <div class="con" v-if="showTradeStorePopupTransition">
          <p>Q.정말로 주간 교역 정보를 초기화 하시겠습니까?</p>
          <div>
            <button class="submit" @click.stop="resetTradeStore">확인</button>
            <button class="cancel" @click.stop="closeTradeStorePopupTransition">
              취소
            </button>
          </div>
        </div>
      </transition>
    </div>
    <tab-controller-vue v-model:name="tab" />
    <button class="reset" @click="openTradeStorePopup">
      주간 교역 정보 초기화
    </button>
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

  > .popup {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    &[visible='false'] {
      display: none;
    }

    > .con {
      padding: 20px 24px;
      background-color: #fff;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      > p {
        font-size: 20px;
        letter-spacing: -0.75px;
        font-weight: 600;
      }

      > div {
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
}
.trade-center {
  flex: 1;
  overflow: auto;
  padding: 0 4px 0 0;

  &[visible='false'] {
    display: none;
  }
}

.popup-enter-active {
  transition: all 0.4s ease;
}
.popup-leave-active {
  transition: all 0.2s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  scale: 0;
}
</style>
