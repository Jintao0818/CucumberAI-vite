<script setup>
const settings = settingStore()
const { modeValue, characterValue, compressionSize } = storeToRefs(settings)
const data = dataStore()

const changeMode = () => {
  characterValue.value = []
}

onMounted(() => {
  data.active = 'settings'
})
</script>

<template>
  <!-- 设置 -->
  <var-space direction="column" :size="[14, 0]">
    <var-cell style="color: #888888" border> Necessary Settings</var-cell>
    <var-select
      class="select"
      variant="outlined"
      placeholder="Mode"
      v-model="modeValue"
      @change="changeMode"
    >
      <var-option label="fruit" />
      <var-option label="pulp" />
    </var-select>
    <var-select
      class="select"
      variant="outlined"
      placeholder="Characteristics"
      v-model="characterValue"
      :rules="[(v) => v.length >= 1 || 'choose 1 at least']"
      v-if="modeValue === 'fruit'"
      chip
      multiple
      ><var-option label="fruit shape" />
      <var-option label="color & texture" />
      <var-option label="stripe" />
      <var-option label="tumor" />
    </var-select>
    <var-select
      class="select"
      variant="outlined"
      placeholder="Characteristics"
      v-model="characterValue"
      :rules="[(v) => v.length >= 1 || 'choose 1 at least']"
      v-else-if="modeValue === 'pulp'"
      chip
      multiple
      ><var-option label="pulp shape" />
      <var-option label="flesh & heart" />
    </var-select>
    <var-select
      class="select"
      variant="outlined"
      placeholder="Characteristics"
      disabled
      v-else
    >
    </var-select>
    <var-cell style="color: #888888" border> Others</var-cell>
    <var-select
      class="select"
      variant="outlined"
      placeholder="Image Compression Size(KB)"
      v-model="compressionSize"
      ><var-option label="320" />
      <var-option label="640" />
      <var-option label="1024" />
      <var-option label="1536" />
      <var-option label="2048" />
    </var-select>
  </var-space>
</template>

<style lang="scss" scoped>
.select {
  width: 90vw;
  margin: 0 auto;
}
</style>
