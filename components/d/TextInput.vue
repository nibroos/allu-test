<script setup lang="ts">
import type { VAutocomplete } from "vuetify/components";
import type { SnackbarType } from "~/types/components/FormType";

type Variant = VAutocomplete["$props"]["variant"];
type Density = VAutocomplete["$props"]["density"];

interface IProps {
  disabled?: boolean;
  variant?: Variant;
  modelValue?: string | number | null | undefined;
  label?: string;
  density?: Density;
  clearable?: boolean;
  placeholder?: string;
  type?: string;
  parentClass?: string;
  class?: string;
  errors?: any[];
  replaceDetailsWithError?: boolean;
  initialValue?: string;
  readonly?: boolean;
  id?: string;
  disabledCopy?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  readonly: false,
  variant: "outlined",
  modelValue: "",
  label: "",
  density: "compact",
  clearable: true,
  placeholder: (props) => `Enter ${props.label} data`,
  type: "text",
  parentClass: "",
  class: "",
  errors: () => [],
  replaceDetailsWithError: false,
  initialValue: "",
  disabledCopy: true,
});

const realValue = ref(props.modelValue);

const slots = useSlots();

const emits = defineEmits(["update:modelValue"]);

const updateValue = (value: string) => {
  realValue.value = value;
  emits("update:modelValue", value);
};

const snackbar = ref<SnackbarType>({
  isOpen: false,
  text: "Text copied!",
  timeout: 2000,
});

const handleClick = () => {
  if (!!props.disabledCopy && !!props.disabled) {
    console.log("disabled", realValue.value);
    snackbar.value.isOpen = true;
    snackbar.value.text = `${realValue.value} copied to clipboard!`;

    navigator.clipboard.writeText(realValue.value as string);
  }
};

onMounted(() => {
  realValue.value = "";

  if (props.modelValue) {
    realValue.value = props.modelValue;
  }

  if (props.initialValue) {
    realValue.value = props.initialValue;
  }
});

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      realValue.value = newVal;
    }
  }
);

onBeforeUnmount(() => {
  snackbar.value.isOpen = false;
});
</script>
<template>
  <div
    :class="
      classMerge(
        slots.details || errors.length > 0 ? 'gap-1' : '',
        props.parentClass
      )
    "
    class="flex grow flex-col"
    @click="handleClick"
  >
    <v-text-field
      :id="props.id"
      :label="props.label"
      :variant="props.variant"
      v-model="realValue"
      :density="props.density"
      :placeholder="props.placeholder"
      :type="props.type"
      :class="
        classMerge(
          'w-full text-dark1 dark:text-primary1',
          disabled
            ? 'cursor-pointer bg-zinc-200 text-dark3 dark:bg-dark1 dark:text-primary1'
            : '',
          props.class
        )
      "
      :clearable="props.clearable"
      :disabled="props.disabled"
      @update:model-value="updateValue"
      hide-details
    >
      <slot :value="realValue"> </slot>
    </v-text-field>
    <div v-if="slots.details && errors.length == 0" class="flex flex-col gap-1">
      <slot name="details" />
    </div>
    <div
      class="flex flex-col gap-1 text-rose-500 text-sm"
      v-if="props.errors.length > 0 && !!props.errors[0]"
    >
      <slot name="errors" />
      <div v-for="error in errors" :key="error" class="text-sm">
        {{ error }}
      </div>
    </div>

    <v-snackbar v-model="snackbar.isOpen" :timeout="snackbar.timeout">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
