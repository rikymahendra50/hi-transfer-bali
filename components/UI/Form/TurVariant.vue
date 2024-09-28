<template>
  <div class="">
    <div class="font-medium my-2 border-b py-2">Tour Variants</div>
    <VeeFieldArray
      name="product_variants"
      class="space-y-6 border-2 border-red-600"
    >
      <div class="space-y-8" v-for="(dataForm, index) in state" :key="index">
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
              label="Harga"
              :name="`product_variants[${index}].price`"
              placeholder="Price"
              v-model="dataForm.price"
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

            <!-- {{ typeof dataForm.max_person }} -->
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

            <div v-if="showRemoveButton">
              <button
                @click="removerVariant(index)"
                class="btn btn-base border-red-500 bg-transparent border text-red-500 mt-2"
              >
                Remove Variant
              </button>
            </div>
          </div>
        </CollapseForm>
      </div>
      <div v-if="showButtonAdd(state.length - 1)">
        <button
          @click="addProductVariant"
          class="btn btn-base border-primary bg-transparent border text-primary mt-2"
        >
          Tambah Variant
        </button>
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
