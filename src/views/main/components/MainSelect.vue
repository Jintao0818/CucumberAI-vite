<script setup>
const plainOptions1 = ['fruit shape', 'color & texture', 'stripe', 'tumor']
const plainOptions2 = ['pulp shape', 'flesh & heart']
const settings = settingStore()
const { modeValue, characterValue, checkAll, indeterminate } =
  storeToRefs(settings)

const porps = defineProps({
  noaction: Boolean
})

//全选框
const onCheckAllChange = (e) => {
  if (modeValue.value === 'fruit') {
    characterValue.value = e.target.checked ? plainOptions1 : []
  } else {
    characterValue.value = e.target.checked ? plainOptions2 : []
  }
  indeterminate.value = false
}

//模式选择变化
const onRatioChange = (e) => {
  characterValue.value = []
  indeterminate.value = false
  checkAll.value = false
}

watch(
  () => characterValue.value,
  (val) => {
    if (modeValue.value === 'fruit') {
      indeterminate.value = !!val.length && val.length < plainOptions1.length
      checkAll.value = val.length === plainOptions1.length
    } else {
      indeterminate.value = !!val.length && val.length < plainOptions2.length
      checkAll.value = val.length === plainOptions2.length
    }
  }
)
</script>

<template>
  <a-radio-group
    class="mode"
    v-model:value="modeValue"
    button-style="solid"
    @change="onRatioChange"
    :disabled="noaction"
  >
    <a-radio-button value="fruit">Fruit mode</a-radio-button>
    <a-radio-button value="pulp">Pulp mode</a-radio-button>
  </a-radio-group>

  <div :style="{ borderBottom: '0.065vw solid #E9E9E9' }">
    <a-checkbox
      v-model:checked="checkAll"
      :indeterminate="indeterminate"
      @change="onCheckAllChange"
      :disabled="noaction"
    >
      Check all
    </a-checkbox>
  </div>
  <a-checkbox-group
    class="features"
    v-if="modeValue == 'fruit'"
    v-model:value="characterValue"
    :options="plainOptions1"
    @change="onRatioGruopChange"
    :disabled="noaction"
  />
  <a-checkbox-group
    class="features"
    v-if="modeValue == 'pulp'"
    v-model:value="characterValue"
    :options="plainOptions2"
    @change="onRatioGruopChange"
    :disabled="noaction"
  />
</template>

<style scoped>
.mode {
  border-radius: 0.975vw;
  margin-bottom: 0.715vw;
}
.features {
  margin-top: 0.715vw;
  margin-bottom: 0.715vw;
}
</style>
