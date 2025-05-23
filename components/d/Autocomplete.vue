<script setup lang="ts">
import type { VAutocomplete } from "vuetify/components";
import type { AutocompleteType } from "~/types/AutocompleteType";
import qs from "qs";
import { property, debounce } from "lodash-es";

import { useMyFetch } from "~/composables/useMyFetch";

const props = withDefaults(defineProps<AutocompleteType>(), {
  disabled: false,
  variant: "outlined",
  items: () => [],
  label: undefined,
  itemTitle: "title",
  itemValue: "value",
  hideDetails: "auto",
  density: "compact",
  itemsProp: "data",
  pageEndProp: "next_page_url",
  api: "", // /api/master/customers/index
  singleApi: "", // /api/master/customer/show/{id}
  mappingDetail: "data",
  displaySelectedTitleKey: "name",
  isGetSingle: true,
  query: (): any => ({} as any),
  innerSearchKey: "search",
  clearable: true,
  aClass: "text-dark1 dark:text-primary1",
  uid: "id",
  initialValue: "",
  disableInitialLoad: false,
  methodApi: "get",
  methodDetailApi: "get",
  placeholder: (props) => `Select/search ${props.label}` || "Select/Search",
  chips: false,
  maxLengthDisplay: 16,
  startAlignDisplay: "left",
  multiple: false,
  hideDisplayTitle: true,
  initialLoadSingle: false,
  isSingleClient: false,
  isDisplayMultipleKey: false,
  displayMultipleKeys: () => ["id", "name"],
  displayMultipleSeparator: " - ",
  checkDuplicate: false,
  returnObject: false,
  itemColor: "brown",
  errors: () => [],
});

const fetch = useMyFetch();
const vAComp = ref<VAutocomplete>();
const shadowTab = ref<HTMLElement>();
const page = ref<number>(1);
const loadingData = ref<boolean>(false);
const loadingSearch = ref<boolean>(false);
const paginationDone = ref<boolean>(false);
const isFocused = ref<boolean>(false);
const isReadOnly = ref<boolean>(false);
const isMenuShow = ref<boolean>(false);
const innerSearch = useDebouncedRef<string>("");
const queryString = ref<string>("");
const selectedDetails = ref<any>(undefined);
const options = ref<any[]>(props.items);
const displayTitle = ref<string>("");
const onMountedTrigger = ref<boolean>(false);
const isInitialLoad = ref<boolean>(false);
const isInitialLoadQuery = ref<boolean>(false);
const initialQuery = ref<any>({});
const initialLoadSingle = ref<boolean>(false);
const returnObject = ref<boolean>(props.returnObject);
const isLoadingGetSingle = ref<boolean>(false);
const isDuplicate = ref<boolean>(props.checkDuplicate);
let queryObject = ref<any>({});
let queryObjectSingle = ref<any>({});

initialQuery.value = props.query;

const convertQuery = (searchValue?: string): string => {
  // filter, copy all key and value from query props, except (page) query
  for (const key in props.query) {
    if (key !== "page") {
      queryObject.value[key as string] =
        props.query[key as keyof typeof props.query];
    }
  }

  // add search key to query object
  queryObject.value[props.innerSearchKey] = searchValue || innerSearch.value;

  // convert query object to query string
  queryString.value = qs.stringify(queryObject.value);

  return qs.stringify(queryString);
};

