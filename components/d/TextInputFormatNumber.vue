<script setup lang="ts">
import type { VAutocomplete } from 'vuetify/components'
import { useNumber } from '~/composables/useNumber'
const { formatNumberSeparator } = useNumber
type Variant = VAutocomplete['$props']['variant']
type Density = VAutocomplete['$props']['density']

interface IProps {
  disabled?: boolean
  variant?: Variant
  modelValue?: string | number
  label?: string
  density?: Density
  clearable?: boolean
  placeholder?: string
  type?: string
  class?: string
  errors?: any[]
  replaceDetailsWithError?: boolean
  initialValue?: string
  readonly?: boolean
  minPrecision?: number
  maxPrecision?: number
}
const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  readonly: false,
  variant: 'outlined',
  modelValue: '',
  label: '',
  density: 'compact',
  clearable: true,
  placeholder: (props) => `Enter ${props.label} data`,
  type: 'text',
  class: '',
  errors: () => [],
  replaceDetailsWithError: false,
  initialValue: '',
  minPrecision: 3,
  maxPrecision: 3
})

const realValue = ref(props.modelValue)

const slots = useSlots()

const emits = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  realValue.value = formatNumberSeparator(
    value,
    props.minPrecision,
    props.maxPrecision
  )
  emits('update:modelValue', value)
}

onMounted(() => {
  realValue.value = ''

  if (props.modelValue) {
    realValue.value = formatNumberSeparator(
      props.modelValue,
      props.minPrecision,
      props.maxPrecision
    )
  }

  if (props.initialValue) {
    realValue.value = formatNumberSeparator(
      props.initialValue,
      props.minPrecision,
      props.maxPrecision
    )
  }
})

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      realValue.value = formatNumberSeparator(
        newVal,
        props.minPrecision,
        props.maxPrecision
      )
    }
  }
)
</script>
<template>
  <div
    :class="{ 'gap-2': slots.details || errors.length > 0 }"
    class="flex grow flex-col"
  >
    <v-text-field
      v-model="realValue"
      :label="props.label"
      :variant="props.variant"
      :density="props.density"
      :placeholder="props.placeholder"
      :type="props.type"
      :class="classMerge('w-full', props.class)"
      :clearable="props.clearable"
      :disabled="props.disabled"
      hide-details
      @update:model-value="updateValue"
    ></v-text-field>
    <div
      v-if="slots.details && errors.length == 0"
      class="flex flex-col gap-1"
    >
      <slot name="details" />
    </div>
    <div class="flex flex-col gap-1">
      <div
        v-for="error in errors"
        :key="error"
        class="text-sm text-red-500"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>
