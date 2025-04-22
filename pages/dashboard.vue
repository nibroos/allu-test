<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

useHead({
  title: "Dashboard",
});
</script>

<template>
  <div>Dashboard</div>
</template>