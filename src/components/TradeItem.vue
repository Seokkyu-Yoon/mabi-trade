<script setup lang="ts">
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useTradeStore } from '@/stores/trade'
import { ItemCollection, ItemName } from '@/data/item'
import { TradeItem, TradeItemCollection } from '@/data/trade.item'

import { PopupEmitter } from '@/application/popup.emitter'

const itemCollection = ItemCollection.getInstance()
const tradeItemCollection = TradeItemCollection.getInstance()

const tradeStore = useTradeStore()

const props = defineProps<{
  tradeItem: TradeItem
}>()

const sidePopupListener = PopupEmitter.getInstance()

const tradeItem = computed(() => props.tradeItem)
const traded = computed(() => tradeStore.get(tradeItem.value.name) || 0)

const visibleItems = ref(false)
function toggleVisibleItems() {
  visibleItems.value = !visibleItems.value
}

function showItemPopup(itemName: ItemName) {
  const item = itemCollection.get(itemName)
  sidePopupListener.emit({
    id: uuidv4(),
    title: item.name,
    msgs: item.descriptions,
  })
}

class Repeater {
  private static MAX_DELAY = 150
  private static MIN_DELAY = 100
  private timeout: null | ReturnType<typeof setTimeout> = null
  private callback: () => void

  constructor(callback: () => void) {
    this.callback = callback
  }

  run(delay = Repeater.MAX_DELAY) {
    const currDelay = Math.min(
      Math.max(delay, Repeater.MIN_DELAY),
      Repeater.MAX_DELAY,
    )
    this.callback()
    const newDelay = Math.max(currDelay - 10, Repeater.MIN_DELAY)
    this.timeout = setTimeout(() => {
      this.run(newDelay)
    }, currDelay)
  }

  stop() {
    if (this.timeout === null) return
    clearTimeout(this.timeout)
  }
}
const addRepeater = new Repeater(() => {
  tradeStore.set(
    tradeItem.value.name,
    Math.min(traded.value + 1, tradeItem.value.weekendCount),
  )
})
const subRepeater = new Repeater(() => {
  tradeStore.set(tradeItem.value.name, Math.max(traded.value - 1, 0))
})
</script>

<template>
  <div
    class="trade-item"
    :active="visibleItems"
    :ended="traded === tradeItem.weekendCount"
    @mousedown="toggleVisibleItems"
  >
    <h1>
      {{ tradeItem.name }}
    </h1>
    <div class="wrap">
      <span class="desc"> 무게 / 슬롯당 최대갯수 (개) </span>
      <span class="value">
        {{ tradeItem.weight }} / {{ tradeItem.slotCount }}개
      </span>
    </div>
    <div class="wrap">
      <span class="desc">주간 판매횟수 (최대 판매횟수)</span>
      <div>
        <button
          class="add"
          @mousedown.stop="() => addRepeater.run()"
          @mouseup="() => addRepeater.stop()"
          @mouseleave="() => addRepeater.stop()"
        >
          +
        </button>
        {{ traded }}
        <span>({{ tradeItem.weekendCount }})</span>
        <button
          class="sub"
          @mousedown.stop="() => subRepeater.run()"
          @mouseup="() => subRepeater.stop()"
          @mouseleave="() => subRepeater.stop()"
        >
          -
        </button>
      </div>
    </div>

    <div v-if="visibleItems" class="items">
      <div>
        <p class="head">품목</p>
        <p
          v-for="([itemName], idx) in tradeItem.items"
          :key="`${itemName}-${idx}-name`"
          @click.stop="() => showItemPopup(itemName)"
        >
          {{ itemName }}
        </p>
      </div>
      <div>
        <p class="head">1회 제작 재료</p>
        <p
          v-for="([itemName, count], idx) in tradeItem.items"
          :key="`${itemName}-${idx}-once`"
        >
          {{ count }}개
        </p>
      </div>
      <div>
        <p class="head">남은 제작 재료</p>
        <p
          v-for="([itemName, count], idx) in tradeItem.items"
          :key="`${itemName}-${idx}-remain`"
        >
          {{ count * (tradeItem.weekendCount - traded) }}개
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.trade-item {
  width: 100%;
  border: 1px solid #acf;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &[active='true'] {
    background-color: #acf;

    > .wrap {
      > .desc {
        color: #555;
      }

      > .value {
        color: #000;
      }
    }
  }

  &[ended='true'] {
    background-color: #ccc;
    border: 1px solid #ccc;
  }

  > h1 {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.75px;
  }

  > .wrap {
    display: flex;
    align-items: center;
    gap: 12px;

    > .desc {
      font-size: 13px;
      letter-spacing: -0.5px;
      color: #555;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.3px;
      color: #333;

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        color: #fff;
        border-radius: 4px;

        &.add {
          background-color: #5a7;
        }

        &.sub {
          background-color: #c97;
        }
      }

      > span {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.5px;
        color: #555;
      }
    }
  }

  > .items {
    margin-top: 2px;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    letter-spacing: -0.75px;
    display: flex;

    > div {
      border-left: 1px solid #ccc;

      &:nth-child(1) {
        border-left: none;
        > p {
          color: #35f;
          text-decoration: underline;
          cursor: pointer;
        }
      }

      p {
        padding: 4px 8px;

        &.head {
          color: #333;
          font-weight: 600;
          text-decoration: none;
          cursor: default;
          text-align: center;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
