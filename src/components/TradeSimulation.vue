<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { TradeItemCollection } from '@/data/trade.item'
import { TradePartnerCollection } from '@/data/trade.partner'
import { TradeVehicleCollection } from '@/data/trade.vehicle'
import { TradeCenterCollection } from '@/data/trade.center'
import { TradeSimulator } from '@/application/trade.simulator'

import { useUserStore } from '@/stores/user'

import SimulatorPopupLauncherVue from './SimulatorPopupLauncher.vue'
import TradeCenterVue from './TradeCenter.vue'
import PopupVue from './Popup.vue'

const props = defineProps<{
  visible: boolean
}>()

const visible = computed(() => props.visible)

const userStore = useUserStore()
const tradePartnerCollection = TradePartnerCollection.getInstance()
const tradeVehicleCollection = TradeVehicleCollection.getInstance()
const tradeCenterCollection = TradeCenterCollection.getInstance()

const tradePartners = tradePartnerCollection.getPartners()
const tradeVehicles = tradeVehicleCollection.getVehicles()

const isGrandMasterMerchant = ref(userStore.record.grandMasterMerchant)
const tradePartnerType = ref(userStore.record.tradePartnerType)
const tradeVehicleName = ref(userStore.record.tradeVehicleName)

watch(isGrandMasterMerchant, (grandMasterMerchant) => {
  userStore.setGrandMasterMerchant(grandMasterMerchant)
  tradeSimulator.reset()
})
watch(tradePartnerType, (newTradePartnerType) => {
  userStore.setTradePartnerType(newTradePartnerType)
  tradeSimulator.reset()
})
watch(tradeVehicleName, (newTradeVehicleName) => {
  userStore.setTradeVehicleName(newTradeVehicleName)
  tradeSimulator.reset()
})

function toggleGrandMasterMerchat() {
  isGrandMasterMerchant.value = !isGrandMasterMerchant.value
}

const tradePartner = computed(() =>
  tradePartnerCollection.get(tradePartnerType.value),
)
const tradeVehicle = computed(() =>
  tradeVehicleCollection.get(tradeVehicleName.value),
)
const totalWeight = computed(() => {
  return (
    tradeVehicle.value.weight +
    (isGrandMasterMerchant.value ? 100 : 0) +
    (tradeVehicle.value.enablePartner ? tradePartner.value.weight : 0)
  )
})
const totalSlot = computed(() => {
  return (
    tradeVehicle.value.slot +
    (isGrandMasterMerchant.value ? 1 : 0) +
    (tradeVehicle.value.enablePartner ? tradePartner.value.slot : 0)
  )
})

const tradeItemCollection = TradeItemCollection.getInstance()
const tradeSimulator: TradeSimulator = reactive<TradeSimulator>(
  new TradeSimulator(),
)
const pickedTradeItems = computed(() =>
  tradeSimulator.getTradeItems().map(([tradeItemName, count]) => {
    const tradeItem = tradeItemCollection.get(tradeItemName)
    return { tradeItem, count }
  }),
)
watch(totalWeight, (newTotalWeight) => {
  tradeSimulator.setTotalWeight(newTotalWeight)
})
watch(totalSlot, (newTotalSlot) => {
  tradeSimulator.setTotalSlot(newTotalSlot)
})
onMounted(() => {
  tradeSimulator.setTotalWeight(totalWeight.value)
  tradeSimulator.setTotalSlot(totalSlot.value)
})

const refPopupResetSimulation = ref<typeof PopupVue | null>(null)
const refPopupApplySimulation = ref<typeof PopupVue | null>(null)
function openPopupResetSimulation() {
  refPopupResetSimulation.value?.open()
}
function closePopupResetSimulation() {
  refPopupResetSimulation.value?.close()
}
function resetSimulation() {
  tradeSimulator.reset()
  closePopupResetSimulation()
}

function openPopupApplySimulation() {
  refPopupApplySimulation.value?.open()
}
function closePopupApplySimulation() {
  refPopupApplySimulation.value?.close()
}
function applySimulation() {
  tradeSimulator.save()
  closePopupApplySimulation()
}

