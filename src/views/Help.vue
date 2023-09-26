<script setup lang="ts">
import PopupVue from '@/components/Popup.vue'
import { ref } from 'vue'

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
</script>

<template>
  <popup-vue ref="refPopup">
    <div class="help">
      <h1>💡 도움말</h1>
      <div class="con">
        <div>
          <p class="tit">- 단축키 설명</p>
          <p>F1 - 현재 나타난 팝업을 보여줍니다.</p>
          <p>
            D - 상세 교역품 정보를 알려주는 팝업 중 맨 위에 있는 요소를
            닫습니다.
          </p>
          <p>Ctrl + Q / Cmd + Q - 프로그램을 종료합니다.</p>
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
