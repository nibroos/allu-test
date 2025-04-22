<script setup lang="ts">
import useLayouts from "~/stores/configs/LayoutsStore";
import { useTopMenu } from "~/stores/masters/TopMenuStore";
import type { TopMenuPropType, TopMenuType } from "~/types/TopMenuType";
const router = useRouter();
const id = router.currentRoute.value.params.id;

const props = withDefaults(defineProps<TopMenuPropType>(), {
  topMenu: () => [] as TopMenuType[],
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

const handleChangeActiveTab = (value: number | string, link: string) => {
  isActiveTabIndex.value = value;
  navigateTo(link);
};

watchEffect(() => {
  filterPermissions();
});
onBeforeUnmount(() => {
  // console.log("oop", isActiveTabIndex.value);
});
</script>

<template>
  <div class="z-10 h-screen w-full bg-white dark:!bg-dark3 flex flex-col gap-3">
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
              item.number === isActiveTabIndex
                ? 'dark:!bg-dark2 hover:bg-scLightest dark:hover:bg-scDarker3 ease-in-out transition-all'
                : 'hover:!bg-primaryDarkest dark:hover:!bg-scDarker3 ease-in-out transition-all',
              '!mb-0'
            )
          "
          :active="item.number === isActiveTabIndex"
          :key="item.number"
          :value="item.number"
          @click="handleChangeActiveTab(item.number, item.link)"
        >
          <nuxt-link
            :class="[
              item.number === isActiveTabIndex
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

    <v-responsive>
      <div class="h-fit w-full">
        <slot />
      </div>
      <!-- <v-main> </v-main> -->
    </v-responsive>
  </div>
</template>
