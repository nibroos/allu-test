<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const initialTheme = () => {
  const isPreferredDark = usePreferredDark();

  if (isPreferredDark.value) {
    theme.global.name.value = "dark";
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    theme.global.name.value = "light";
    localStorage.setItem("theme", "light");
  }
};

onMounted(() => {
  initialTheme();
});
</script>
<template>
  <slot />
</template>