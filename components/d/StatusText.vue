<script setup lang="ts">
interface IProps {
  value?: string;
  class?: string;
  parentClass?: string;
  colors?: string[];
  capitalize?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  value: "",
  class: "",
  parentClass: "",
  colors: () => [],
  capitalize: false,
});

const processColor = ref(
  "bg-yellow-100 text-yellow-700 border !border-yellow-700"
);
// ['Order', 'Process', 'Shipping', 'Invoice', 'Finish', 'Cancel', 'Pending', 'Production']);
const initialColors = ref([
  {
    name: "Hold",
    code: "bg-zinc-200 text-zinc-600 border !border-zinc-200",
  },
  {
    name: "Planning",
    code: "bg-yellow-100 text-yellow-700 border !border-yellow-700",
  },
  {
    name: "Order",
    code: "bg-yellow-100 text-yellow-700 border !border-yellow-700",
  },
  {
    name: "Process",
    code: "bg-sky-100 text-sky-700 border !border-sky-700",
  },
  {
    name: "Procsess",
    code: "bg-sky-100 text-sky-700 border !border-sky-700",
  },
  {
    name: "Unpaid",
    code: "bg-orange-100 text-orange-700 border !border-orange-700",
  },
  {
    name: "Partial",
    code: "bg-amber-100 text-amber-700 border !border-amber-700",
  },
  {
    name: "production",
    code: "bg-indigo-100 text-indigo-700 border !border-indigo-700",
  },
  {
    name: "Shipping",
    code: "bg-fuchsia-100 text-fuchsia-700 border !border-fuchsia-700",
  },
  {
    name: "Invoice",
    code: "bg-blue-100 text-blue-700 border !border-blue-700",
  },
  {
    name: "Finish",
    code: "bg-teal-100 text-teal-700 border !border-teal-700",
  },
  {
    name: "Paid",
    code: "bg-emerald-100 text-emerald-700 border !border-emerald-700",
  },
  {
    name: "Cancel",
    code: "bg-rose-100 text-rose-700 border !border-rose-700",
  },
  {
    name: "1",
    code: "bg-green-100 text-green-700 border !border-green-700",
  },
  {
    name: "0",
    code: "bg-rose-100 text-rose-700 border !border-rose-700",
  },
]);

const dynamicClass = computed(() => ({
  [props.class]: true,
}));

const finalClass = ref("");
const status = ref("");
const colorFound = ref({
  name: "",
  code: "",
});

watchEffect(() => {
  if (!!props.value) {
    const color = initialColors.value.find(
      (c) => c.name.toLowerCase() === props.value.toLowerCase()
    );
    status.value = props.value;
    colorFound.value = color as { name: string; code: string };
    finalClass.value = color ? color.code : processColor.value;
  }

  if (!!props.capitalize) {
    status.value = capitalizeEachWord(status.value);
  }
});
</script>

<template>
  <div class="flex items-center justify-center">
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
