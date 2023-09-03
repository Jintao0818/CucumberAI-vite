import { defineStore } from 'pinia'
import { ref } from 'vue'

export const dataStore = defineStore('data', () => {
  const active = ref('home')
  const downloadUrl = ref('')
  const resultData = ref('')

  return {
    downloadUrl,
    resultData,
    active
  }
})