// watch(innerSearch, async (searchValue: string, oldSearchValue: string) => {
const debouncedSearch = debounce(
  async (searchValue: string, oldSearchValue: string) => {
    if (!props.api) return;

    if (isMenuShow.value) {
      loadingSearch.value = true;
      convertQuery(searchValue);

      let response;
      let apiUrl;

      if (searchValue !== oldSearchValue) {
        page.value = 1;
      }

      if (props.methodApi === "post") {
        queryObject.value.page = page.value;
        response = await useMyFetch()
          .post(props.api, queryObject.value)
          .finally(() => {
            loadingSearch.value = false;
            isInitialLoad.value = false;
          });
      } else {
        apiUrl = `${props.api}?${queryString.value}&page=${page.value}`;
        response = await useMyFetch()
          .get(apiUrl)
          .finally(() => {
            loadingSearch.value = false;
            isInitialLoad.value = false;
          });
      }

      const resData = response.data;

      console.log("resData", resData);

      options.value = <any[]>property(props.itemsProp)(resData);
      paginationDone.value = !property(props.pageEndProp)(resData);
      page.value = 1;
      loadingSearch.value = false;
    }
  },
  600
);

watch(innerSearch, debouncedSearch);

watch(
  () => props.query,
  (newValue, oldValue) => {
    let newValStr = JSON.stringify(newValue);
    let oldValStr = JSON.stringify(oldValue);

    if (newValStr !== oldValStr) {
      page.value = 1;
      options.value = [];
      useDebouncedRef(getList(), 100);
    }
  }
);

const getDisplayMultipleKeys = (item: any) => {
  if (!props.isDisplayMultipleKey) return;

  let displayLabel = props.displayMultipleKeys
    .map((key) => {
      return item[key];
    })
    .join(props.displayMultipleSeparator);

  // console.log('displayLabel', displayLabel)

  return displayLabel;
};

const selected = ref<any>(undefined);
const onIntersect = (isIntersecting: boolean): void => {
  if (isIntersecting && !loadingData.value && !loadingSearch.value) {
    page.value++;
    useDebouncedRef(getList(), 100);
  }
};

const getList = async () => {
  if (!props.api) return;

  loadingData.value = true;

  convertQuery();

  let apiUrl;
  let response;
  let statusCode = 200;

  if (props.methodApi === "post") {
    queryObject.value.page = page.value;
    // try {
    response = await useMyFetch()
      .post(props.api, queryObject.value)
      .catch((err) => {
        statusCode = err?.response?.status;
        console.log(err, "Failed to fetch list data");
      })
      .finally(() => {
        loadingData.value = false;
        isInitialLoad.value = false;
      });
  } else {
    apiUrl = `${props.api}?${queryString.value}&page=${page.value}`;
    response = await useMyFetch()
      .get(apiUrl)
      .finally(() => {
        loadingData.value = false;
        isInitialLoad.value = false;
      });
  }

  isInitialLoad.value = false;

  if (statusCode !== 200) {
    loadingData.value = false;
    loadingSearch.value = false;

    options.value = [];
    return;
  }

  const resData = response?.data;
  const newData = <any[]>property(props.itemsProp)(resData);
  // options.value = []
  options.value = [...options.value, ...(newData ?? [])];
  // make the options unique depending on the uid
  options.value = options.value
    .map((item) => item[props.uid])
    .map((item, index, self) =>
      self.indexOf(item) === index ? options.value[index] : null
    )
    .filter((item) => item !== null);
  // if (isDuplicate.value) {
  //   console.log("in");
  //   options.value = removeDuplicates(options.value)
  // }

  emit("after:fetch", options.value);

  paginationDone.value = !property(props.pageEndProp)(resData);
  loadingData.value = false;
};

const removeDuplicates = (array: any) => {
  const uniqueIds = new Set();
  return array.filter((item: any) => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true;
    }
    return false;
  });
};

const multipleSelectedDetails = ref<any[]>([]);

const getTitleOnMultiSelected = (id: any) => {
  let displayTitle;
  multipleSelectedDetails.value.forEach((item: any) => {
    if (item[props.itemValue as string] === id) {
      displayTitle = item[props.itemTitle];
    }
  });

  return displayTitle;
};

