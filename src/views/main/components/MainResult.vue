<script setup>
import { watch } from 'vue'

const settings = settingStore()
const { modeValue } = storeToRefs(settings)
const data = dataStore()
const { downloadUrl, resultData } = storeToRefs(data)

// 初始表格列
const columns = ref([
  {
    title: 'Action',
    key: 'action',
    slots: {
      customRender: 'action'
    }
  }
])

const columns1 = [
  {
    title: 'Key',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Fruit',
    dataIndex: 'fruit_img',
    slots: {
      customRender: 'fruit_img'
    }
  },
  {
    title: 'Segment',
    dataIndex: 'color_img',
    slots: {
      customRender: 'color_img'
    }
  },
  {
    title: 'Skeleton',
    dataIndex: 'sk_img',
    slots: {
      customRender: 'sk_img'
    }
  },
  {
    title: 'Dr',
    dataIndex: 'V1_img',
    slots: {
      customRender: 'V1_img'
    }
  },
  {
    title: 'Hr',
    dataIndex: 'V2_img',
    slots: {
      customRender: 'V2_img'
    }
  },
  {
    title: 'Cf',
    dataIndex: 'V5_img',
    slots: {
      customRender: 'V5_img'
    }
  },
  {
    title: 'Stripe',
    dataIndex: 'stripe_img',
    slots: {
      customRender: 'stripe_img'
    }
  },
  {
    title: 'Tumors',
    dataIndex: 'tumor_img',
    slots: {
      customRender: 'tumor_img'
    }
  },
  {
    title: 'Action',
    key: 'action',
    slots: {
      customRender: 'action'
    }
  }
]
const columns2 = [
  {
    title: 'Key',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Hr',
    dataIndex: 'smooth_V1_img',
    slots: {
      customRender: 'smooth_V1_img'
    }
  },
  {
    title: 'Cr',
    dataIndex: 'smooth_V2_img',
    slots: {
      customRender: 'smooth_V2_img'
    }
  },
  {
    title: 'Cf',
    dataIndex: 'smooth_V4_img',
    slots: {
      customRender: 'smooth_V4_img'
    }
  },
  {
    title: 'Heart',
    dataIndex: 'heart_img',
    slots: {
      customRender: 'heart_img'
    }
  },
  {
    title: 'Action',
    key: 'action',
    slots: {
      customRender: 'action'
    }
  }
]

// 图片下载
const downloadimgs = (record) => {
  const imgKey = record.key
  for (const [key, value] of Object.entries(record)) {
    if (key != 'name' && key != 'key') {
      const link = document.createElement('a')
      link.href = 'data:image/jpg;base64,' + value
      const imgName = columns.value.find((item) => item.dataIndex === key).title
      link.download = imgName + '_' + imgKey + '.jpg'
      link.click()
    }
  }
}

// 表格下载
const downloadExcel = () => {
  const element = document.createElement('a')
  element.href = downloadUrl.value
  element.download = modeValue.value + '.xlsx'
  element.target = '_blank'
  element.click()
}

watch([() => resultData.value], (newData) => {
  // 表格列动态显示
  if (newData[0].imgdata.length !== 0) {
    for (const item of modeValue.value === 'fruit' ? columns1 : columns2) {
      if (Object.keys(newData[0].imgdata[0]).includes(item.dataIndex)) {
        columns.value.splice(columns.value.length - 1, 0, item)
      }
    }
  }
})

const visiable = ref(false)
const showResult = () => {
  visiable.value = true
}
const closeResult = () => {
  columns.value = [
    {
      title: 'Action',
      key: 'action',
      slots: {
        customRender: 'action'
      }
    }
  ]
  visiable.value = false
}
defineExpose({
  showResult,
  closeResult
})
</script>

<template>
  <div v-if="visiable">
    <!-- Excel文件下载 -->
    <a-divider orientation="left">Result Data</a-divider>
    <a-button @click="downloadExcel" type="primary"
      ><VerticalAlignBottomOutlined />Click to Download</a-button
    >

    <a-divider orientation="left">Result Images</a-divider>

    <a-table
      v-if="modeValue === 'fruit' && columns.length !== 1"
      :columns="columns"
      :data-source="resultData.imgdata"
      :pagination="{ pageSize: 5 }"
      :scroll="{ x: 1000 }"
    >
      <template #fruit_img="{ record }">
        <span>
          <a-image
            width="50px"
            :src="'data:image/jpg;base64,' + record.fruit_img"
          />
        </span>
      </template>
      <template #color_img="{ record }">
        <span>
          <a-image
            width="50px"
            :src="'data:image/jpg;base64,' + record.color_img"
          />
        </span>
      </template>
      <template #sk_img="{ record }">
        <span>
          <a-image
            width="50px"
            :src="'data:image/jpg;base64,' + record.sk_img"
          />
        </span>
      </template>
      <template #V1_img="{ record }">
        <span>
          <a-image
            width="50px"
            :src="'data:image/jpg;base64,' + record.V1_img"
          />
        </span>
      </template>
      <template #V2_img="{ record }">
        <span>
          <a-image
            width="50px"
            :src="'data:image/jpg;base64,' + record.V2_img"
          />
        </span>
      </template>
      <template #V5_img="{ record }">
        <span>
          <a-image
            width="50px"
            :src="'data:image/jpg;base64,' + record.V5_img"
          />
        </span>
      </template>
      <template #stripe_img="{ record }">
        <span>
          <a-image
            width="50px"
            height="50px"
            :src="'data:image/jpg;base64,' + record.stripe_img"
          />
        </span>
      </template>
      <template #tumor_img="{ record }">
        <span>
          <a-image
            width="50px"
            height="50px"
            :src="'data:image/jpg;base64,' + record.tumor_img"
          />
        </span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="downloadimgs(record)">Download</a>
        </span>
      </template>
    </a-table>

    <a-table
      v-if="modeValue === 'pulp' && columns.length !== 1"
      :columns="columns"
      :data-source="resultData.imgdata"
      :pagination="{ pageSize: 5 }"
    >
      <template #smooth_V1_img="{ record }">
        <span>
          <a-image
            width="50px"
            height="50px"
            :src="'data:image/jpg;base64,' + record.smooth_V1_img"
          />
        </span>
      </template>
      <template #smooth_V2_img="{ record }">
        <span>
          <a-image
            width="50px"
            height="50px"
            :src="'data:image/jpg;base64,' + record.smooth_V2_img"
          />
        </span>
      </template>
      <template #smooth_V4_img="{ record }">
        <span>
          <a-image
            width="50px"
            height="50px"
            :src="'data:image/jpg;base64,' + record.smooth_V4_img"
          />
        </span>
      </template>
      <template #heart_img="{ record }">
        <span>
          <a-image
            width="50px"
            height="50px"
            :src="'data:image/jpg;base64,' + record.heart_img"
          />
        </span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="downloadimgs(record)">Download</a>
        </span>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
