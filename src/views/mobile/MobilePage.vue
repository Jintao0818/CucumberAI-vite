<script setup>
import { statusCheck } from '@/api/modules/func.js'
const data = dataStore()
const { active } = storeToRefs(data)
const GPUstatus = ref(false)
const router = useRouter()
const checkGPU = () => {
  statusCheck()
    .then((res) => {
      console.log('GPU:', res.data.status)
      GPUstatus.value = res.data.status
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleChange(active) {
  router.push(`/mobile/${active}`)
}

onMounted(() => {
  checkGPU()
  setInterval(() => {
    checkGPU()
  }, 1800000)
})
</script>

<template>
  <var-app-bar round>
    CucumberAI
    <template #left>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="menu" :size="24" />
      </var-button>
    </template>

    <template #right>
      <var-badge v-if="GPUstatus" type="danger" dot color="#52C41A" />
      <var-badge v-else type="danger" dot />
      &nbsp;GPU Server&nbsp;
    </template>
  </var-app-bar>

  <router-view></router-view>

  <div class="bottom"></div>
  <var-bottom-navigation
    :class="`var-elevation--7`"
    v-model:active="active"
    fixed
    safe-area
    @change="handleChange"
  >
    <var-bottom-navigation-item name="settings" label="Settings" icon="cog" />
    <var-bottom-navigation-item name="home" label="Home" icon="home" />
    <var-bottom-navigation-item
      name="instruction"
      label="Instructions"
      icon="help-circle"
    />
  </var-bottom-navigation>
</template>

<style lang="scss" scoped>
.bottom {
  background: #f5f5f5;
  height: 25vw;
}
</style>
