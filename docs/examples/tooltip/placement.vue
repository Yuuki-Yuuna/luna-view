<template>
  <div class="row center">
    <lu-tooltip effect="dark" placement="top-start">
      <lu-button plain>top-start</lu-button>
      <template #content>这里是top-start提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="top">
      <lu-button plain>top</lu-button>
      <template #content>这里是top提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="top-end">
      <lu-button plain>top-end</lu-button>
      <template #content>这里是top-end提示</template>
    </lu-tooltip>
  </div>
  <div class="row">
    <lu-tooltip effect="dark" placement="left-start">
      <lu-button plain>left-start</lu-button>
      <template #content>这里是left-start提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="right-start">
      <lu-button plain>right-start</lu-button>
      <template #content>这里是right-start提示</template>
    </lu-tooltip>
  </div>
  <div class="row">
    <lu-tooltip effect="dark" placement="left">
      <lu-button plain>left</lu-button>
      <template #content>这里是left提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="right">
      <lu-button plain>right</lu-button>
      <template #content>这里是right提示</template>
    </lu-tooltip>
  </div>
  <div class="row">
    <lu-tooltip effect="dark" placement="left-end">
      <lu-button plain>left-end</lu-button>
      <template #content>这里是left-end提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="right-end">
      <lu-button plain>right-end</lu-button>
      <template #content>这里是right-end提示</template>
    </lu-tooltip>
  </div>
  <div class="row center">
    <lu-tooltip effect="dark" placement="bottom-start">
      <lu-button plain>bottom-start</lu-button>
      <template #content>这里是bottom-start提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="bottom">
      <lu-button plain>bottom</lu-button>
      <template #content>这里是bottom提示</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="bottom-end">
      <lu-button plain>bottom-end</lu-button>
      <template #content>这里是bottom-end提示</template>
    </lu-tooltip>
  </div>
</template>

<script setup lang="ts">
import { LuButton, LuTooltip } from 'luna-view'
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.row + .row {
  margin-top: 12px;
}

.center {
  justify-content: center;
}
</style>
