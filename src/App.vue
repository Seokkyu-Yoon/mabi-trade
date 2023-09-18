<script setup lang="ts">
import {
  TAB_ALL,
  TAB_OASIS,
  TAB_KARU_FOREST,
  TAB_KALIDA_LAKE,
  TAB_PERA_VOLCANO,
} from '@/application/tab.name'

import TabController from '@/components/TabController.vue'
import { ref } from 'vue'

const tab = ref(TAB_ALL)
</script>

<template>
  <tab-controller v-model:name="tab" />
  <div class="items">test</div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
  outline-style: none;
  outline: none;
}
</style>
@/application/tab.name
