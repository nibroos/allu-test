<script setup lang="ts">
import useRocketStore from "~/stores/RocketStore";

const rocketStore = useRocketStore();
const { metaModal, filters, loading, form, isOpenModal } =
  storeToRefs(rocketStore);

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

const router = useRouter();

onMounted(async () => {
  form.value.id = (router.currentRoute.value.params.id as string) || "";
  Promise.all([rocketStore.show()]);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-4/5 flex flex-col gap-3">
      <div>
        <v-carousel height="400" progress="brown" class="pt-2">
          <v-carousel-item
            v-for="(rocket, index) in form.flickr_images"
            :key="index"
          >
            <div class="flex gap-2 pt-2">
              <v-img
                :key="index"
                :src="rocket"
                class="w-1/2 h-[30rem] object-cover"
                cover
                :aspect-ratio="1"
              />
            </div>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex gap-2 items-center">
          <d-back parent-path="/" cta="" />
          <h1 class="text-7xl font-bold">{{ form.name }}</h1>
        </div>
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-bold">Rocket Details</h1>
          <div class="flex flex-col gap-2">
            <p class="text-lg text-justify capitalize">
              <span class="font-bold">Rocket Type:</span>
              {{ form.type }}
            </p>
            <p class="text-lg text-justify">
              <span class="font-bold">Rocket Height:</span>
              {{ form.height?.meters ?? 0 }} m
            </p>
            <p class="text-lg text-justify">
              <span class="font-bold">Rocket Diameter:</span>
              {{ form.diameter?.meters ?? 0 }} m
            </p>
            <p class="text-lg text-justify">
              <span class="font-bold">Rocket Mass:</span>
              {{ form.mass?.kg ?? 0 }} kg
            </p>
            <!-- cost per launch, country, first flight -->

            <p class="text-lg text-justify">
              <span class="font-bold">Cost per Launch:</span>
              {{ form.cost_per_launch ?? 0 }}
            </p>
            <p class="text-lg text-justify">
              <span class="font-bold">Country:</span>
              {{ form.country }}
            </p>
          </div>
          <p class="text-lg text-justify">{{ form.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>