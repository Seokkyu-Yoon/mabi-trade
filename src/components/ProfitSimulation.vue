<script setup lang="ts">
import {
  Component,
  ComponentOptionsBase,
  ComponentPublicInstance,
  Ref,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from 'vue'

import SimulatorPopupLauncherVue from './SimulatorPopupLauncher.vue'
import PopupVue from './Popup.vue'

const SELLER_1 = '티르코네일'
const SELLER_2 = '던바튼'
const SELLER_3 = '반호르'
const SELLER_4 = '이멘마하'
const SELLER_5 = '탈틴'
const SELLER_6 = '타라'
const SELLER_7 = '카브'
const SELLER_8 = '벨바스트'
const SELLER_9 = '켈라'
const SELLER_10 = '필리아'
const SELLER_11 = '코르'
const SELLER_12 = '발레스'

type SellerName =
  | typeof SELLER_1
  | typeof SELLER_2
  | typeof SELLER_3
  | typeof SELLER_4
  | typeof SELLER_5
  | typeof SELLER_6
  | typeof SELLER_7
  | typeof SELLER_8
  | typeof SELLER_9
  | typeof SELLER_10
  | typeof SELLER_11
  | typeof SELLER_12

type ProfitInfo = Record<SellerName, number | undefined>

const sellerNames: SellerName[] = [
  SELLER_1,
  SELLER_2,
  SELLER_3,
  SELLER_4,
  SELLER_5,
  SELLER_6,
  SELLER_7,
  SELLER_8,
  SELLER_9,
  SELLER_10,
  SELLER_11,
  SELLER_12,
]

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
  nextTick(() => {
    refProfitNames.value.splice(0, refProfitNames.value.length)
    closePopupResetSimulation()
  })
}

const refProfitNames = ref<(HTMLElement | null)[]>([])
function setRefProfitNames(el: HTMLElement | null, rowIdx: number) {
  refProfitNames.value[rowIdx] = el
}
const profitInfo2d = reactive<[string, number | undefined, ProfitInfo][]>([])
function addProfitInfo() {
  const idx = profitInfo2d.length
  const name = ''
  profitInfo2d.push([
    name,
    undefined,
    {
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
    },
  ])
  refProfitNames.value.push(null)
  nextTick(() => {
    refProfitNames.value[idx]?.focus()
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
  return profitInfo2d.reduce((acc, [_name, count, profitInfo]) => {
    return acc + (profitInfo[sellerName] || 0) * (count || 0)
  }, 0)
}
function removeProfitInfo(rowIdx: number) {
  profitInfo2d.splice(rowIdx, 1)
  refProfitNames.value.splice(rowIdx, 1)
}
function resetProfitInfo(rowIdx: number) {
  resetProfitName(rowIdx)
  resetProfitCount(rowIdx)
  sellerNames.forEach((sellerName) => resetProfit(rowIdx, sellerName))
  refProfitNames.value[rowIdx]?.focus()
}
function resetProfitName(rowIdx: number) {
  profitInfo2d[rowIdx][0] = ''
}
function resetProfitCount(rowIdx: number) {
  profitInfo2d[rowIdx][1] = undefined
}
function resetProfit(rowIdx: number, sellerName: SellerName) {
  profitInfo2d[rowIdx][2][sellerName] = undefined
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
        <template
          v-for="([_itemName, _count, profitInfo], rowIdx) in profitInfo2d"
          :key="`profit-${rowIdx}`"
        >
          <div class="item">
            <div class="row head">
              <input
                class="name"
                :ref="(el) => setRefProfitNames(el as HTMLElement, rowIdx)"
                type="text"
                placeholder="품목명"
                v-model="profitInfo2d[rowIdx][0]"
                @focus="() => resetProfitName(rowIdx)"
              />
              <input
                class="count"
                type="number"
                min="0"
                placeholder="개수"
                v-model="profitInfo2d[rowIdx][1]"
                @focus="() => resetProfitCount(rowIdx)"
              />
            </div>
            <div
              class="row profit"
              v-for="(sellerName, idx) in sellerNames"
              :key="`seller-${idx}`"
            >
              <p>- {{ sellerName }}</p>
              <input
                type="number"
                min="0"
                placeholder="수익"
                v-model="profitInfo2d[rowIdx][2][sellerName]"
                @focus="() => resetProfit(rowIdx, sellerName)"
              />
            </div>
            <div class="row button-wrap">
              <button class="delete" @click="() => removeProfitInfo(rowIdx)">
                삭제
              </button>
              <button class="reset" @click="() => resetProfitInfo(rowIdx)">
                초기화
              </button>
            </div>
          </div>
        </template>
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

        > .item {
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          white-space: pre;
          > .row {
            padding: 2px 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 13px;
            letter-spacing: -0.5px;
            gap: 8px;

            > input {
              flex: 1;
              padding: 4px 8px;
              max-width: 0;
              min-width: 50px;
              font-size: 12px;
              background: #eee;
              border-radius: 2px;
              border: none;

              &[type='number'] {
                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
              &.name {
                font-size: 14px;
                font-weight: bold;
                letter-spacing: -0.75px;
                min-width: 150px;
              }
            }

            &.button-wrap {
              padding: 4px 0;

              > button {
                padding: 2px 4px;
                border-radius: 4px;
                font-weight: 500;

                &.delete {
                  border: 1px solid #d57;
                  color: #d57;
                  background-color: #fff;

                  &:hover {
                    color: #fff;
                    background-color: #d57;
                  }
                }
                &.reset {
                  border: 1px solid #c97;
                  color: #c97;

                  &:hover {
                    background-color: #c97;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
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
