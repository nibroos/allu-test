<script setup lang="ts">
interface IProps {
  parentPath?: string
  cta?: string
  noIcon?: boolean
  class?: string | string[]
  textClass?: string | string[]
  noText?: boolean
  noParent?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  parentPath: '/orders/sales-order',
  cta: 'Back',
  noIcon: false,
  class: '',
  textClass: 'text-black',
  noText: false,
  noParent: false,
  type: 'submit'
})

const routerPush = () => {
  if (props.noParent) return
  navigateTo(props.parentPath)
}
</script>

<template>
  <button
    v-if="props.type === 'submit'"
    :class="
      classMerge(
        'flex cursor-pointer items-center gap-x-2 border-solid p-2 transition-all ease-in-out hover:bg-zinc-100 sm:gap-x-1 md:gap-x-2',
        props.class
      )
    "
    @click="routerPush()"
  >
    <v-icon
      icon="mdi-keyboard-backspace"
      size="25"
      v-if="!props.noIcon"
    />
    <div
      v-if="!props.noText"
      :class="classMerge('font-medium', props.textClass)"
    >
      {{ props.cta }}
    </div>
  </button>
  <div
    v-else
    :class="
      classMerge(
        'flex cursor-pointer items-center gap-x-2 border-solid p-2 transition-all ease-in-out hover:bg-zinc-100 sm:gap-x-1 md:gap-x-2',
        props.class
      )
    "
    @click="routerPush()"
  >
    <v-icon
      icon="mdi-keyboard-backspace"
      size="25"
      v-if="!props.noIcon"
    />
    <div
      v-if="!props.noText"
      :class="classMerge('font-medium', props.textClass)"
    >
      {{ props.cta }}
    </div>
  </div>
</template>
