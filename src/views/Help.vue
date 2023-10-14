<script setup lang="ts">
import PopupVue from '@/components/Popup.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const refPopup = ref<typeof PopupVue | null>(null)
function open() {
  refPopup.value?.open()
}
function close() {
  refPopup.value?.close()
}

defineExpose<{
  open: typeof open
  close: typeof close
}>({
  open,
  close,
})

function onKeydown(e: KeyboardEvent) {
  if (!refPopup.value) return
  if (!refPopup.value?.isShowing()) return
  const key = e.key.toLowerCase()
  if (key === 'escape') {
    close()
    return
  }
  if (key === 'enter') {
    close()
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
  <popup-vue ref="refPopup">
    <div class="help">
      <h1>💡 도움말</h1>
      <div class="con">
        <div>
          <p class="tit">- 단축키(전체)</p>
          <p>F1 - 현재 보이는 도움말을 보여줍니다.</p>
          <p>Ctrl + ← / Cmd + ← - 왼쪽 탭으로 전환합니다.</p>
          <p>Ctrl + → / Cmd + → - 오른쪽 탭으로 전환합니다.</p>

          <p class="tit">-단축키(물물 교역소)</p>
          <p>Ctrl + R / Cmd + R - 주간 교역 정보를 초기화합니다.</p>
          <p>Ctrl + X - 맨 위에 있는 상세 교역품 정보를 알림을 닫습니다.</p>

          <p class="tit">- 단축키(교역 시뮬레이션)</p>
          <p>Ctrl + R / Cmd + R - 주간 교역 정보를 초기화합니다.</p>
          <p>Ctrl + X - 맨 위에 있는 상세 교역품 정보를 알림을 닫습니다.</p>
          <p>
            Ctrl + S / Cmd + S - 주간 교역 정보에 시뮬레이션 정보를 추가합니다.
          </p>
          <p>Ctrl + D / Cmd + D - 시뮬레이션 정보를 초기화합니다.</p>

          <p class="tit">- 단축키(수익 시뮬레이션)</p>
          <p>Ctrl + A / Cmd + A - 교역품을 추가합니다.</p>
          <p>Ctrl + D / Cmd + D - 시뮬레이션 정보를 초기화합니다.</p>

          <p class="tit">- 단축키(팝업)</p>
          <p>Enter - 해당 작업을 진행합니다.</p>
          <p>ESC - 해당 작업을 취소합니다.</p>
        </div>
      </div>
    </div>
  </popup-vue>
</template>

<style lang="scss" scoped>
.help {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.75px;
  }

  > .con {
    flex: 1;
    padding-right: 12px;
    overflow: auto;

    > div {
      margin-top: 10px;
      color: #333;

      > p {
        font-size: 14px;
        letter-spacing: -0.35px;
        &.tit {
          font-weight: 600;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
