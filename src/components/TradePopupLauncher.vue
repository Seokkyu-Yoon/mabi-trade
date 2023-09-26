<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { PopupEmitter, PopupMsg } from '@/application/popup.emitter'
import { Queue } from '@/application/queue'

const popupMsgQueue = new Queue<PopupMsg>()
const sidePopupListener = PopupEmitter.getInstance()

const popupMsgs = ref<PopupMsg[]>(popupMsgQueue.toArray())
const refPopupLauncher = ref<HTMLElement | null>(null)
const refPopupWrap = ref<HTMLElement | null>(null)

function hideMsgs(idxMsg1d: number) {
  popupMsgQueue.delete(idxMsg1d)
  popupMsgs.value = popupMsgQueue.toArray()
}

function onPopupMsg(popupMsg: PopupMsg) {
  popupMsgQueue.push(popupMsg)
  popupMsgs.value = popupMsgQueue.toArray()
}

function popWhileOverflow() {
  if (refPopupLauncher.value === null) return
  if (refPopupWrap.value === null) return
  if (refPopupLauncher.value.clientHeight >= refPopupWrap.value.clientHeight) {
    return
  }
  popupMsgQueue.pop()
  popupMsgs.value = popupMsgQueue.toArray()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key.toLowerCase() !== 'd') return
  hideMsgs(0)
}
onMounted(() => {
  sidePopupListener.on(onPopupMsg)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  sidePopupListener.off(onPopupMsg)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="refPopupLauncher" class="popup-launcher">
    <div ref="refPopupWrap" class="popup-wrap">
      <transition-group
        name="list"
        tag="div"
        mode="out-in"
        @enter="popWhileOverflow"
        @after-leave="popWhileOverflow"
      >
        <div
          class="popup"
          v-for="(popupMsg, idxMsg1d) in popupMsgs"
          :key="`msg-${popupMsg.id}`"
          @click="() => hideMsgs(idxMsg1d)"
        >
          <div class="header">
            <p>{{ popupMsg.title || '' }}</p>
          </div>
          <p
            v-for="(msg, idxMsg) in popupMsg.msgs"
            :key="`msg-${popupMsg.id}-${idxMsg}`"
          >
            {{ idxMsg + 1 }}. {{ msg }}
          </p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup-launcher {
  position: absolute;
  max-width: 40%;
  min-width: 30%;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  > .popup-wrap {
    width: 100%;
    padding: 10px 12px;

    > div {
      width: 100%;
      > .popup {
        width: 100%;
        margin: 6px 0 0 auto;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 4px 8px;
        gap: 4px;
        cursor: pointer;

        > .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          > button {
            padding: 8px;
            width: 15px;
            height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        > p {
          width: 100%;
          text-align: left;
          font-size: 12px;
          letter-spacing: -0.25px;
          white-space: pre-wrap;
        }
      }
    }
  }
}

.list-enter-active {
  transition: all 0.5s ease;
}
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