const getSingleData = async (id: any) => {
  if (!props.singleApi) return;
  let apiUrl;
  let response;

  if (props.methodApi === "post") {
    convertQuery();
    queryObjectSingle.value = cloneObject(queryObject.value);

    queryObjectSingle.value.page = 1;
    queryObjectSingle.value.id = id;

    if (!props.multiple) {
      response = await useMyFetch().post(
        props.singleApi,
        queryObjectSingle.value
      );
    } else {
      let queryObjectMultipleSingle = {
        ids: selected.value,
      };

      apiUrl = `${props.singleApi}`;
      response = await useMyFetch().post(apiUrl, queryObjectMultipleSingle);

      multipleSelectedDetails.value = <any[]>(
        property(props.mappingDetail)(response.data)
      );
    }
    delete queryObjectSingle.value.id;
  } else {
    if (props.multiple) {
      // if multiple, get the value of itemValue
      let ids = id.map((item: any) => item[props.itemValue as any]);

      apiUrl = `${props.singleApi}`;
      response = await useMyFetch().get(apiUrl, {
        params: {
          [props.itemValue ?? ("id" as any)]: ids,
        },
      });
    } else {
      apiUrl = `${props.singleApi}/${id}`;
      response = await useMyFetch().get(apiUrl);
    }
  }

  const resData = response.data;
  selectedDetails.value = property(props.mappingDetail)(resData);

  if (Array.isArray(selectedDetails.value)) {
    if (props.multiple) {
      selectedDetails.value = selectedDetails.value.map((item: any) => {
        return item[props.itemTitle];
      });
    } else {
      // console.log('props.itemValue', id, props.itemValue);

      selectedDetails.value = selectedDetails.value.find(
        (item: any) => item[props.itemValue as string] == id
      );
      // console.log('selectedDetails', selectedDetails.value)

      // selectedDetails.value = selectedDetails.value[0]
    }
  }

  if (selectedDetails.value) {
    if (props.multiple) {
      displayTitle.value = selectedDetails.value.join(", ");
    } else {
      // console.log('a selectedDetails', selectedDetails.value)

      displayTitle.value = <any>(
        property(props.displaySelectedTitleKey)(selectedDetails.value)
      );

      if (!!props.isDisplayMultipleKey) {
        displayTitle.value = <string>(
          getDisplayMultipleKeys(selectedDetails.value)
        );
      }
    }
  }

  emit("click:selected", selectedDetails.value);
};

const emit = defineEmits([
  "update:modelValue",
  "click:clear",
  "click:selected",
  "after:fetch",
]);

const onSelectOpt = (param?: string) => {
  if (!selected.value) {
    selected.value = null;
    useDebouncedRef(getList(), 100);
  }

  if (!!param) {
    getSingleData(param);
  }

  emit("update:modelValue", selected.value);
};

const onSelectOptSingleClient = () => {
  selectedDetails.value = options.value.find(
    (item: any) => item[props.itemValue as string] === selected.value
  );

  if (selectedDetails.value) {
    displayTitle.value = <any>property(props.itemTitle)(selectedDetails.value);
  }

  emit("update:modelValue", selected.value);
};

const onMenuChange = (menuState: boolean) => {
  isMenuShow.value = menuState;
};

const onFocus = (focusState: boolean) => {
  isFocused.value = focusState;
  if (focusState) {
    innerSearch.value = "";

    if (!isInitialLoad.value && !props.disableInitialLoad) {
      isInitialLoad.value = true;
      useDebouncedRef(getList(), 100);
    }
  }
};

const handleClear = async () => {
  options.value = [];
  await useDebouncedRef(getList(), 100);
  emit("click:clear");
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      selected.value = null;
      displayTitle.value = "";
    }
  }
);

onMounted(() => {
  if (props.modelValue) {
    selected.value = props.modelValue;
  }

  if (props.initialValue) {
    selected.value = props.initialValue;
  }

  if (!props.disableInitialLoad) {
    useDebouncedRef(getList(), 100);
  }

  if (props.multiple) {
    returnObject.value = true;
  }
});

