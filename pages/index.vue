<script setup lang="ts">
import useLayoutsStore from "~/stores/configs/LayoutsStore";

const layoutStore = useLayoutsStore();
const { titlePath, subTitlePath, lastPathSegment, parentTitle, topTitle } =
  storeToRefs(layoutStore);

const isDark = usePreferredDark();

// definePageMeta({
//   layout: "auth",
//   middleware: ["auth"],
// });
</script>

<template>
  <div>Dashboard Test</div>
</template>