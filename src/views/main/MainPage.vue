<script setup>
import MainInstruction from './components/MainInstruction.vue'
import MainSelect from './components/MainSelect.vue'
import MainResult from './components/MainResult.vue'
import { message, Modal, notification } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import {
  pictureIdentify,
  pictureClear,
  statusCheck
} from '@/api//modules/func.js'
import * as imageConversion from 'image-conversion'
import baseUrl from '@/api/baseUrl'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const GPUstatus = ref(false)
const dotCount = ref(1)
const instruction = ref()
const openInstruction = () => {
  dotCount.value = 0
  instruction.value.openInstruction()
}

const fileList = ref([]) //上传的图片
const fileNameList = ref([])
const prebtn = ref(false)
const btnLoading = ref(false)
const resetbtn = ref(false)
const noaction = ref(false)
const uploadSuccess = ref(false)
const result = ref()

const settings = settingStore()
const { modeValue, characterValue } = storeToRefs(settings)
const data = dataStore()
const { downloadUrl, resultData } = storeToRefs(data)

const checkGPU = () => {
  statusCheck()
    .then((res) => {
      console.log('GPU:', res.data.status)
      GPUstatus.value = res.data.status
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  checkGPU()
  setInterval(() => {
    checkGPU()
  }, 1800000)
})

// 图片压缩
const beforeUpload = (file) => {
  if (fileList.value.length === 0) {
    notification.open({
      message: 'Upload Notice',
      description:
        'The uploaded image will be compressed to around 1MB. Please wait until the upload is complete before uploading the next image.'
    })
  }

  if (fileList.value.length >= 5) {
    message.warning('Maximum of 5 images can be uploaded.')
    return false
  }
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.warning('Please upload JPG or PNG files.')
    return false
  }
  return new Promise((resolve) => {
    // 压缩到640KB
    imageConversion.compressAccurately(file, 640).then((res) => {
      resolve(res)
    })
  })
}

//上传处理
const handleChange = (info) => {
  const status = info.file.status
  if (status === 'uploading') {
    noaction.value = true
  }
  if (status === 'done') {
    noaction.value = false
    uploadSuccess.value = true
    fileNameList.value.push(info.file.name)
    message.success(`${info.file.name} file uploaded successfully.`)
  } else if (status === 'error') {
    noaction.value = false
    message.error(`${info.file.name} file upload failed.`)
  }
}

//预测
const predict = () => {
  console.log(fileNameList.value)
  notification.open({
    message: 'Notice',
    description: 'The process may take a long time, so please be patient.'
  })

  btnLoading.value = true
  noaction.value = true
  const metrics = characterValue.value

  pictureIdentify({
    UA: 'pc',
    mode: modeValue.value,
    metrics: metrics,
    names: fileNameList.value
  })
    .then((res) => {
      console.log(res.data)
      message.success(`Run successfully.`)

      resultData.value = res.data
      downloadUrl.value =
        'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
        res.data.excel

      btnLoading.value = false
      prebtn.value = false
      result.value.showResult()
    })
    .catch((error) => {
      message.error(`Run failed!`, error)
      btnLoading.value = false
      prebtn.value = false
      console.log(error)
    })
}

//清除
const clear = () => {
  Modal.confirm({
    title: () => 'Are you sure to reset?',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: () => 'Uploaded images and results will be cleared.',
    onOk() {
      fileList.value = []
      uploadSuccess.value = false
      resetbtn.value = false
      btnLoading.value = false
      noaction.value = false
      result.value.closeResult()

      pictureClear({ names: fileNameList.value })
        .then((res) => {
          console.log(res)
          if (res.data == 'Clear Error!') {
            return
          }
        })
        .catch((error) => {
          console.log(error)
        })
      fileNameList.value = []
    },
    onCancel() {}
  })
}

watch(
  [() => uploadSuccess.value, () => fileList.value, () => characterValue.value],
  ([newuploadSuccess, newfileList, newcharacterList]) => {
    // 有文件上传成功 且 文件列表不为0时 可以重置
    if (newuploadSuccess === true && newfileList.length !== 0) {
      resetbtn.value = true
    }
    // 有文件上传成功 且 有特征被选择时 可以运行
    if (newuploadSuccess === true && newcharacterList.length !== 0) {
      prebtn.value = true
    } else {
      prebtn.value = false
    }
  }
)
</script>

<template>
  <a-layout class="layout">
    <a-layout-header style="text-align: center; color: #fff">
      CucumberAI
    </a-layout-header>
    <a-layout-content class="content">
      <a-card title="Cucumebr Characterization System" class="card">
        <template #extra>
          <a-badge
            v-if="GPUstatus"
            status="success"
            text="GPU Server(online)"
          />
          <a-badge
            v-else-if="!GPUstatus"
            status="error"
            text="GPU Server(offline)"
          />
          <a-divider type="vertical" />
          <a-badge :count="dotCount" dot>
            <a @click="openInstruction">Instructions for use</a>
          </a-badge>
          <main-instruction ref="instruction"></main-instruction>
        </template>
        <a-typography class="tg">
          <a-typography-title :level="4">
            Choose mode, one feature at least and upload your images...
          </a-typography-title>
          <a-typography-paragraph>
            <!-- 选择特征 -->
            <main-select :noaction="noaction"></main-select>

            <!-- 文件上传 -->
            <a-upload-dragger
              style="height: 180px; border-radius: 10px"
              v-model:fileList="fileList"
              name="file"
              :multiple="false"
              :action="baseUrl + '/upload'"
              @change="handleChange"
              :disabled="noaction"
              limit="5"
              :before-upload="beforeUpload"
            >
              <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
              </p>
              <p class="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p class="ant-upload-hint">
                Upload them one by one, maximum of 5 images
              </p>
            </a-upload-dragger>
          </a-typography-paragraph>

          <a-typography-paragraph class="tgp">
            <!-- 按钮 -->
            <a-space>
              <a-button
                v-if="resetbtn"
                class="btn"
                type="primary"
                @click="clear"
                >Reset
              </a-button>

              <a-button
                v-if="prebtn"
                class="btn"
                type="primary"
                @click="predict"
                :loading="btnLoading"
                >Run
              </a-button>
            </a-space>
          </a-typography-paragraph>
          <a-typography-paragraph>
            <main-result ref="result"></main-result>
          </a-typography-paragraph>
        </a-typography>
      </a-card>
    </a-layout-content>
    <a-layout-footer style="text-align: center; background: #f5f5f5">
      CucumberAI ©2023 Created by Jin Tao
    </a-layout-footer>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout {
  background: #f5f5f5;
}
.content {
  height: max-content;
  width: 73vw;
  background: #fff;
  margin: 0 auto;
  border-radius: 10px;
}

.card {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.tg {
  margin: 0 auto;
  width: 65%;
}

.tgp {
  display: flex;
  justify-content: center;
}

.btn {
  width: 100px;
  border-radius: 5px;
}
</style>