function onKeydown(e: KeyboardEvent) {
  if (!visible.value) return
  onKeydownForPopupResetSimulation(e)
  onKeydownForPopupApplySimulation(e)

  if (!e.ctrlKey) return

  const key = e.key.toLowerCase()
  if (key === 's') {
    openPopupApplySimulation()
    return
  }
  if (key === 'd') {
    openPopupResetSimulation()
    return
  }
}
function onKeydownForPopupResetSimulation(e: KeyboardEvent) {
  if (!refPopupResetSimulation.value) return
  if (!refPopupResetSimulation.value?.isShowing()) return
  const key = e.key.toLowerCase()
  if (key === 'escape') {
    closePopupResetSimulation()
    return
  }
  if (key === 'enter') {
    resetSimulation()
    return
  }
}
function onKeydownForPopupApplySimulation(e: KeyboardEvent) {
  if (!refPopupApplySimulation.value) return
  if (!refPopupApplySimulation.value?.isShowing()) return
  const key = e.key.toLowerCase()
  if (key === 'escape') {
    closePopupApplySimulation()
    return
  }
  if (key === 'enter') {
    applySimulation()
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
  <div class="trade-simulation" :visible="visible">
    <simulator-popup-launcher-vue />
    <popup-vue ref="refPopupResetSimulation">
      <div class="popup reset">
        <p>Q.정말로 교역 시뮬레이션 정보를 초기화 하시겠습니까?</p>
        <div>
          <button class="submit" @click.stop="resetSimulation">초기화</button>
          <button class="cancel" @click.stop="closePopupResetSimulation">
            취소
          </button>
        </div>
      </div>
    </popup-vue>
    <popup-vue ref="refPopupApplySimulation">
      <div class="popup apply">
        <p>Q.현재 교역 시뮬레이션 정보를 주간 교역 정보에 반영 하시겠습니까?</p>
        <div>
          <button class="submit" @click.stop="applySimulation">반영</button>
          <button class="cancel" @click.stop="closePopupApplySimulation">
            취소
          </button>
        </div>
      </div>
    </popup-vue>
    <div class="user">
      <h1>교역 수단 정보</h1>
      <div class="select">
        <label
          class="grand-master-merchant"
          :active="isGrandMasterMerchant"
          @click="toggleGrandMasterMerchat"
        >
          그랜마 상인
        </label>

        <select v-model="tradeVehicleName">
          <option
            v-for="tradeVehicle in tradeVehicles"
            :key="`trade-vehicle-${tradeVehicle.name}`"
            :value="tradeVehicle.name"
          >
            {{ tradeVehicle.name }}
          </option>
        </select>

        <select v-if="tradeVehicle.enablePartner" v-model="tradePartnerType">
          <option
            v-for="tradePartner in tradePartners"
            :key="`trade-partner-${tradePartner.type}`"
            :value="tradePartner.type"
          >
            {{ tradePartner.type }}
          </option>
        </select>
      </div>
      <div class="total">
        <p>
          총 무게 <span>{{ totalWeight }}</span>
        </p>
        <p>
          총 슬롯 <span>{{ totalSlot }}</span>
        </p>
      </div>
    </div>
    <div class="sim-info">
      <div class="trading-wrap">
        <h1>교역 시뮬레이션</h1>
        <p>
          무게 <span>{{ tradeSimulator.weight }}</span>
        </p>
        <p>
          슬롯 <span>{{ tradeSimulator.slot }}</span>
        </p>
        <div class="button-wrap">
          <button class="submit" @click.stop="openPopupApplySimulation">
            주간 교역 정보에 추가
          </button>
          <button class="reset" @click.stop="openPopupResetSimulation">
            초기화
          </button>
        </div>
        <div class="sim-trade-item-wrap">
          <p
            class="trade-item"
            v-for="{ tradeItem, count } in pickedTradeItems"
            :key="`trade-item-${tradeItem.name}`"
          >
            {{ tradeItem.name }} - {{ count }}개(무게:
            {{ tradeItem.weight * count }} / 슬롯:
            {{ Math.ceil(count / tradeItem.slotCount) }}칸)
          </p>
        </div>
      </div>
      <div class="trade-center-wrap">
        <trade-center-vue
          v-for="tradeCenter in tradeCenterCollection.getTradeCenters()"
          :key="`trade-center-${tradeCenter.name}`"
          visible
          showName
          :tradeCenter="tradeCenter"
          :trade-simulator="tradeSimulator"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.trade-simulation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > .popup {
    .popup {
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
          border-radius: 4px;
          font-weight: 500;

          &.cancel {
            border: 1px solid #888;
            color: #888;

            &:hover {
              background-color: #888;
              color: #fff;
            }
          }
        }
      }

      &.reset {
        > div {
          > button.submit {
            border: 1px solid #d57;
            color: #d57;

            &:hover {
              background-color: #d57;
              color: #fff;
            }
          }
        }
      }
      &.apply {
        > div {
          > button.submit {
            border: 1px solid #5a7;
            color: #5a7;

            &:hover {
              background-color: #5a7;
              color: #fff;
            }
          }
        }
      }
    }
  }
  > .user {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #acf;

    > h1 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    > div {
      display: flex;

      &.select {
        gap: 12px;
        letter-spacing: -0.75px;
        font-size: 14px;

        > .grand-master-merchant {
          padding: 4px 8px;
          border: 1px solid #5a7;
          color: #5a7;
          border-radius: 4px;
          cursor: pointer;

          &:hover,
          &[active='true'] {
            background-color: #5a7;
            color: #fff;
          }
        }

        > select {
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }
      }

      &.total {
        gap: 10px;
        letter-spacing: -0.5px;

        > p {
          color: #555;
          font-size: 12px;

          > span {
            color: #333;
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }

  > .sim-info {
    padding: 12px 0;
    display: flex;
    overflow: hidden;
    gap: 16px;

    > .trading-wrap {
      flex: 1;
      overflow: auto;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #acf;
      display: flex;
      flex-direction: column;

      > h1 {
        font-size: 20px;
        font-weight: 600;
      }
      > p {
        color: #555;
        font-size: 12px;

        > span {
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }
      }

      > .button-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;

        > button {
          padding: 4px 8px;
          color: #fff;
          border-radius: 4px;
          font-weight: 500;

          &.submit {
            border: 1px solid #5a7;
            color: #5a7;

            &:hover {
              background-color: #5a7;
              color: #fff;
            }
          }
          &.reset {
            border: 1px solid #d57;
            color: #d57;
            &:hover {
              background-color: #d57;
              color: #fff;
            }
          }
        }
      }

      > .sim-trade-item-wrap {
        flex: 1;
        overflow: auto;
        padding: 8px 12px 8px 0;
        font-size: 14px;
        font-weight: 500;

        > p {
          padding: 2px 0;
        }
      }
    }

    > .trade-center-wrap {
      flex: 1;
      overflow: auto;
      padding-right: 8px;
    }
  }
}
</style>
