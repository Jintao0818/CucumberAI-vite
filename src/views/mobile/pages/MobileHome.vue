<script setup>
import { pictureUpload, pictureIdentify } from '@/api//modules/func.js'
import { Snackbar } from '@varlet/ui'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import * as imageConversion from 'image-conversion'
import '@varlet/ui/es/styles/elevation.css'
import '@varlet/ui/es/style'

const settings = settingStore()
const data = dataStore()
const { modeValue, characterValue, compressionSize } = storeToRefs(settings)
const { downloadUrl, resultData, active } = storeToRefs(data)
const router = useRouter()

const files = ref([])
const pic = ref('') //裁剪插件图片源
const state = reactive({
  displayCropModal: false, // 弹框是否可见
  degreeNum: 0, // 旋转度数的次数
  onLoading: false, // 是否加载中
  imgSize: 300 // 图片固定宽高
})
const fileName = ref('')

// 检查是否设置完成
const checkSetting = () => {
  Snackbar.warning('Select mode and characteristic at first!')
  router.push('/mobile/settings')
}

// 图片压缩
function handleBeforeRead(file) {
  fileName.value = file.name
  return new Promise((resolve) => {
    // 默认压缩到640KB
    imageConversion
      .compressAccurately(file.file, Number(compressionSize.value))
      .then((res) => {
        resolve(res)
      })
  })
}

// 拍照并传入裁剪插件
const takePhoto = (file) => {
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    pic.value = file.url
    let img = new Image()
    img.src = file.url
    state.displayCropModal = true
  }
  reader.readAsDataURL(dataURLtoBlob(file.url))
}

//图片字符串转化为Bolb(裁剪插件只能接收此类型)
const dataURLtoBlob = (dataURL) => {
  const byteString = atob(dataURL.split(',')[1])
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]

  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}

// 裁剪框-确认（上传并识别）
const handleModalSure = async () => {
  if (state.onLoading) return
  state.onLoading = true
  Snackbar.loading('Uploading image...')
  const base64 = cropper.getDataURL()

  pictureUpload({ data: base64.split(',')[1], name: fileName.value })
    .then((res) => {
      console.log(res)
      Snackbar.success('Upload success!')

      const metrics = characterValue.value
      Snackbar.loading('Analyzing image...')

      pictureIdentify({
        UA: 'mobile',
        mode: modeValue.value,
        metrics: metrics,
        names: [fileName.value]
      })
        .then((res) => {
          Snackbar.success('Analyze success!')
          console.log(res)
          // 结果数据更新
          resultData.value = res.data
          downloadUrl.value =
            'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
            res.data.excel
          active.value = ''
          router.push('/mobile/result')
        })
        .catch((error) => {
          console.log(error)
          Snackbar.error('Analyze failed!')
          router.push('/mobile/home')
        })
    })
    .catch((error) => {
      console.log(error)
      Snackbar.error('Upload failed!')
      router.push('/mobile/home')
    })
  state.displayCropModal = false
  state.onLoading = false
}

// 裁剪框-旋转
const rorateImg = async (num) => {
  state.degreeNum += num
  cropper.rotateTo((state.degreeNum % 4) * 90)
}

// 裁剪框-取消
const handleModalCancel = () => {
  state.displayCropModal = false
}
</script>

<template>
  <!-- 主页 -->
  <var-image class="logo" src="/img/mobile/LOGO.png" width="35vw" />
  <var-image
    class="title-img"
    src="/img/mobile/title.png"
    fit="fill"
    height="11vw"
    width="80vw"
  />
  <var-uploader
    class="uploader"
    v-model="files"
    @before-read="handleBeforeRead"
    @after-read="takePhoto"
    hide-list="true"
    v-if="modeValue != '' && characterValue != ''"
  >
    <var-button class="photo-btn" type="primary"
      ><var-icon name="camera-outline" size="125%"
    /></var-button>
  </var-uploader>
  <var-button v-else @click="checkSetting" class="photo-btn" type="primary"
    ><var-icon name="camera-outline" size="125%"
  /></var-button>

  <!-- 图片裁剪弹出框 -->
  <var-popup
    class="cropper"
    overlay-class="popup-example-custom-overlay"
    v-model:show="state.displayCropModal"
  >
    <VuePictureCropper
      :boxStyle="{
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f8f8',
        margin: 'auto'
      }"
      :img="pic"
      :options="{
        viewMode: 1,
        dragMode: 'move',
        movable: false,
        autoCropArea: 0.8
      }"
      :presetMode="{
        mode: 'fixedSize'
      }"
    />

    <var-row>
      <var-col :span="5" :offset="2">
        <var-button
          class="corpper-btn"
          type="primary"
          size="small"
          @click="rorateImg(-1)"
          >Left
        </var-button>
      </var-col>
      <var-col :span="5">
        <var-button
          class="corpper-btn"
          type="primary"
          size="small"
          @click="rorateImg(1)"
          >Right
        </var-button>
      </var-col>
      <var-col :span="5">
        <var-button
          class="corpper-btn"
          type="primary"
          size="small"
          @click="handleModalSure"
          >Sure
        </var-button>
      </var-col>
      <var-col :span="5">
        <var-button
          class="corpper-btn"
          type="primary"
          size="small"
          @click="handleModalCancel"
          >Cancel
        </var-button>
      </var-col>
    </var-row>
  </var-popup>
</template>

<style scoped>
.logo {
  margin: 10vh auto 5vh;
}

.title-img {
  margin-left: 10vw;
  margin-bottom: 15vh;
}

.photo-btn {
  width: 20vw;
  height: 20vw;
  border-radius: 35%;
  font-size: 20px;
  margin-left: 40vw;
}

.popup-example-custom-overlay {
  background: rgba(0, 0, 0, 0.3) !important;
}
.cropper {
  border-radius: 5px;
  padding: 10px 10px 0 10px;
}
.var-row {
  width: 100%;
  .var-col {
    justify-content: center;
    align-items: center;
    height: 15vw;
    color: #fff;
    text-align: center;
    background-clip: content-box !important;
    .corpper-btn {
      width: 85%;
    }
  }
}
</style>
