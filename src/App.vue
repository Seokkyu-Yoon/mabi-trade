<script setup lang="ts">
import TradeVue from '@/views/Trade.vue'
import HelpVue from '@/views/Help.vue'

import { onMounted, onUnmounted, ref } from 'vue'

const refHelp = ref<typeof HelpVue | null>(null)
onMounted(() => {
  window.ipcRenderer.on('event:help', showHelp)
})
onUnmounted(() => {
  window.ipcRenderer.off('event:help', showHelp)
})
function showHelp() {
  refHelp.value?.open()
}
</script>

<template>
  <help-vue ref="refHelp" />
  <trade-vue />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
  user-select: none;
}

*:focus {
  outline: none;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;
}

ul,
li {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

h1 {
  font: inherit;
}

button {
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
  font-family: 'Noto Sans KR', sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #6aa1f1;
  border: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: #eee;
  border-radius: 10px;
}

#app {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #333;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

*[visible='false'] {
  display: none !important;
}
</style>