watchEffect(() => {
  if (
    !!props.modelValue &&
    !!props.singleApi &&
    !!props.isGetSingle &&
    !initialLoadSingle.value &&
    !props.isSingleClient
  ) {
    if (!!initialLoadSingle.value) return;

    selected.value = props.modelValue;
    initialLoadSingle.value = true;
    getSingleData(props.modelValue);
  }

  selected.value = props.modelValue;
});

watch(
  () => selected.value,
  (newValue, oldValue) => {
    if (newValue != oldValue && !!newValue) {
      if (!selected.value) {
        selected.value = null;
        useDebouncedRef(getList(), 100);
      }

      if (!!newValue && !props.isSingleClient) {
        getSingleData(newValue);
      }

      if (!!newValue && props.isSingleClient) {
        onSelectOptSingleClient();
      }
    }

    emit("update:modelValue", selected.value);
  }
);
</script>

<template>
  <div class="flex flex-col gap-1">
    <v-autocomplete
      ref="vAComp"
      v-model="selected"
      :items="options"
      :item-title="props.itemTitle"
      :item-value="props.itemValue"
      :variant="props.variant"
      :label="props.label"
      :placeholder="props.placeholder"
      :density="props.density"
      :chips="props.chips"
      :list-props="{ slim: true }"
      no-filter
      :loading="loadingSearch"
      @update:search="innerSearch = $event"
      @update:menu="onMenuChange"
      :focused="isFocused"
      @update:focused="onFocus"
      :readonly="isReadOnly"
      :clearable="props.disabled ? false : props.clearable"
      @click:clear="handleClear"
      :disabled="props.disabled"
      :class="classMerge('text-dark1 dark:text-primary1', props.aClass)"
      :multiple="props.multiple"
      :return-object="props.returnObject"
      :hide-details="props.hideDetails"
      :item-color="props.itemColor"
    >
      <template v-slot:append-item>
        <div
          v-if="!paginationDone && !!api && options.length > 0"
          v-intersect="onIntersect"
          class="pa-4 teal--text"
        >
          Loading more items ...
        </div>
      </template>
      <template v-slot:selection="{ item, index }">
        <span class="whitespace-nowrap">
          <div v-if="props.multiple">
            <d-shorttext
              :text="getTitleOnMultiSelected(item.value)"
              :max-length="Number(props.maxLengthDisplay)"
              :class="props.aClass"
              :start-align="props.startAlignDisplay"
            />
            <span v-if="selected.length > 1 && selected.length - 1 !== index">
              ,
            </span>
          </div>
          <d-shorttext
            v-else
            :text="
              displayTitle || getDisplayMultipleKeys(item.raw) || item.title
            "
            :max-length="Number(props.maxLengthDisplay)"
            :class="props.aClass"
            :start-align="props.startAlignDisplay"
          />
        </span>
      </template>

      <template #no-data>
        <div
          v-if="!loadingSearch && !isInitialLoad && options.length === 0"
          class="font-weight-bold flex items-center justify-center p-3 text-center"
        >
          <div>No data available, please try another keyword..</div>
        </div>
        <div v-else-if="loadingSearch || isInitialLoad">
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
        </div>
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item
          v-bind="props"
          :title="getDisplayMultipleKeys(item.raw) || item.title"
        ></v-list-item>
      </template>

      <!-- 
    <template
      #item="{ item }"
      v-if="props.multiple"
    >
      <d-shorttext
        :text="displayTitle"
        :max-length="Number(props.maxLengthDisplay)"
        :class="props.aClass"
        :start-align="props.startAlignDisplay"
      />
    </template> -->
    </v-autocomplete>
    <div v-if="props.errors.length > 0 && !!props.errors[0]">
      <div
        class="flex flex-col gap-1 text-rose-500 text-sm text-left justify-start"
      >
        <slot name="errors" />
        <div v-for="error in props.errors" :key="error" class="text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
