<script setup lang="ts">
import { reactive , onMounted, ref } from 'vue'
import axios from 'axios'

let state = reactive({
  image: [],
  text: '',
})
let image_url = ''

const handleImageChange = (file: any) => {
  state.image = file
  let formData = new FormData()
  formData.append('file', file[0].originFileObj)
  axios
    .post('/api/image', formData)
    .then((res) => {
    console.log(res.data)
    image_url = res.data['message']
    alert('Image uploaded')
  })
}

const onDetect = () => {
  console.log(state.image)
  console.log(state.text)
  if(state.image.length === 0){
    alert('Please upload an image')
    return
  }
  if(state.text === ''){
    alert('Please input a text')
    return
  }
  axios
    .get('/api/detect', {
      params: {
        image_url: image_url,
        text: state.text,
      },
      headers: {
      'Access-Control-Allow-Origin': '*',
    },
    })
    .then((res) => {
      console.log(res.data)
      alert(res.data['message'])
    })
}
</script>

<template>
  <div id="detector-container">
    <div id="title">
      <h1>Welcome to WALL-E Sentimental Detector</h1>
    </div>
    <div id="upload" class="item">
      <a-upload
        :file-list="state.image"
        action="/api/image"
        list-type="picture-card"
        :show-cancel-button="false"
        :show-retry-button="false"
        :show-remove-button="false"
        :image-preview="true"
        :limit="1"
        @success="handleImageChange"
      />
    </div>
    <div id="text" class="item">
      <a-textarea
        placeholder="input some text..."
        :model="state.text"
      />
    </div>
    <div id="detect" class="item">
      <a-button id='btn' type="primary" @click="onDetect">Detect</a-button>
    </div>
  </div>
</template>

<style scoped>
 #btn{
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(white, #e8e9ed);
  border: 1px solid #e8e9ed;
  color: black;
  font-weight: bold;
  font-size: 1.2em;
  border-radius: 10px;
  height: 2.2rem;
 }
  #btn:hover{
    background: linear-gradient(white, #e8eeed);
    border: 1px solid #e8e9ed;
    color: black;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: 10px;
    height: 2.2rem;
  }
  #btn:active{
    background: radial-gradient(white, #e8eeed);
  }
 #detector-container {
  display: flex;
  align-items: center;
  flex-direction: column;
 }
 #text {
  width: 20vw;
 }
 #text :first-child{
  width: 100%;
  height: 100%;
 }
 #detect {
  width: 20vw;
  height: 9vh;
 }
 #detect :first-child{
  width: 100%;
  height: 2.2rem;
 }
 .item{
  margin: 10px;
 }
</style>
