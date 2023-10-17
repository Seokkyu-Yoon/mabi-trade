<script lang="ts" setup>
import { ProfitInfo, SellerName, sellerNames } from '@/data/seller'
import { reactive, ref, watch } from 'vue'

const emits = defineEmits([
  'update:name',
  'update:count',
  'update:profitInfos',
  'click:delete',
])

const props = defineProps<{
  readonly?: boolean
  idx: number
  name: string
  count: number | undefined
  profitInfos: ProfitInfo
}>()

const readonly = ref(props.readonly || false)

const valueName = ref(props.name)
watch(valueName, (newName) => {
  emits('update:name', newName)
})
function resetName() {
  valueName.value = ''
}

const valueCount = ref(props.count)
watch(valueCount, (newCount) => {
  emits('update:count', newCount)
})
function resetCount() {
  valueCount.value = undefined
}

const valueProfitInfos = reactive(props.profitInfos)
watch(valueProfitInfos, (newProfitInfos) => {
  emits('update:profitInfos', newProfitInfos)
})
function resetProfit(sellerName: SellerName) {
  valueProfitInfos[sellerName] = undefined
}

function deleteItem() {
  emits('click:delete', props.idx)
}
function resetItem() {
  resetName()
  resetCount()
  sellerNames.forEach((sellerName) => {
    resetProfit(sellerName)
  })
  refName.value?.focus()
}

const refName = ref<HTMLInputElement | null>(null)
defineExpose({
  focus() {
    refName.value?.focus()
  },
})
</script>

<template>
  <div class="profit-item" :readonly="readonly">
    <div class="row head">
      <input
        class="name"
        ref="refName"
        type="text"
        placeholder="품목명"
        v-model="valueName"
        @focus="resetName"
      />
      <input
        class="count"
        type="number"
        min="0"
        placeholder="개수"
        v-model="valueCount"
        @focus="resetCount"
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
        :readonly="readonly"
        v-model="valueProfitInfos[sellerName]"
        @focus="() => resetProfit(sellerName)"
      />
    </div>
    <div class="row button-wrap">
      <button class="delete" @click="deleteItem" :readonly="readonly">
        삭제
      </button>
      <button class="reset" @click="resetItem" :readonly="readonly">
        초기화
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profit-item {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  white-space: pre;

  &[readonly] {
    pointer-events: none;
  }

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
</style>
