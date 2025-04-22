<script setup lang="ts">
import useRocketStore from "~/stores/RocketStore";

const rocketStore = useRocketStore();
const { metaModal, filters, loading, form, isOpenModal } =
  storeToRefs(rocketStore);

const headers = [
  {
    title: "Image",
    key: "flickr_images",
    sortable: true,
  },
  {
    title: "Name",
    value: "name",
    sortable: true,
  },
  {
    title: "Description",
    value: "description",
    sortable: false,
  },
];

const onDoubleClick = async (event: any, row: any) => {
  console.log("dbclick", row.item);

  navigateTo(`/rockets/${row.item.id}`);
};

const fetchDataServerFetch = async (options: {
  page: number;
  sortBy: [
    {
      key: string;
      order: string;
    }
  ];
  itemsPerPage: number;
}) => {
  filters.value.qListIndex.query.page = options.page;
  filters.value.qListIndex.query.per_page = options.itemsPerPage;

  if (options.sortBy.length > 0) {
    filters.value.qListIndex.query.order_column = options.sortBy[0].key;
    filters.value.qListIndex.query.order_direction = options.sortBy[0].order;
  } else {
    filters.value.qListIndex.query.order_column = "";
    filters.value.qListIndex.query.order_direction = "";
  }

  await rocketStore.indexRocket();
};

const filtersAttribute = [
  {
    key: "name",
    title: "Name",
    type: "text",
  },
  {
    key: "description",
    title: "Description",
    type: "text",
  },
  {
    key: "start_date",
    title: "Start Date",
    type: "date",
  },
  {
    key: "end_date",
    title: "End Date",
    type: "date",
  },
  {
    key: "payloads",
    title: "Payloads",
    type: "autocomplete",
    others: {
      api: "/v4/payloads/query",
      itemValue: "id",
      itemTitle: "name",
      mappingDetail: "",
      innerSearchKey: "search",
      itemsProp: "docs",
      pageEndProp: "nextPage",
      methodApi: "post",
      singleApi: "v4/payloads",
      multiple: false,
      returnObject: true,
      itemColor: "",
      query: {
        page: 1,
        per_page: 10,
      },
    },
  },
];

const formInputs = [
  {
    key: "name",
    title: "Name",
    type: "text",
  },
  {
    key: "description",
    title: "Description",
    type: "textarea",
  },
];

onMounted(async () => {
  Promise.all([
    rocketStore.indexRocket(),
    // rocketStore.show()
  ]);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-2/3 flex flex-col gap-3">
      <h1 class="text-center text-3xl font-bold">Rocket List</h1>

      <form
        :class="classMerge('flex flex-col gap-2 p-3')"
        @submit.prevent="rocketStore.indexRocket()"
      >
        <div
          :class="
            classMerge(
              'grid grid-cols-5 gap-2 items-center sm:grid-cols-1 md:grid-cols-2'
            )
          "
        >
          <div v-for="(filter, index) in filtersAttribute" :key="index">
            <d-text-input
              v-if="filter.type === 'text'"
              v-model="filters.qListIndex[filter.key]"
              :label="filter.title"
            />
            <d-date-picker-light
              v-else-if="filter.type === 'date'"
              v-model="filters.qListIndex[filter.key]"
              :label="filter.title"
            />
            <d-autocomplete
              v-else-if="filter.type === 'autocomplete'"
              v-model="filters.qListIndex[filter.key]"
              :label="filter.title"
              :api="filter.others?.api"
              :item-value="filter.others?.itemValue"
              :item-title="filter.others?.itemTitle"
              :mapping-detail="(filter.others?.mappingDetail as string)"
              :inner-search-key="filter.others?.innerSearchKey"
              :items-prop="filter.others?.itemsProp"
              :page-end-prop="filter.others?.pageEndProp"
              :method-api="filter.others?.methodApi"
              :single-api="filter.others?.singleApi"
              :multiple="filter.others?.multiple"
              :return-object="filter.others?.returnObject"
              :item-color="filter.others?.itemColor"
              :query="filter.others?.query"
            />
          </div>

          <d-text-input
            v-model="filters.qListIndex.query.global"
            label="Global Search"
            :placeholder="'Search by name, description, etc.'"
            append-inner-icon="mdi-magnify"
            parent-class=""
          />
          <d-switch-status
            v-model="filters.qListIndex.failState"
            label="Fail State"
          />
        </div>
        <div :class="classMerge('grid grid-cols-7 items-center gap-2 w-full')">
          <d-submit-button
            @click:submit="rocketStore.indexRocket()"
            @click:clear="rocketStore.cleanFilters()"
            class="col-span-4 md:col-span-full"
          >
            <template #append>
              <d-bt
                @click="isOpenModal.create = true"
                class="flex items-center grow whitespace-nowrap !border-solid border-scDarker text-scDarker dark:text-primary1 dark:hover:bg-scDarker dark:bg-scDarker3 dark:border-scDarker font-bold justify-center gap-1 rounded-lg tracking-normal bg-primaryDarker hover:bg-primaryDarkest border-1.5 p-2 transition-all ease-in-out"
                cta="Create"
                no-icon
              />
            </template>
          </d-submit-button>
        </div>
      </form>
      <v-data-table-server
        v-model:page="filters.qListIndex.page"
        :items="metaModal.filteredIndex ?? metaModal.index.docs ?? []"
        :headers="headers"
        :items-per-page="filters.qListIndex.per_page"
        :items-length="metaModal.index.totalDocs ?? 0"
        :items-per-page-options="useInitials.perPageOptions"
        :loading="loading.index"
        density="compact"
        :header-props="{
          class: '!bg-scLightest dark:!bg-dark2 whitespace-nowrap',
        }"
        :row-props="{
          class: 'cursor-pointer whitespace-nowrap',
        }"
        item-value="id"
        show-current-page
        @update:options="fetchDataServerFetch"
        fixed-header
        height="500"
        hover
        :no-data-text="'Snap! Rocket not Found'"
        :loading-text="'Incoming Rockets...'"
        @dblclick:row="onDoubleClick"
      >
        <template #item.flickr_images="{ item }">
          <div class="flex items-center justify-center">
            <v-img
              v-for="(image, index) in item.flickr_images"
              :key="index"
              :src="image"
              class="w-16 h-16 rounded-lg object-cover"
            />
          </div>
        </template>
      </v-data-table-server>
    </div>
  </div>

  <modals-final-modal
    :is-open="isOpenModal.create"
    size="xl"
    custom-class="overflow-y-auto"
    parent-class="!z-[1500]"
    label="New Rocket"
    @update:is-open="isOpenModal.create = $event"
  >
    <template #top>
      <form
        class="grid grid-cols-5 w-full flex-row items-center gap-2"
        @submit.prevent="rocketStore.store()"
      >
        <div v-for="(input, index) in formInputs" :key="index">
          <d-text-input
            v-if="input.type === 'text'"
            :key="input.key"
            v-model="form[input.key]"
            :label="input.title"
            :placeholder="input.title"
            append-inner-icon="mdi-magnify"
          />
          <d-text-area-input
            v-if="input.type === 'textarea'"
            :key="input.key"
            v-model="form[input.key]"
            :label="input.title"
            :placeholder="input.title"
            append-inner-icon="mdi-magnify"
          />
        </div>

        <d-submit-button
          @click:submit="rocketStore.store()"
          @click:clear="rocketStore.clearForm()"
          class="grid-cols-1"
          submit-text="Create"
          icon-submit="mdi-content-save"
        />
      </form>
    </template>
  </modals-final-modal>
</template>