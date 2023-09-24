<script setup lang="ts">
import { computed, ref } from 'vue'

import { ItemCollection, ItemName } from '@/data/item'
import { TradeInfo } from '@/data/trade.center'

import PopupLauncherVue from './PopupLauncher.vue'

const itemCollection = ItemCollection.getInstance()

const props = defineProps<{
  tradeInfo: TradeInfo
  traded?: number
}>()

const tradeInfo = computed(() => props.tradeInfo)
const traded = computed(() => props?.traded || 0)
const visibleItems = ref(false)
function toggleVisibleItems() {
  visibleItems.value = !visibleItems.value
}

function showItemPopup(itemName: ItemName) {
  const item = itemCollection.get(itemName)
  window.alert(item.descriptions.join('\n'))
}
</script>

<template>
  <div class="trade-info" :active="visibleItems" @click="toggleVisibleItems">
    <h1>
      {{ tradeInfo.name }}
    </h1>
    <div class="wrap">
      <span class="desc">무게 / 슬롯당 최대갯수(개)</span>
      <span class="value"
        >{{ tradeInfo.weight }} / {{ tradeInfo.slotCount }}개</span
      >
    </div>
    <div class="wrap">
      <span class="desc">주간 판매횟수 / 최대 판매횟수</span>
      <span class="value">{{ traded }} / {{ tradeInfo.weekendCount }}</span>
    </div>

    <div v-if="visibleItems" class="items">
      <p
        v-for="[itemName, count] in tradeInfo.items"
        class="item"
        @click.stop="() => showItemPopup(itemName)"
      >
        {{ itemName }}: {{ count }}개
      </p>
    </div>
  </div>
  <popup-launcher-vue />
</template>

<style scoped lang="scss">
.trade-info {
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
      color: #888;
    }

    > .value {
      font-size: 16px;
      letter-spacing: -0.3px;
      color: #333;
    }
  }

  > .items {
    margin-top: 2px;
    background-color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    color: #35f;
    letter-spacing: -0.75px;
    text-decoration: underline;

    > p {
      width: fit-content;
    }
  }
}
</style>
