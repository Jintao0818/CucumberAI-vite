<script setup>
const data = dataStore()
const activeStep = ref(0)
function next() {
  activeStep.value = (activeStep.value + 1) % 3
}
onMounted(() => {
  data.active = 'instruction'
})
</script>

<template>
  <!-- 使用指南 -->
  <var-space direction="column" :size="[14, 0]">
    <var-cell style="color: #888888" border>Sample image</var-cell>
    <var-card
      class="sample-img"
      title="Fruit Image"
      description="A cleaner black background is needed, with the green card on top and the cucumber on the bottom, with the cucumber handle facing left and the tip facing right horizontally."
      src="/img/mobile/sample.png"
      ripple
    />
    <var-cell style="color: #888888" border>Steps</var-cell>
    <var-steps direction="vertical" :active="activeStep" class="step-bar">
      <var-step>
        Select a mode and one character at least on 'Settings' page.
      </var-step>
      <var-step>
        Press the button on 'Home' page to take a photo and edit it, when
        finished it will be automatically uploaded and analyzed.Please wait
        patiently.
      </var-step>
      <var-step>Resulting images and tables will be displayed.</var-step>
    </var-steps>
    <var-button class="common" type="primary" block @click="next"
      >Next
    </var-button>
  </var-space>
</template>

<style lang="scss" scoped>
.sample-img {
  width: 90vw;
  margin: 0 auto;
}

.step-bar {
  width: 90vw;
  margin: 0 auto;
  .var-step:not(:last-of-type) {
    margin-bottom: 3vw;
  }
}

.common {
  width: 90vw;
  margin: 0 auto;
}
</style>
