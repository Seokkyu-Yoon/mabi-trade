<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps<{
  idx?: number
  items: any[]
}>()
const emits = defineEmits(['update:idx', 'update:items'])

const items = computed(() => props.items)

const valueIdx = ref(props.idx || 0)
watch(valueIdx, (newIdx) => {
  emits('update:idx', newIdx)
})

const leftItems = computed(() => items.value.slice(0, valueIdx.value))
const rightItems = computed(() => items.value.slice(valueIdx.value + 1))
const item = computed(() => items.value[valueIdx.value])

function onClickLeft() {
  valueIdx.value = Math.max(valueIdx.value - 1, 0)
}
function onClickRight() {
  valueIdx.value = Math.min(valueIdx.value + 1, items.value.length - 1)
}

defineExpose({
  setIdx(newIdx: number) {
    valueIdx.value = Math.max(Math.min(newIdx, items.value.length - 1), 0)
  },
  reset() {
    valueIdx.value = 0
  },
  onRemove(removeIdx: number) {
    if (removeIdx < items.value.length) return
    valueIdx.value = Math.max(
      Math.min(valueIdx.value - 1, items.value.length - 1),
      0,
    )
  },
})

class HoverHandler {
  hovered: boolean = false

  onHover() {
    this.hovered = true
  }
  onLeave() {
    this.hovered = false
  }
}
const leftHoverHandler = reactive(new HoverHandler())
const rightHoverHandler = reactive(new HoverHandler())
</script>

<template>
  <div class="carousel">
    <div class="con">
      <div
        class="side"
        @click.stop="onClickLeft"
        @mouseover="leftHoverHandler.onHover"
        @mouseleave="leftHoverHandler.onLeave"
      >
        <div
          v-if="leftItems.length > 0 && leftHoverHandler.hovered"
          class="overlay"
        >
          <p>←</p>
        </div>
        <div
          class="item"
          v-for="(leftItem, idxLeft) in leftItems"
          :key="`item-left-${idxLeft}`"
          :style="`right: ${(valueIdx - (idxLeft + 1)) * 5}px;`"
        >
          <slot name="left" :item="leftItem" :idx="idxLeft"></slot>
        </div>
      </div>
      <div class="con">
        <slot v-if="item" :item="item" :idx="valueIdx"></slot>
      </div>
      <div
        class="side"
        @click.stop="onClickRight"
        @mouseover="rightHoverHandler.onHover"
        @mouseleave="rightHoverHandler.onLeave"
      >
        <div
          v-if="rightItems.length && rightHoverHandler.hovered"
          class="overlay"
        >
          <p>→</p>
        </div>
        <div
          class="item"
          v-for="(rightItem, idxRight) in rightItems"
          :key="`item-right-${idxRight}`"
          :style="`left: ${idxRight * 5}px; z-index: ${-idxRight}`"
        >
          <slot
            name="right"
            :item="rightItem"
            :idx="idxRight + valueIdx + 1"
          ></slot>
        </div>
      </div>
    </div>
    <p>{{ Math.min(valueIdx + 1, items.length) }} / {{ items.length }}</p>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  display: flex;
  flex-direction: column;

  > .con {
    min-width: 120px;
    min-height: 60px;
    display: flex;
    gap: 8px;
    z-index: 0;
    overflow: hidden;

    > .side {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;

      &:has(.item) {
        cursor: pointer;
      }

      > .item {
        position: absolute;
        scale: 0.9;
      }

      > .overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;

        background-color: rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: bold;

        > p {
          width: 60px;
          height: 60px;
          border-radius: 100px;
          background-color: #888;
          color: #ccc;
          text-align: center;
        }
      }
    }

    > .con {
      display: flex;
      align-items: center;
    }
  }

  > p {
    text-align: center;
    font-size: 14px;
    letter-spacing: -0.5px;
  }
}
</style>
