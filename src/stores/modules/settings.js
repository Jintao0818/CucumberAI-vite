import { defineStore } from 'pinia'
import { ref } from 'vue'

export const settingStore = defineStore(
  'settings',
  () => {
    const modeValue = ref('fruit')
    const characterValue = ref([])
    const compressionSize = ref('640')

    const checkAll = ref(false)
    const indeterminate = ref(false)

    return {
      modeValue,
      characterValue,
      compressionSize,
      checkAll,
      indeterminate
    }
  },
  {
    persist: true
  }
)
