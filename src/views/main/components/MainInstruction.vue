<script setup>
const visible = ref(false)

const openInstruction = () => {
  visible.value = true
}

const handleOk = (e) => {
  visible.value = false
}

defineExpose({
  openInstruction
})
</script>

<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="Instructions for use"
      @ok="handleOk"
    >
      <p>
        1. Select a mode and make sure that the uploaded image corresponds to
        the selected one.
      </p>
      <p>
        2. You must select the features to be extracted. If you choose "fruit
        shape", the processing speed will be slower.
      </p>
      <a-image :preview="false" src="img/features.png" />
      <p>
        3. Select the cucumber fruit or pulp image, or you can drag and drop to
        upload. You can predict multiple pictures at a time (for the time being,
        you can only upload JPG or PNG files one by one, with a limit of 5
        uploads).
      </p>
      <a-image :preview="false" src="img/upload_img.png" />
      <p>
        4. When the feature is selected and the image is uploaded click the
        'Run' button to run the program, click the 'Reset' button or refresh the
        page to clear everything.
      </p>
      <a-image :preview="false" src="img/buttons.png" />
      <p>
        4. The result is a table and an image, click on the image to preview it,
        both can be downloaded.(The feature names and image names in the table
        will be improved later.)
      </p>
      <p>5. Classification-related functions will be added later.</p>
      <a-image src="img/result.png" />
    </a-modal>
  </div>
</template>

<style scoped></style>
