<script setup lang="ts">
import { onMounted, onUpdated, watch, reactive, ref } from 'vue';
import { IconRobot, IconLayers } from '@arco-design/web-vue/es/icon';
import { collapseItemProps } from 'element-plus';
const props = defineProps(['data']);
const emit = defineEmits(['alert']);
// 生成一个和为1的三个元素的数组
// const generateData = () => {
//   const data = [];
//   for (let i = 0; i < 3; i++) {
//     data.push(Math.random());
//   }
//   const sum = data.reduce((a, b) => a + b, 0);
//   //取小数点后两位
//   return data.map((item) => (item / sum).toFixed(3)).map(Number);
// };
const computeConclusion = (data:any)=>{
  console.log(data)
  let max = Math.max(...data)
  let index = data.indexOf(max)
  console.log(index)
  console.log(max)
  if(index === 0){
    return 'not depression 🙂'
  }else if(index === 1){
    return 'moderate depression 😢'
  }else{
    return 'severe depression 😭'
  }
}
// let fakeData:any = reactive([]);
// setTimeout(() => {
//   generateData().forEach((item) => fakeData.push(item));
//   conclusion.value = computeConclusion(fakeData);
// }, 100);
let trueData:any = reactive([]);
let conclusion = ref('not depression');
onMounted(() => {
  props.data.forEach((item:string) => trueData.push(Number(Number(item).toFixed(3))));
  conclusion.value = computeConclusion(props.data.map((item:string)=>Number(Number(item).toFixed(3))));
});
</script>

<template :ref="detectorDOM">
  <div id="outcome-header">
    <h1 style="font-weight: 500;"> <icon-robot style="top:2px;color:rgb(255, 194, 97)"/> Outcome</h1>
    <p id="outcome-header-description"><icon-layers style="top:2px;color:#999"/> Multimodal Structure</p>
  </div>
  <div id="outcome-container">
    <div class="out-pro">
      <div class="description">
        Not Depression:
      </div>
      <a-progress class="progress" :animation="true" type="circle" color="green" size="large" :percent="trueData[0]"/>
    </div>
    <div class="out-pro">
      <div class="description">
        Moderate Depression:
      </div>
      <a-progress class="progress" :animation="true" type="circle" status='warning' size="large" :percent="trueData[1]"/>
    </div>
    <div class="out-pro">
      <div class="description">
        Severe Depression:
      </div>
      <a-progress class="progress" :animation="true" type="circle" color="red" size="large" :percent="trueData[2]"/>
    </div>
    <div id="conclusion">
      Wall-E thinks this post is <p id="conclusion-word">{{ conclusion }}</p>.
    </div>
  </div>
</template>

<style scoped>
#outcome-container{
  width:90%;
}
.progress{
  margin: 15px;
  transform: scale(1.1);
}
#outcome-header{
  margin-top: 20px;
  margin-bottom: 20px;
}
#outcome-header-description{
  font-size: 18px;
  margin-top: -30px;
  color: #999;
  font-weight: 310;
}
.out-pro{
  display: flex
}
.description{
  width:120px;
  margin-right: 10px;
  text-align: left;
  font-size: 20px;
  margin-top: 10px;
}
#outcome-container{
  display: flex;
  flex-direction: column;
}
#conclusion{
  margin-top: 20px;
  font-size: 20px;
}
#conclusion-word{
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
}
</style>