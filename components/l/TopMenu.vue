<script setup lang="ts">
import useLayouts from "~/stores/configs/LayoutsStore";
import { useTopMenu } from "~/stores/masters/TopMenuStore";
import type { TopMenuPropType, TopMenuType } from "~/types/TopMenuType";

const emit = defineEmits(["update:parentLink"]);

const props = withDefaults(defineProps<TopMenuPropType>(), {
  topMenu: () => [] as TopMenuType[],
  parentLink: () => "" as string,
});

const listItem = ref(props.topMenu);

onMounted(() => {
  listItem.value = props.topMenu;
});

definePageMeta({
  layout: "auth",
});

const layoutState = useLayouts();
const { titlePath, subTitlePath, lastPathSegment, parentTitle, topTitle } =
  storeToRefs(layoutState);
const topMenuStore = useTopMenu();
const { isActiveTabIndex } = storeToRefs(topMenuStore);

const configs = ref({
  titlePath: titlePath,
  subTitlePath: subTitlePath,
  lastPathSegment: lastPathSegment,
  parentTitle: "Master",
  topTitle: topTitle,
});

// const isActiveLink = (item: any) => {
//   if (isActiveTabIndex.value === item.number) {
//     return true
//   }
// }

const filterPermissions = () => {
  let newList: any = [];

  listItem.value.forEach((item: any, index: any) => {
    if (item.permissions) {
      if (useAuth.permit(item.permissions)) {
        newList.push(item);
      }
    }
  });

  listItem.value = newList;
};

const handleChangeActiveTab = (value: string, link: string) => {
  isActiveTabIndex.value = value;
  navigateTo(link);
};

const route = useRoute();

const isActive = (item: TopMenuType): boolean => {
  if (item.link == route.path) {
    return true;
  }

  if (item.parent_link == props.parent_link) {
    return true;
  }

  if (props.parent_link == item.link) {
    return true;
  }

  if (route.path?.includes(item.number)) {
    return true;
  }

  return false;
};

const currentActiveTab = ref<Record<string, any>>({});

const getCurrentActiveTab = () => {
  listItem.value.forEach((item: any) => {
    if (isActive(item)) {
      currentActiveTab.value = item;
      emit("update:parentLink", item.parent_link);
    }
  });
};

watchEffect(() => {
  filterPermissions();
});

onMounted(() => {
  getCurrentActiveTab();
  // layoutState.defineTitlePath(configs.value);
});
</script>

<template>
  <div
    class="h-max w-full overflow-auto rounded-lg border-2 border-solid border-zinc-300 dark:border-dark1"
    v-if="listItem.length > 0"
  >
    <v-list
      nav
      density="compact"
      class="flex flex-row dark:!bg-dark3 !p-0 items-center !mt-0"
      item-value="number"
      color="brown"
      :items="listItem"
    >
      <v-list-item
        v-for="(item, i) in listItem"
        :class="
          classMerge(
            isActive(item)
              ? 'dark:!bg-dark2 hover:bg-scLightest dark:hover:bg-scDarker3 ease-in-out transition-all'
              : 'hover:!bg-primaryDarkest dark:hover:!bg-scDarker3 ease-in-out transition-all',
            '!mb-0'
          )
        "
        :active="isActive(item)"
        :key="item.number"
        :value="item.number"
        @click="handleChangeActiveTab(item.number, item.link)"
      >
        <nuxt-link
          :class="[
            isActive(item)
              ? 'text-scDarker dark:text-scLighter'
              : 'text-zinc-500 dark:text-zinc-400',
          ]"
          class="flex items-center justify-center gap-1 rounded-lg tracking-normal"
          :to="item.link"
        >
          <v-icon :icon="item.icon" size="24"></v-icon>
          <div class="text-sm capitalize">{{ item.title }}</div>
        </nuxt-link>
      </v-list-item>
    </v-list>
  </div>
</template>
