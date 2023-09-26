<script setup lang="ts">
import {
  TradeItem,
  TradeItemCollection,
  TradeItemName,
} from '@/data/trade.item'
import { TradePartnerCollection } from '@/data/trade.partner'
import { TradeVehicleCollection } from '@/data/trade.vehicle'
import { useTradeStore } from '@/stores/trade'
import { useUserStore } from '@/stores/user'
import { computed, reactive, ref, watch } from 'vue'

const userStore = useUserStore()
const tradePartnerCollection = TradePartnerCollection.getInstance()
const tradeVehicleCollection = TradeVehicleCollection.getInstance()

const tradePartners = tradePartnerCollection.getPartners()
const tradeVehicles = tradeVehicleCollection.getVehicles()

const isGrandMasterMerchant = ref(userStore.record.grandMasterMerchant)
const tradePartnerType = ref(userStore.record.tradePartnerType)
const tradeVehicleName = ref(userStore.record.tradeVehicleName)

watch(isGrandMasterMerchant, (grandMasterMerchant) => {
  userStore.setGrandMasterMerchant(grandMasterMerchant)
})
watch(tradePartnerType, (newTradePartnerType) => {
  userStore.setTradePartnerType(newTradePartnerType)
})
watch(tradeVehicleName, (newTradeVehicleName) => {
  userStore.setTradeVehicleName(newTradeVehicleName)
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

const tradeStore = useTradeStore()
const tradeItemCollection = TradeItemCollection.getInstance()
class Pocket {
  tradeItems: Map<TradeItemName, number> = new Map()
  weight: number = 0
  slot: number = 0

  getCount(tradeItemName: TradeItemName) {
    return this.tradeItems.get(tradeItemName) || 0
  }

  private overflowCount(tradeItem: TradeItem, newPocketCount: number) {
    return (
      newPocketCount + tradeStore.get(tradeItem.name) >= tradeItem.weekendCount
    )
  }
  private overflowWeight(tradeItem: TradeItem) {
    return this.weight + tradeItem.weight > totalWeight.value
  }
  private overflowSlot(slotDiff: number) {
    return this.slot + slotDiff > totalSlot.value
  }

  addTradeItem(tradeItem: TradeItem) {
    const pocketCount = this.getCount(tradeItem.name)
    const newPocketCount = pocketCount + 1
    const slotDiff =
      Math.ceil(newPocketCount / tradeItem.slotCount) -
      Math.ceil(pocketCount / tradeItem.slotCount)
    if (this.overflowCount(tradeItem, newPocketCount)) {
      console.log('주간 구매 횟수 초과')
      return
    }
    if (this.overflowWeight(tradeItem)) {
      console.log('무게 초과')
      return
    }
    if (this.overflowSlot(slotDiff)) {
      console.log('슬롯 초과')
      return
    }
    this.weight += tradeItem.weight
    this.slot += slotDiff
    this.tradeItems.set(tradeItem.name, newPocketCount)
  }
  subTradeItem(tradeItem: TradeItem) {
    const pocketCount = this.getCount(tradeItem.name)
    const newPocketCount = pocketCount - 1
    const slotDiff =
      Math.ceil(newPocketCount / tradeItem.slotCount) -
      Math.ceil(pocketCount / tradeItem.slotCount)
    if (newPocketCount < 0) return
    this.weight -= tradeItem.weight
    this.slot += slotDiff

    if (newPocketCount === 0) {
      this.tradeItems.delete(tradeItem.name)
    } else {
      this.tradeItems.set(tradeItem.name, newPocketCount)
    }
  }
}
const pocket = new Pocket()
</script>

<template>
  <div class="trade-simulation">
    <div class="user">
      <h1>교역 수단 정보</h1>
      <div class="select">
        <label
          class="grand-master-merchant"
          :active="isGrandMasterMerchant"
          @click="toggleGrandMasterMerchat"
        >
          그랜마 상인 적용 ({{ isGrandMasterMerchant ? 'O' : 'X' }})
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
  </div>
</template>

<style scoped>
.trade-simulation {
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
          color: #fff;
          background-color: #5a7;
          border-radius: 4px;
          cursor: pointer;

          &[active='true'] {
            background-color: #c97;
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
}
</style>
