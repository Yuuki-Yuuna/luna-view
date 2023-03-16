<template>
  <div class="vp-tips">
    <img :src="`/tip-${name}.webp`" :style="imgStyle" />
    <div ref="wrapperRef" class="content-wrapper">
      <div ref="contentRef" class="content">
        <div class="arrow"></div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

import type { CSSProperties } from 'vue'

const props = defineProps<{ name: string }>()

const wrapperRef = ref<HTMLDivElement>()
const contentRef = ref<HTMLDivElement>()

const imgStyle = ref<CSSProperties>({})

useResizeObserver(wrapperRef, () => {
  const content = unref(contentRef)!
  const style = unref(imgStyle)
  style.marginTop = `${content.clientHeight / 2}px`
})
</script>

<style lang="scss">
.vp-tips {
  display: flex;
  margin: 24px 0;

  .content-wrapper {
    flex: 1;

    .content {
      position: relative;
      padding: 10px 12px;
      margin-right: 50px;
      border: 1px solid var(--lu-border-color);
      border-radius: 6px;
      background-color: var(--lu-bg-color-overlay);

      p {
        margin: 12px 0;
      }

      @media (max-width: 640px) {
        font-size: 12px;
        margin-right: 0;

        p {
          line-height: 20px;
          margin: 8px 0;
        }
      }

      .arrow {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 16px 8px 0 8px;
        border-top-color: var(--lu-border-color);
        transform: translateY(75%);
        rotate: 45deg;

        &::after {
          content: '';
          position: absolute;
          top: -18.2px;
          left: -8px;
          border: solid transparent;
          border-width: 16px 8px 0 8px;
          border-top-color: var(--lu-bg-color-overlay);
        }
      }
    }
  }

  img {
    object-fit: cover;
    max-width: 30%;
  }
}
</style>
