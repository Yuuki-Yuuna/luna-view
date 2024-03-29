<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription"></p>
    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />
      <LuDivider />
      <div class="op-btns">
        <LuTooltip :show-arrow="false" effect="dark">
          <span class="icon" @click="copyCode">
            <copy-icon />
          </span>
          <template #content>复制</template>
        </LuTooltip>
        <LuTooltip :show-arrow="false" effect="dark">
          <span class="icon" @click="sourceVisible = !sourceVisible">
            <code-block-icon />
          </span>
          <template #content>查看代码</template>
        </LuTooltip>
      </div>
      <LuCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </LuCollapseTransition>
      <Transition name="el-fade-in-linear">
        <div v-show="sourceVisible" class="example-float-control" @click="sourceVisible = false">
          <span class="icon">
            <arrow-up-icon />
          </span>
          <span>收起代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'
import copyIcon from './icon/copy-icon.vue'
import codeBlockIcon from './icon/code-block-icon.vue'
import arrowUpIcon from './icon/arrow-up-icon.vue'
import { LuDivider, LuCollapseTransition, LuTooltip, LuMessage } from '@luna-view/components'

type DemosType = { [key: string]: any }

const props = defineProps<{
  demos: DemosType
  source: string
  path: string
  rawSource: string
  description: string
}>()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false
})

const formatPathDemos = computed(() => {
  const demos: DemosType = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../examples/', '').replace('.vue', '')] = props.demos[key].default
  })

  return demos
})
const decodedDescription = computed(() => decodeURIComponent(props.description))
const sourceVisible = ref(false)

const copyCode = async () => {
  if (isSupported) {
    try {
      await copy()
      LuMessage.success('复制成功！')
    } catch (error) {
      LuMessage.error('复制失败！')
    }
  }
}
</script>

<style scoped lang="scss">
.example {
  border: 1px solid var(--lu-border-color);
  border-radius: var(--lu-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .icon {
      margin: 0 2px;
      cursor: pointer;
      fill: var(--lu-text-color-regular);

      &:hover {
        fill: var(--lu-text-color-placeholder);
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--lu-border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--lu-bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--lu-text-color-regular);
    fill: var(--lu-text-color-regular);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--lu-color-primary-first);
      fill: var(--lu-color-primary-first);
    }
  }
}
</style>
