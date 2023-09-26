<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { simulatorPopupListener } from '@/application/popup.emitter'

const message = ref<string>('')
const visible = ref(false)

function open() {
  visible.value = true
}
function close() {
  visible.value = false
}

let openingTimeout: NodeJS.Timeout | null = null
function onMsg(msg: string) {
  if (openingTimeout !== null) clearTimeout(openingTimeout)
  if (message.value !== msg) {
    close()
  }

  nextTick(() => {
    open()
    message.value = msg
    openingTimeout = setTimeout(() => {
      close()
    }, 2000)
  })
}
onMounted(() => {
  simulatorPopupListener.on(onMsg)
})
onUnmounted(() => {
  simulatorPopupListener.off(onMsg)
})
</script>

<template>
  <div ref="refPopupLauncher" class="simulator-popup-launcher">
    <transition name="message">
      <div v-if="visible" class="popup" @click="close()">
        <p>{{ message || '' }}</p>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.simulator-popup-launcher {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -20px);
  bottom: 0;

  > .popup {
    border-radius: 4px;
    padding: 10px 12px;
    background-color: rgba(255, 47, 75, 0.66);
    border: 1px solid rgba(255, 47, 75, 0.8);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.7px;
    cursor: pointer;
  }
}

.message-enter-active {
  transition: all 0.5s ease;
}
.message-leave-active {
  transition: all 0.3s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
