<template>
  <div class="">
    <div class="font-medium my-2 border-b py-2">Tour Variants</div>
    <VeeFieldArray name="product_variants" class="space-y-6">
      <div class="space-y-8" v-for="(dataForm, index) in state">
        <CollapseForm :title="`Variant ${index + 1}`" open>
          <div class="space-y-6">
            <!-- name -->
            <UIFormTextFieldWLabel
              label="Nama"
              :name="`product_variants[${index}].name`"
              placeholder="Name"
              v-model="dataForm.name"
              class="input-bordered shadow-sm focus:outline-none"
              :useStarIcon="false"
            />
            <!-- end name -->

            <!-- price -->
            <UIFormInputNumber
              label="Harga IDR"
              :name="`product_variants[${index}].price`"
              placeholder="Price"
              v-model="dataForm.price"
              class="input-bordered shadow-sm focus:outline-none"
              :useStarIcon="false"
            />
            <!-- end price -->

            <!-- price -->
            <UIFormInputNumber
              label="Harga USD"
              :name="`product_variants[${index}].price_usd`"
              placeholder="Price"
              v-model="dataForm.usd_price"
              class="input-bordered shadow-sm focus:outline-none"
              :useStarIcon="false"
            />
            <!-- end price -->

            <!-- max person -->
            <UIFormInputNumber
              label="Max person"
              :name="`product_variants[${index}].max_person`"
              placeholder="Max person"
              v-model="dataForm.max_person"
              class="input-bordered shadow-sm focus:outline-none"
              :useStarIcon="false"
            />

            <!-- end max person -->

            <!-- desk -->
            <TabContent>
              <TabItem
                name="EN"
                group="description"
                checked
                :is-error="getErrors(`product_variants[${index}].description`)"
              >
                <UIFormGroup
                  label="Description"
                  :name="`product_variants[${index}].description`"
                >
                  <UIFormSpTextarea
                    :name="`product_variants[${index}].description`"
                    v-model="dataForm.description.en"
                    class="select-bordered"
                    placeholder="e.g. My Blog Description"
                  />
                </UIFormGroup>
              </TabItem>
              <TabItem
                name="ID"
                group="description"
                :is-error="
                  getErrors(`product_variants[${index}].id_description`)
                "
              >
                <UIFormGroup
                  label="(ID) Description"
                  :name="`product_variants[${index}].id_description`"
                >
                  <UIFormSpTextarea
                    :name="`product_variants[${index}].id_description`"
                    v-model="dataForm.description.id"
                    class="select-bordered"
                    placeholder="e.g. My Blog Description"
                  />
                </UIFormGroup>
              </TabItem>
            </TabContent>
            <!-- end desk -->

            <div class="hidden">
              <VeeField
                :name="`product_variants[${index}].description`"
                v-model="dataForm.description.en"
              />
              <VeeField
                :name="`product_variants[${index}].id_description`"
                v-model="dataForm.description.id"
              />
            </div>

            <div class="space-x-2">
              <button
                type="button"
                class="bg-error p-1 rounded-lg px-2 text-white hover:scale-95 transition-all duration-300"
                v-if="showRemoveButton"
                @click="removerVariant(index)"
              >
                <Icon name="i-heroicons-minus" class="h-4 w-4" />
              </button>
              <button
                type="button"
                v-if="showButtonAdd(index)"
                class="bg-primary p-1 rounded-lg px-2 text-white hover:scale-95 transition-all duration-300"
                @click="addProductVariant"
              >
                <Icon name="i-heroicons-plus" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </CollapseForm>
      </div>
    </VeeFieldArray>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";

const emit = defineEmits(["reload", "update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const state = ref([]);

watch(
  state,
  (value) => {
    emit("update:modelValue", value);
  },
  {
    deep: true,
    immediate: false,
  }
);

function getErrors(key) {
  return !!props.errors?.[key];
}

function addProductVariant() {
  state.value.push({
    name: "",
    price: "",
    description: {
      en: "",
      id: "",
    },
  });
}

const showRemoveButton = computed(() => {
  return state.value ? state.value.length > 1 : false;
});

function removerVariant(idx) {
  state.value?.splice(idx, 1);
}

function showButtonAdd(idx) {
  if (state.value?.length <= 0) return true;
  return idx === state.value?.length - 1;
}

onMounted(() => {
  state.value = props.modelValue;
});
</script>

<style scoped></style>
