<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'

import SimulatorPopupLauncherVue from './SimulatorPopupLauncher.vue'
import PopupVue from './Popup.vue'
import ProfitItemVue from './ProfitItem.vue'

import {
  ProfitInfo,
  SellerName,
  SELLER_1,
  SELLER_10,
  SELLER_11,
  SELLER_12,
  SELLER_2,
  SELLER_3,
  SELLER_4,
  SELLER_5,
  SELLER_6,
  SELLER_7,
  SELLER_8,
  SELLER_9,
  sellerNames,
} from '@/data/seller'

function createProfitInfo(): ProfitInfo {
  return {
    [SELLER_1]: undefined,
    [SELLER_2]: undefined,
    [SELLER_3]: undefined,
    [SELLER_4]: undefined,
    [SELLER_5]: undefined,
    [SELLER_6]: undefined,
    [SELLER_7]: undefined,
    [SELLER_8]: undefined,
    [SELLER_9]: undefined,
    [SELLER_10]: undefined,
    [SELLER_11]: undefined,
    [SELLER_12]: undefined,
  }
}

const props = defineProps<{
  visible: boolean
}>()

const visible = computed(() => props.visible)

const refPopupResetSimulation = ref<typeof PopupVue | null>(null)
function openPopupResetSimulation() {
  refPopupResetSimulation.value?.open()
}
function closePopupResetSimulation() {
  refPopupResetSimulation.value?.close()
}
function resetSimulation() {
  profitInfo2d.splice(0, profitInfo2d.length)
  closePopupResetSimulation()
  profitInfoSerial = 0
}

const refProfitItems = ref<(HTMLElement | null)[]>([])
const profitInfo2d = reactive<
  {
    serial: number
    name: string
    count: number | undefined
    info: ProfitInfo
  }[]
>([])

let profitInfoSerial = 0
function addProfitInfo() {
  const idx = profitInfo2d.length
  const name = ''
  profitInfo2d.push({
    serial: profitInfoSerial,
    name,
    count: undefined,
    info: createProfitInfo(),
  })
  profitInfoSerial += 1
  nextTick(() => {
    refProfitItems.value[idx]?.focus()
  })
}

const sellerOrderByProfit = computed(() => {
  const profits: [SellerName, number][] = sellerNames.map((sellerName) => [
    sellerName,
    getProfitBySeller(sellerName),
  ])
  profits.sort((a, b) => b[1] - a[1])
  return profits
})
function getProfitBySeller(sellerName: SellerName) {
  return profitInfo2d.reduce((acc, { count, info }) => {
    return acc + (info[sellerName] || 0) * (count || 0)
  }, 0)
}
function removeProfitInfo(rowIdx: number) {
  profitInfo2d.splice(rowIdx, 1)
}

function onKeydown(e: KeyboardEvent) {
  onKeydownForPopupResetSimulation(e)

  if (!e.ctrlKey) return
  const key = e.key.toLowerCase()
  if (key === 'a') {
    addProfitInfo()
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
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="profit-simulation" :visible="visible">
    <simulator-popup-launcher-vue />
    <popup-vue ref="refPopupResetSimulation">
      <div class="popup reset">
        <p>Q.정말로 수익 시뮬레이션 정보를 초기화 하시겠습니까?</p>
        <div>
          <button class="submit" @click.stop="resetSimulation">초기화</button>
          <button class="cancel" @click.stop="closePopupResetSimulation">
            취소
          </button>
        </div>
      </div>
    </popup-vue>

    <div class="button-wrap">
      <button class="submit" @click.stop="addProfitInfo">교역품 추가</button>
      <button class="reset" @click.stop="openPopupResetSimulation">
        교역품 초기화
      </button>
    </div>

    <div class="info trade">
      <h1>교역 정보</h1>
      <div class="item-wrap">
        <profit-item-vue
          v-for="(profitInfo, profitIdx) in profitInfo2d"
          :key="`profit-${profitInfo.serial}`"
          ref="refProfitItems"
          :idx="profitIdx"
          v-model:name="profitInfo2d[profitIdx].name"
          v-model:count="profitInfo2d[profitIdx].count"
          v-model:profitInfos="profitInfo2d[profitIdx].info"
          @click:delete="removeProfitInfo"
        />
      </div>
    </div>

    <div class="info result">
      <h1>집계</h1>
      <div class="item-wrap">
        <label
          v-for="[sellerName, profit] in sellerOrderByProfit"
          :key="`result-${sellerName}`"
        >
          {{ sellerName }}
          <span>{{ profit }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profit-simulation {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden auto;
  gap: 10px;

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
          color: #fff;
          border-radius: 4px;
          &.cancel {
            background-color: #888;
          }
        }
      }

      &.reset {
        > div {
          > button.submit {
            background-color: #d57;
          }
        }
      }
    }
  }

  > .button-wrap {
    display: flex;
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

  > .info {
    overflow: auto hidden;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #acf;

    > h1 {
      font-size: 20px;
      font-weight: 600;
    }

    &.trade {
      > .item-wrap {
        padding: 4px 0;
        display: flex;
        overflow: auto hidden;
        gap: 4px;
      }
    }

    &.result {
      > .item-wrap {
        padding: 4px 0px;
        display: flex;
        overflow: auto hidden;
        gap: 8px;

        > label {
          white-space: nowrap;
          padding: 4px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-weight: 600;
          letter-spacing: -0.5px;

          > span {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
