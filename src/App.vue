<script setup>
const router = useRouter()
const isMobile = ref(false)

onMounted(() => {
  isMobile.value = _isMobile()
  console.log('isMobile:', isMobile.value)
  if (isMobile.value) {
    // router.replace('/mobile')
  } else {
    router.replace('/main')
  }
})

function _isMobile() {
  let device = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return device != null
}
</script>

<template>
  <div class="body"><router-view></router-view></div>
</template>

<style scoped></style>
