<template>
  <footer class="footer footer-center p-10 bg-base-200 text-base-content">
    <UIContainer>
      <aside>
        <p class="font-bold">
          Sp Digital
        </p>
        <p>Copyright © {{ fullYear }} - All right reserved</p>
      </aside>
    </UIContainer>

  </footer>
</template>

<script lang="ts" setup>
const fullYear = new Date().getFullYear();
</script>

<style></style>