<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps<{
  idx?: number
  items: any[]
}>()
const emits = defineEmits(['update:idx'])

const items = computed(() => props.items)

const valueIdx = ref(props.idx || 0)
watch(valueIdx, (newIdx) => {
  emits('update:idx', newIdx)
})

const enterDirection = ref<'left' | 'right' | null>(null)
const leaveDirection = ref<'left' | 'right' | null>(null)
const leftItems = computed(() => items.value.slice(0, valueIdx.value))
const rightItems = computed(() => items.value.slice(valueIdx.value + 1))
const item = computed(() => items.value[valueIdx.value])

function onClickLeft() {
  enterDirection.value = 'left'
  leaveDirection.value = 'right'
  valueIdx.value = Math.max(valueIdx.value - 1, 0)
}
function onClickRight() {
  enterDirection.value = 'right'
  leaveDirection.value = 'left'
  valueIdx.value = Math.min(valueIdx.value + 1, items.value.length - 1)
}

defineExpose({
  setIdx(newIdx: number) {
    if (newIdx > valueIdx.value) {
      enterDirection.value = 'right'
      leaveDirection.value = 'left'
    } else if (newIdx < valueIdx.value) {
      enterDirection.value = 'left'
      leaveDirection.value = 'right'
    } else {
      enterDirection.value = null
      leaveDirection.value = null
    }
    valueIdx.value = Math.max(Math.min(newIdx, items.value.length - 1), 0)
  },
  reset() {
    enterDirection.value = null
    leaveDirection.value = null
    valueIdx.value = 0
  },
  onRemove(removeIdx: number) {
    if (removeIdx < items.value.length) {
      enterDirection.value = 'right'
      leaveDirection.value = null
      return
    }
    enterDirection.value = 'left'
    leaveDirection.value = null
    valueIdx.value = Math.max(
      Math.min(valueIdx.value - 1, items.value.length - 1),
      0,
    )
  },
  onAdd() {
    enterDirection.value = null
    leaveDirection.value = 'left'
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

function afterTransition() {
  enterDirection.value = null
  leaveDirection.value = null
}
function getDirectionAction(direction: 'left' | 'right' | null) {
  if (direction === 'left') return 'left'
  if (direction === 'right') return 'right'
  return 'fade'
}
function getTransitionName() {
  return [
    getDirectionAction(enterDirection.value),
    getDirectionAction(leaveDirection.value),
  ].join('-')
}
</script>

<template>
  <div class="carousel">
    <div class="con">
      <div
        class="side"
        @mouseover="leftHoverHandler.onHover"
        @mouseleave="leftHoverHandler.onLeave"
      >
        <div
          v-if="leftItems.length > 0 && leftHoverHandler.hovered"
          class="overlay"
          @click.stop="onClickLeft"
        >
          <p>←</p>
        </div>
      </div>
      <div class="con">
        <div
          class="item left"
          v-for="(leftItem, idxLeft) in leftItems"
          :key="`item-left-${idxLeft}`"
          :style="`right: calc(100% + ${
            (valueIdx - (idxLeft + 1)) * 5 + 8
          }px); z-index:${-(valueIdx - idxLeft)}`"
        >
          <slot name="left" :item="leftItem" :idx="idxLeft"></slot>
        </div>
        <Transition :name="getTransitionName()" @afterEnter="afterTransition">
          <slot v-if="item" :item="item" :idx="valueIdx"></slot>
        </Transition>
        <div
          class="item right"
          v-for="(rightItem, idxRight) in rightItems"
          :key="`item-right-${idxRight}`"
          :style="`left: calc(100% + ${idxRight * 5 + 8}px); z-index: ${
            -idxRight - 1
          }`"
        >
          <slot
            name="right"
            :item="rightItem"
            :idx="idxRight + valueIdx + 1"
          ></slot>
        </div>
      </div>
      <div
        class="side"
        @mouseover="rightHoverHandler.onHover"
        @mouseleave="rightHoverHandler.onLeave"
      >
        <div
          v-if="rightItems.length && rightHoverHandler.hovered"
          class="overlay"
          @click.stop="onClickRight"
        >
          <p>→</p>
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
    justify-content: center;
    overflow: hidden;

    > .side {
      flex: 1;
      z-index: 0;

      > .overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;

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
      position: relative;
      display: flex;
      align-items: center;

      > .item {
        position: absolute;

        &.left {
          transform-origin: 100% 50%;
          transform: scale(0.9);
        }
        &.right {
          transform-origin: 0% 50%;
          transform: scale(0.9);
        }
      }
    }
  }

  > p {
    text-align: center;
    font-size: 14px;
    letter-spacing: -0.5px;
  }
}

.fade-left-enter-active,
.fade-left-leave-active,
.fade-right-enter-active,
.fade-right-leave-active,
.fade-fade-enter-active,
.fade-fade-leave-active,
.left-right-enter-active,
.left-right-leave-active,
.left-fade-enter-active,
.left-fade-leave-active,
.right-left-enter-active,
.right-left-leave-active,
.right-fade-enter-active,
.right-fade-leave-active {
  transition: all 0.3s ease;
}

.fade-left-enter-from,
.fade-right-enter-from,
.fade-fade-enter-from,
.fade-fade-leave-to,
.left-fade-leave-to,
.right-fade-leave-to {
  position: absolute;
  opacity: 0;
  transform-origin: 50% 50%;
  transform: scale(0);
}

.left-right-enter-from,
.left-fade-enter-from,
.fade-left-leave-to,
.right-left-leave-to {
  position: absolute;
  transform-origin: 100% 50%;
  transform: scale(0.9) translateX(calc(-1000% / 9 - 8px));
}

.right-left-enter-from,
.right-fade-enter-from,
.fade-right-leave-to,
.left-right-leave-to {
  position: absolute;
  transform-origin: 0% 50%;
  transform: scale(0.9) translateX(calc(1000% / 9 + 8px));
}
</style>
