<script setup>
const settings = settingStore()
const { modeValue, characterValue } = storeToRefs(settings)
const data = dataStore()
const { downloadUrl, resultData } = storeToRefs(data)

const activeCard = ref(0)

const downloadFile = () => {
  const element = document.createElement('a')
  element.href = downloadUrl.value
  element.download = modeValue.value + '.xlsx'
  element.target = '_blank'
  element.click()
}
</script>

<template>
  <!-- 结果展示 -->
  <var-space direction="column" :size="[14, 0]">
    <var-cell style="color: #888888" border>Result images</var-cell>
    <var-swipe class="swipe-container" :class="`var-elevation--3`">
      <var-swipe-item v-for="(value, key) in resultData.imgdata[0]" :key="key">
        <img class="swipe-image" :src="'data:image/jpg;base64,' + value" />
      </var-swipe-item>
    </var-swipe>

    <var-cell style="color: #888888" border>Result Data</var-cell>
    <var-tabs
      class="common"
      elevation
      color="var(--color-primary)"
      active-color="#fff"
      inactive-color="hsla(0, 0%, 100%, .6)"
      v-model:active="activeCard"
      scrollable="always"
    >
      <var-tab v-for="item in characterValue" :key="item">{{ item }}</var-tab>
    </var-tabs>

    <var-tabs-items v-model:active="activeCard" class="common">
      <var-tab-item v-if="characterValue.includes('fruit shape')">
        <var-table>
          <tbody>
            <tr v-for="(value, key) in resultData.fruit_data" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </var-table>
      </var-tab-item>
      <var-tab-item v-if="characterValue.includes('color & texture')">
        <var-table>
          <tbody>
            <tr v-for="(value, key) in resultData.ct_data" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </var-table>
      </var-tab-item>
      <var-tab-item v-if="characterValue.includes('stripe')">
        <var-table>
          <tbody>
            <tr v-for="(value, key) in resultData.stripe_data" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </var-table>
      </var-tab-item>
      <var-tab-item v-if="characterValue.includes('tumor')">
        <var-table>
          <tbody>
            <tr v-for="(value, key) in resultData.tumor_data" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </var-table>
      </var-tab-item>
      <var-tab-item v-if="characterValue.includes('pulp shape')">
        <var-table>
          <tbody>
            <tr v-for="(value, key) in resultData.pulp_data" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </var-table>
      </var-tab-item>
      <var-tab-item v-if="characterValue.includes('flesh & heart')">
        <var-table>
          <tbody>
            <tr v-for="(value, key) in resultData.heart_data" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </var-table>
      </var-tab-item>
    </var-tabs-items>
    <var-cell style="color: #888888" border>Data Download</var-cell>
    <var-button
      class="download"
      type="primary"
      size="small"
      @click="downloadFile"
      >Download</var-button
    >
    <var-back-top :duration="300" bottom="65" right="30" />
  </var-space>
</template>

<style lang="scss" scoped>
.swipe-container {
  width: 90vw;
  height: max-content;
  margin: 0 auto;
  background: #fff;
  padding-left: 18vw;
  border-radius: 5px;
}

.swipe-image {
  width: 60%;
  object-fit: cover;
  pointer-events: none;
}

.download {
  margin-left: 5vw;
}

.common {
  width: 90vw;
  margin: 0 auto;
}
</style>
