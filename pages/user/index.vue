<template>
  <div class="max-w-7xl mx-auto">
    <button
      @click="$logout()"
      class="btn btn-primary"
    >logout</button>
  </div>
</template>

<script
  lang="ts"
  setup
>

const { $logout } = useAuth()

</script>

<style></style>