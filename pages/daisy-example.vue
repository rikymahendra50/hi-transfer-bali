<template>
  <div class="max-w-7xl space-y-4 mx-auto pb-10">
    <h1>Implement DaisyUI Example</h1>
    <section>
      <h3>Button</h3>

      <button class="btn">Button</button>
      <button class="btn btn-neutral">Neutral</button>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-ghost">Ghost</button>
      <button class="btn btn-link">Link</button>
    </section>
    <section>
      <h3>badge</h3>
      <div class="space-x-2 space-y-2">
        <div
          v-for="(name, index) in [
            '',
            'badge-primary',
            'badge-secondary',
            'badge-accent',
            'badge-ghost',
            'badge-info',
            'badge-success',
            'badge-warning',
            'badge-error',
          ]"
          class="badge"
          :class="name"
        >
          {{ name }} with long text example
        </div>
      </div>
    </section>
    <section class="space-y-4">
      <h3>Input</h3>
      <div class="space-y-2 grid grid-cols-1">
        <input
          v-for="(input, index) in [
            '',
            'input-primary',
            'input-secondary',
            'input-error',
            'input-warning',
            'input-success',
            'input-info',
          ]"
          :class="input"
          class="input input-bordered"
          placeholder="example of input"
        />
      </div>

      <h3>File Input</h3>
      <div class="space-y-2 grid grid-cols-1">
        <input
          v-for="(input, index) in [
            '',
            'file-input-primary',
            'file-input-secondary',
            'file-input-error',
            'file-input-warning',
            'file-input-success',
            'file-input-info',
          ]"
          :class="input"
          type="file"
          class="file-input file-input-bordered"
        />
      </div>

      <h3>Checkbox</h3>
      <div class="space-x-2">
        <input
          v-for="(input, index) in [
            '',
            'checkbox-primary',
            'checkbox-secondary',
            'checkbox-error',
            'checkbox-warning',
            'checkbox-success',
            'checkbox-info',
          ]"
          :class="input"
          type="checkbox"
          class="checkbox"
        />
      </div>

      <h3>Select</h3>

      <div class="space-y-2 grid grid-cols-1">
        <select
          v-for="(input, index) in [
            '',
            'select-primary',
            'select-secondary',
            'select-error',
            'select-warning',
            'select-success',
            'select-info',
          ]"
          :class="input"
          class="select select-bordered"
        >
          <option v-for="n in 10" :key="n">example input {{ n }}</option>
        </select>
      </div>

      <h3>Textarea</h3>

      <div class="space-y-2 grid grid-cols-1">
        <div
          v-for="(input, index) in [
            '',
            'textare-primary',
            'textare-secondary',
            'textare-error',
            'textare-warning',
            'textare-success',
            'textare-info',
          ]"
          :key="index"
        >
          <ClientOnly>
            <textarea :class="input" class="textarea textarea-bordered">
            </textarea>
          </ClientOnly>
        </div>
      </div>

      <h3>Collapse</h3>
      <div class="join join-vertical w-full">
        <div tabindex="0" class="join-item collapse collapse-arrow">
          <div class="collapse-title text-lg font-medium bg-base-200/40">
            Focus me to see content
          </div>
          <div class="collapse-content">
            <div class="h-20 py-2">
              tabindex="0" attribute is necessary to make the div focusable
            </div>
          </div>
        </div>
        <div tabindex="0" class="join-item collapse collapse-plus">
          <div class="collapse-title text-lg font-medium bg-base-200/40">
            Focus me to see content
          </div>
          <div class="collapse-content">
            <div class="h-20 py-2">
              tabindex="0" attribute is necessary to make the div focusable
            </div>
          </div>
        </div>
      </div>

      <h3>Notification</h3>
      <button
        class="btn btn-success"
        @click="exampleOfAddNotification('success')"
      >
        success
      </button>
      <button class="btn btn-error" @click="exampleOfAddNotification('error')">
        error
      </button>
      <button class="btn btn-info" @click="exampleOfAddNotification('info')">
        infor
      </button>
      <button
        class="btn btn-warning"
        @click="exampleOfAddNotification('warning')"
      >
        warning
      </button>
    </section>

    <div class="card card-compact bg-success">
      <div class="card-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis illum
        praesentium adipisci reprehenderit quam iure sit, delectus quisquam,
        voluptate ipsa odio, impedit doloribus? Ex inventore veniam corporis
        quaerat. Magnam, sint.
      </div>
    </div>

    <button class="btn" @click="modal = true">open modal</button>
    <ModalContainer v-model="modal">
      <div
        class="flex justify-between py-1 w-full px-3 mx-auto border-b-2 mb-1.5"
      >
        <div>hallo</div>
        <div>
          <div
            role="button"
            @click="modal = false"
            class="rounded-full bg-gray-200 h-5 w-5 flex items-center justify-center"
          >
            x
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <div class="skeleton h-96 w-full rounded-md"></div>
        <div class="grid grid-cols-[300px_1fr] gap-4">
          <div class="skeleton h-11 w-full rounded-md"></div>
          <div class="skeleton h-11 w-full rounded-md"></div>
        </div>
      </div>
    </ModalContainer>

    <section>
      <div
        class="overflow-x-auto rounded-lg h-[550px] scrollbar-thin scrollbar-thumb-gray-300/80 scrollbar-track-gray-100"
      >
        <table class="table table-md table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 20" key="n">
              <th>{{ n }}</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3>OTP Input</h3>
      <FormInputOTP name="otp" />
    </section>
    <section>
      <h3>Radio</h3>
      <input type="radio" name="radio-1" class="radio" />
      <input type="radio" name="radio-1" class="radio radio-primary" />
      <input type="radio" name="radio-1" class="radio radio-error" />
      <input type="radio" name="radio-1" class="radio radio-info" />
      <input type="radio" name="radio-1" class="radio radio-warning" />
      <input type="radio" name="radio-1" class="radio radio-success" />
      <input type="radio" name="radio-1" class="radio radio-accent" />
    </section>
    <section>
      <h3>Rating {{ ratingValue }}</h3>

      <div class="rating">
        <input
          type="radio"
          name="rating-2"
          class="rating-hidden"
          :value="undefined"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-orange-400"
          value="1"
          v-model="ratingValue"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-orange-400"
          checked
          v-model="ratingValue"
          value="2"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-orange-400"
          v-model="ratingValue"
          value="3"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-orange-400"
          v-model="ratingValue"
          value="4"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-orange-400"
          v-model="ratingValue"
          value="5"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { pushNotification } = useNotification();

const modal = ref(false);
const ratingValue = ref();

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
