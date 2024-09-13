<template>
  <div class="flex flex-col space-y-6">
    <div class="flex justify-between items-center">
      <div>Menampilkan 7 mobil</div>
      <div>
        <UIFormMGroup name="sort" label="Urut berdasarkan">
          <UIFormMSelect
            v-model="filter.sort"
            name="sort"
            className="w-[150px] py-2 outline-none"
          >
            <option value="">Semua</option>
            <option value="price">Price</option>
          </UIFormMSelect>
        </UIFormMGroup>
      </div>
    </div>

    <div class="space-y-4">
      <div v-if="dataExample.length > 0">
        <VehicleCard
          v-for="item in data?.data"
          :name="item.name"
          :image="item.image"
          :price="item.price"
          :facilities="item.facilities"
          :maxPerson="item.max_person"
          :key="item.id"
        />
      </div>
      <Empty
        v-else
        description="Maaf, kami tidak dapat menemukan mobil yang tersedia pada jadwal yang kamu inginkan. <br class='hidden md:block' /> Coba pilih tanggal yang lain."
      />
    </div>
  </div>
</template>

<script setup>
const { loading, transformErrors } = useRequestHelper();
const { requestOptions } = useRequestOptions();
const router = useRouter();
const route = useRoute();

useHead({
  title: "Vehicle",
});

const param = ref();
const page = ref(1);

const filter = ref({
  sort: "",
});

const dataExample = ref([
  {
    id: 1,
  },
]);

const { data, error, refresh } = await useAsyncData("cars", () =>
  $fetch(`/cars?sort=${filter.value.sort}`, {
    method: "post",
    ...requestOptions,
  })
);

watch(
  () => filter.value.sort,
  (newValue, oldValue) => {
    refresh();
    replaceWindow();
  }
);

onMounted(() => {
  if (route.query.page) {
    page.value = route.query.page;
  }

  if (route.query.sort) {
    filter.value.sort = route.query.sort;
  }
});

function replaceWindow() {
  let filters = [];
  // if (selectedLocation.value) {
  //   filters.push(`destinations=${selectedLocation.value}`);
  // }
  // if (selectedCategory.value) {
  //   filters.push(`category=${selectedCategory.value}`);
  // }
  if (filter.value.sort) {
    filters.push(`sort=${filter.value.sort}`);
  }

  const queryString = filters.join("&");
  const url = `/vehicles?page?page=${page.value}${
    queryString ? `&${queryString}` : ""
  }`;

  router.replace(url);
}
</script>

<style lang="scss" scoped></style>
