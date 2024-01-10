<script setup>
const visible = ref(false)
const current = ref(0)

const openSamples = () => {
  visible.value = true
}

const handleOk = (e) => {
  visible.value = false
}

defineExpose({
  openSamples
})
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="Click to download sample images"
    @ok="handleOk"
    class="modal"
    :width="710"
  >
    <a-space>
      <a download="fruit_sample.jpg" href="/img/main/fruit_sample.JPG">
        <a-card hoverable style="width: 330px" @click="download">
          <template #cover>
            <a-image :preview="false" src="/img/main/fruit_sample.JPG" />
          </template>
          <a-card-meta title="Fruit Image">
            <template #description>upload it under fruit mode</template>
          </a-card-meta>
        </a-card>
      </a>

      <a download="pulp_sample.jpg" href="/img/main/pulp_sample.JPG">
        <a-card hoverable style="width: 330px" @click="download">
          <template #cover>
            <a-image :preview="false" src="/img/main/pulp_sample.JPG" />
          </template>
          <a-card-meta title="Fulp Image">
            <template #description>upload it under pulp mode</template>
          </a-card-meta>
        </a-card>
      </a>
    </a-space>
  </a-modal>
</template>

<style scoped></style>
