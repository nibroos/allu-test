<script setup lang="ts">
type IProps = {
  value?: number;
  class?: string;
  parentClass?: string;
  colors?: string[];
  capitalize?: boolean;
  labels?: LabelsType[];
};

type LabelsType = {
  code: number;
  name: string;
  color?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  value: 0,
  class: "",
  parentClass: "",
  colors: () => [],
  capitalize: false,
  labels: () => [],
});

const defaultColor = "bg-rose-100 text-rose-700 border !border-rose-700";
const initialColors = ref([
  {
    code: 1,
    name: "Active",
    color:
      "bg-green-100 dark:bg-dark2 text-green-700 dark:text-green-400 border !border-green-700",
  },
  {
    code: 0,
    name: "Inactive",
    color:
      "bg-rose-100 dark:bg-dark2 text-rose-700 dark:text-rose-400 border !border-rose-700",
  },
]);

const finalClass = ref("");
const status = ref<string>();
const colorFound = ref({
  name: "",
  color: "",
});

const changeColor = (newVal: number) => {
  if (props.labels.length > 0) {
    props.labels.forEach((label) => {
      initialColors.value.forEach((color, iColor) => {
        if (color.code === label.code) {
          let combined = {
            ...color,
            ...label,
          };

          initialColors.value[iColor] = combined;
        }
      });
    });
  }

  const color = initialColors.value.find((c) => c.code === newVal);
  status.value = color?.name;
  colorFound.value = color as { name: string; color: string };
  finalClass.value = color ? color.color : defaultColor;
};

// watch(
//   () => props.value,
//   (oldVal, newVal) => {
//     if (oldVal != newVal && newVal !== undefined) {
//       changeColor(newVal);
//     }
//   },
//   { immediate: true, deep: true }
// );

watchEffect(() => {
  // if (props.value) {
  changeColor(props.value);
  // }
});
</script>

<template>
  <div class="flex items-center">
    <div
      :class="
        classMerge(
          'w-max rounded-full px-2 py-0.5 text-sm',
          finalClass,
          props.class
        )
      "
    >
      {{ status }}
    </div>
  </div>
</template>
