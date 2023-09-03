<script setup>
const router = useRouter()
</script>

<template>
  <div class="result">
    <var-result
      type="error"
      title="404 Not Found"
      description="Sorry, the page you visited does not exist."
    >
      <template #footer>
        <var-button type="danger" @click="router.go(-1)">Back</var-button>
      </template>
    </var-result>
  </div>
</template>

<style scoped>
.result {
  width: 100vw !important;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
