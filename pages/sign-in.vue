<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold mb-4">Sign In</h1>
        <div
          class="grid grid-cols-1 w-[350px] text-left gap-2 p-4 rounded-md shadow"
        >
          <FormGroup label="Email" name="email">
            <VeeField
              type="email"
              name="email"
              placeholder="ex:myemail@gmail.com"
              class="input input-bordered"
            />
            <div class="form-error-message">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo laborum
            </div>
            <template #descriptionBottom>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
              assumenda perferendis maiores consequatur magni
            </template>
          </FormGroup>
          <FormGroup label="Password" name="password">
            <VeeField
              type="password"
              name="password"
              placeholder="ex:myemail@gmail.com"
              class="input input-bordered"
            />
            <div class="form-error-message">Password is required.</div>
          </FormGroup>
          <div>
            <button class="btn btn-success">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
