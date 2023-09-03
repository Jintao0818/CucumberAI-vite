<script setup>
const visible = ref(false)
const current = ref(0)

const openInstruction = () => {
  visible.value = true
}

const handleOk = (e) => {
  visible.value = false
}

defineExpose({
  openInstruction
})

const steps = [
  {
    title: 'Select a mode',
    content:
      'Make sure that the uploaded image corresponds to the selected one.',
    img: '/img/main/mode.png'
  },
  {
    title: 'Select characteristics',
    content: 'At least one must be selected.',
    img: '/img/main/characteristics.png'
  },
  {
    title: 'Upload pictures',
    content:
      'You can predict multiple pictures at a time (for the time being, you can only upload JPG or PNG files one by one, with a limit of 5 uploads)',
    img: '/img/main/upload.png'
  },
  {
    title: 'Run the program',
    content:
      "Click the 'Run' button to run the program. Click the 'Reset' button or refresh the page to clear everything.",
    img: '/img/main/button.png'
  },
  {
    title: 'Get Result',
    content:
      'The results include excel and image table. Click on the image to preview. The results can be downloaded.',
    img: '/img/main/result.png'
  }
]
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="Instructions for use"
    @ok="handleOk"
  >
    <a-typography>
      <a-typography-paragraph
        ><a-steps size="small" v-model:current="current" direction="vertical">
          <a-step
            v-for="item in steps"
            :key="item.title"
            :title="item.title"
            :description="item.content"
          /> </a-steps
      ></a-typography-paragraph>
      <a-typography-paragraph>
        <a-image :preview="false" :src="steps[current].img" />
      </a-typography-paragraph>
    </a-typography>
  </a-modal>
</template>

<style scoped></style>
