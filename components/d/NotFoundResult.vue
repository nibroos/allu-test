<script setup lang="ts">
import { classMerge } from '~/utils/strings'
// import {normalizeClass}
interface IProps {
  class?: string | string[]
  bulletClass?: string | string[]
  listClass?: string | string[]
  titleClass?: string | string[]
  list?: string[]
  title?: string
  response?: string
  responseList?: string[]
}

const props = withDefaults(defineProps<IProps>(), {
  class: '',
  bulletClass: '',
  listClass: '',
  titleClass: '',
  list: () => [
    'Periksa kata kunci pencarian',
    'Periksa filter wajib yang belum diisi',
  ],
  title: 'Data tidak ditemukan, silahkan atur filter pencarian...'
})

</script>

<template>
  <div :class="classMerge('text-zinc-400 text-lg', props.class)">
    <slot name="title" :class="classMerge(props.titleClass)">
      <h1 class="font-bold">{{ title }}</h1>
    </slot>
    <slot name="list" :class="classMerge(props.listClass)">
      <ul :class="classMerge('list-disc list-inside text-left', props.listClass)">
        <li v-for="item in list" :key="item" :class="bulletClass">{{ item }}</li>
        <li v-for="item in responseList" :key="item" :class="bulletClass">{{ item }}</li>
      </ul>
    </slot>
  </div>
</template>
