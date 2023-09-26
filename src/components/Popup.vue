<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const visibleCon = ref(false)

function open() {
  visible.value = true
  openCon()
}
function close() {
  visible.value = false
}

function openCon() {
  visibleCon.value = true
}
function closeCon() {
  visibleCon.value = false
}

defineExpose<{
  open: typeof open
  close: typeof closeCon
}>({
  open,
  close: closeCon,
})
</script>

<template>
  <div v-if="visible" class="popup" @click.stop="closeCon">
    <transition name="popup" appear @afterLeave="close">
      <div class="con" v-if="visibleCon">
        <div class="con-wrap">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &[visible='false'] {
    display: none;
  }

  > .con {
    max-width: 70%;
    max-height: 70%;
    padding: 12px;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    display: flex;

    > .con-wrap {
      flex: 1;
    }
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
