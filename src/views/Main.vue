<script setup lang="ts">
import { RouterView } from 'vue-router'
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
  <div class="main">
    <tab-controller v-model:name="tab" />
    <div class="items">test</div>
  </div>
</template>

<style scoped lang="scss"></style>
