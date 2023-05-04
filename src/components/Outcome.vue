<script setup lang="ts">
import { onMounted, onUpdated, watch, reactive } from 'vue';
const props = defineProps(['start', 'data']);

// 生成一个和为1的三个元素的数组
const generateData = () => {
  const data = [];
  for (let i = 0; i < 3; i++) {
    data.push(Math.random());
  }
  const sum = data.reduce((a, b) => a + b, 0);
  //取小数点后两位
  return data.map((item) => (item / sum).toFixed(2)).map(Number);
};
let fakeData:any = reactive([]);
setTimeout(() => {
  generateData().forEach((item) => fakeData.push(item));
}, 300);

</script>

<template :ref="detectorDOM">
  <div id="outcome-header">
    <h1>Outcome</h1>
  </div>
  <div id="outcome-container">
    <a-progress class="progress" :animation="true" type="circle" color="green" size="large" :percent="fakeData[0]"/>
    <a-progress class="progress" :animation="true" type="circle" status='warning' size="large" :percent="fakeData[1]"/>
    <a-progress class="progress" :animation="true" type="circle" color="red" size="large" :percent="fakeData[2]"/>
  </div>
</template>

<style scoped>
#outcome-container{
  width:90%;
}
.progress{
  margin: 10px;
  transform: scale(1.1);
}
</style>