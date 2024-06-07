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

      <UIFormGroup
        name="password"
        label="Password"
      >
        <UIFormTextField
          name="name"
          v-model="text"
          bordered
          type="password"
          placeholder="Enter Name"
        >
          <template #rightSection>
            <Icon name="i-heroicons-lock-closed" />
          </template>
        </UIFormTextField>
        <template #descriptionTop>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam accusamus totam ipsam possimus reiciendis
          necessitatibus veniam ad recusandae, sint deleniti, tempore, repellendus molestiae eligendi perspiciatis in
          eum aspernatur a sapiente.
        </template>
      </UIFormGroup>

      <UIFormTextField
        name="name"
        v-model="text"
        type="search"
        placeholder="Enter Name"
      >
        <template #leftSection>
          <Icon name="i-heroicons-magnifying-glass" />
        </template>
      </UIFormTextField>

      <UIFormTextField
        name="name"
        v-model="text"
        type="search"
        variant="primary"
        placeholder="Enter Name"
      >
        <template #leftSection>
          <Icon name="i-heroicons-magnifying-glass" />
        </template>
      </UIFormTextField>

      <UIFormTextField
        name="name"
        v-model="text"
        type="search"
        variant="secondary"
        placeholder="Enter Name"
      >
        <template #leftSection>
          <Icon name="i-heroicons-magnifying-glass" />
        </template>
      </UIFormTextField>

      <UIFormTextField
        name="name"
        v-model="text"
        type="search"
        variant="info"
        placeholder="Enter Name"
      >
        <template #leftSection>
          <Icon name="i-heroicons-magnifying-glass" />
        </template>
      </UIFormTextField>

      <UIFormTextarea
        name="textarea"
        v-model="textarea"
        cols="30"
        rows="8"
        placeholder="Example of gobro"
      ></UIFormTextarea>

    </div>


    <button
      class="btn"
      @click="modal = true"
    >open modal</button>
    <UIModal
      v-model="modal"
      close-able
    >

      <div class="space-y-4 ">
        <div class="skeleton h-96 w-full rounded-md"></div>
        <div class="grid grid-cols-2 gap-4">
          <div class="skeleton h-11 w-full rounded-md"></div>
          <div class="skeleton h-11 w-full rounded-md"></div>
        </div>
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nobis, molestias soluta similique earum minus sequi
      porro aliquam. Accusamus quaerat animi, similique necessitatibus recusandae doloribus dolore. Consequatur quos
      eveniet voluptatum!
      <template #actions>
        <UIBtn>Cancel</UIBtn>
        <UIBtn variant="primary">Submit</UIBtn>
      </template>
    </UIModal>
  </UIContainer>
</template>

<script setup lang="ts">
const { pushNotification } = useNotification();

const modal = ref(false);
const ratingValue = ref();
const toggle = ref(false);
const togglex = ref(false);
const text = ref("")
const textarea = ref("")

const toggleXexample = ref(false)

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
