<template>
  <UIContainer class="space-y-4 pb-10">
    <h1>Implement DaisyUI Example</h1>
    <section>
      <h3>Button</h3>
      <UIBtn>Hallo</UIBtn>
      <UIBtn
        variant="primary"
        shape="square"
        size="md"
      >
        <Icon
          name="i-heroicons-plus"
          class="w-4 h-4"
        />
      </UIBtn>
      <UIBtn variant="secondary">Secondary</UIBtn>

      <UIBtn
        variant="secondary"
        loading
      >Secondary</UIBtn>
    </section>

    <div class="max-w-md space-y-2">
      <UIFormTextField
        name="name"
        v-model="text"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="address"
        v-model="address"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />
      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />


      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />

      <UIFormTextField
        name="name_last"
        v-model="name"
        bordered
        placeholder="Enter Name"
      />



    </div>

  </UIContainer>



</template>

<script setup lang="ts">
const { pushNotification } = useNotification();

const modal = ref(false);
const ratingValue = ref();
const toggle = ref(false);
const togglex = ref(false);
const text = ref("")
const name = ref("")

const address = ref("")
const textarea = ref("")

const exampleToggle = ref();

const exampleRadio = ref("")

const exampleSelect = ref("")

const checkboxExample = ref([])

const toggleXexample = ref(false)

const inputkeyBoard = ref("abse")

function onChange(value: string) {
  inputkeyBoard.value = value
}



function exampleOfAddNotification(
  type: "success" | "error" | "warning" | "info"
) {
  pushNotification({
    type: type,
    title: "payment success",
    text: "This is an example of notification have long confisiion  the before after go halo fhan makd",
  });

}

useHead({
  title: "DaisyUI Example",
});
</script>

<style lang="scss" scoped></style>
