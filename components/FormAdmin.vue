<template>
  <div>
    <VeeForm @submit="onSubmit">
      <div class="flex flex-col space-y-2">
        <Alert v-model="message" :type="alertType" />

        <UIFormGroup name="first_name" label="First Name">
          <UIFormTextField
            name="first_name"
            v-model="dataForm.first_name"
            class="input-bordered"
            placeholder="ex:John"
          />
        </UIFormGroup>

        <UIFormGroup name="last_name" label="Last Name">
          <UIFormTextField
            name="last_name"
            v-model="dataForm.last_name"
            class="input-bordered"
            placeholder="ex:Doe"
          />
        </UIFormGroup>

        <UIFormGroup name="email" label="Email">
          <UIFormTextField
            name="email"
            v-model="dataForm.email"
            class="input-bordered"
            placeholder="ex:myemail@gmail.com"
          />
        </UIFormGroup>

        <!-- <UIFormGroup name="phone" label="Phone">
          <UIFormTextField
            name="phone"
            v-model="dataForm.phone"
            class="input-bordered"
            placeholder="ex: +1 555 555 5555"
          />
        </UIFormGroup> -->

        <div class="h-2"></div>

        <template v-if="!isEditMode">
          <UIFormGroup name="password" label="Password">
            <UIFormTextField
              name="password"
              v-model="dataForm.password"
              class="input-bordered"
              type="password"
              placeholder="********"
            />
          </UIFormGroup>

          <UIFormGroup name="confirm_password" label="Confirm Password">
            <UIFormTextField
              name="confirm_password"
              v-model="dataForm.confirm_password"
              class="input-bordered"
              type="password"
              placeholder="********"
            />
          </UIFormGroup>
        </template>

        <!-- <div class="p-2 border rounded-lg space-y-4">
          <div>Permission</div>
          <div
            v-for="(item, index) in dataForm.permissions"
            :key="index"
            class="grid grid-cols-1 lg:grid-cols-[1fr_1fr_30px] gap-4"
          >
            <UIFormGroup
              label="Permission Feature"
              :name="`permissions[${index}].feature_id`"
            >
              <UIFormSelectSp
                :name="`permissions[${index}].feature_id`"
                class="select-bordered"
                v-model="item.feature_id"
              >
                <option value="">Select Feature</option>
                <option
                  :value="feature.id.toString()"
                  v-for="feature in adminFeature"
                  :key="feature.id"
                  :disabled="
                    allFeaturesSelected.includes(feature.id.toString())
                  "
                  class="capitalize"
                >
                  {{ feature.name }}
                </option>
              </UIFormSelectSp>
            </UIFormGroup>
            <UIFormGroup
              label="Permission Type"
              :name="`permissions[${index}].type`"
            >
              <UIFormSelectSp
                :name="`permissions[${index}].type`"
                class="select-bordered"
                v-model="item.type"
              >
                <option value="">Select Type</option>
                <option value="full">Full</option>
                <option value="view">View</option>
              </UIFormSelectSp>
            </UIFormGroup>
            <div
              class="flex justify-end lg:justify-center lg:flex-col lg:items-center"
            >
              <div class="h-6 hidden lg:block"></div>
              <div>
                <button
                  v-if="index > 0"
                  @click="removePermission(index)"
                  type="button"
                  class="bg-error disabled:opacity-80 p-1 px-2 rounded text-white"
                >
                  <Icon name="i-heroicons-minus" class="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <div>
              <button
                @click="addMorePermission"
                type="button"
                class="bg-primary p-1 px-2 rounded text-white"
              >
                <Icon name="i-heroicons-plus" class="h-3 w-3" />
              </button>
            </div>
          </div>
        </div> -->

        <div>
          <div class="form-control">
            <VeeField
              name="is_active"
              v-slot="{ field }"
              :value="dataForm.is_active"
            >
              <label class="label cursor-pointer">
                <input
                  type="checkbox"
                  class="toggle"
                  :true-value="1"
                  :false-value="0"
                  v-model="dataForm.is_active"
                  v-bind="field"
                />
                <span class="label-text">{{
                  dataForm.is_active ? "Active" : "Inactive"
                }}</span>
              </label>
            </VeeField>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            :loading="loading"
            :disabled="loading"
          >
            Submit
          </button>
        </div>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ user: { type: [String, Number, Array, Object] } });

const emit = defineEmits<{
  (e: "reload"): void;
}>();

function reload() {
  emit("reload");
}

const {
  dataForm,
  onSubmit,
  loading,
  message,
  alertType,
  selectedItem,
  adminFeature,
  isEditMode,
  // addMorePermission,
  // removePermission,
  allFeaturesSelected,
} = useAdmin({
  callback: reload,
});

onMounted(async () => {
  if (props.user) {
    dataForm.value.first_name = props.user.first_name;
    dataForm.value.last_name = props.user.last_name;
    dataForm.value.email = props.user.email;
    dataForm.value.phone = props.user?.phone ?? "";
    dataForm.value.is_active = props.user.is_active;

    selectedItem.value = props.user;

    // if (props.user.permissions.length > 0) {
    //   dataForm.value.permissions = props.user.permissions.map((el) => {
    //     return {
    //       id: el.id,
    //       feature_id: el.feature_id.toString(),
    //       type: el.type,
    //     };
    //   }) ?? [
    //     {
    //       feature_id: "",
    //       type: "",
    //     },
    //   ];
    // }
  }
});
</script>

<style scoped></style>
