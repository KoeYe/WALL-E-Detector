<script setup lang="ts">
import Detector from './components/Detector.vue'
import Outcome from './components/Outcome.vue'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import axios from 'axios'
let outcome=ref(false)
let running = ref(null)
let alertShow = ref(false)
onMounted(() => {
  let running = ref(false)
  axios
    .get('/api/test')
    .then((res) => {
      console.log('run')
      if(res.data['message']){
        running.value = true
        onAlert("success", 'Server running!')
      }else{
        running.value = false
        onAlert('error', 'Server can not connect!')
      }
    })
    .catch((err) => {
      console.log(err)
      running.value = false
      onAlert('error', 'Server can not connect!')
    })
})

let aType:"success" | "normal" | "error" | "warning" | "info" | undefined = undefined
let aMsg = ref('')

const computeStart = () => {return outcome.value}
let outcomeData = reactive([0.783, 0.112, 0.105])

const getOutcome = () => {
  outcome.value = !outcome.value
  onAlert('success', 'Get outcome successfully!')

}

const onAlert = (type:string, msg:string) => {
  aType = type
  aMsg.value = msg
  alertShow.value = true
}

const onAlertClose = ()=>{
  alertShow.value = false
}
</script>

<template>
  <div id="container">
    <div id="header">
      <Transition name="header" appear>
        <a-alert @close="onAlertClose" banner closable v-if="alertShow" :type=aType> {{ aMsg }} </a-alert>
      </Transition>
    </div>
    <div id="body">
      <TransitionGroup name="tg" tag="ul">
        <li id="detector" key="li-dec">
            <Detector @alert="onAlert"/>
        </li>
        <li id="outcome" v-if="outcome" key="li-out">
            <Outcome :start="computeStart" :data="outcomeData"/>
        </li>
      </TransitionGroup>
    </div>
    <a-button @click="getOutcome">test</a-button>
  </div>
</template>

<style scoped>
.tg-move,
.tg-enter-active,
.tg-leave-active {
  transition: all 0.5s ease;
}

.tg-enter-from{
  left: 0px;
  opacity: 0;
  transform: translateX(-100vw);
  transform: translateY(-5vh);
}

.tg-leave-to {
  opacity: 0;
  transform: translateX(40vw);
}

.tg-leave-active {
  position: absolute;
}

.header-enter-active,
.header-leave-active {
  transition: all 0.5s ease-in-out;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(-5vh);
  opacity: 0;
}

#container{
  display: flex;
  align-items: center;
  width: 100vw;
  flex-direction: column;
}
#header{
  width: 80vw;
  height: 5vh;
}
#body{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  width:100vw;
  height:85vh;
  transition: 0.4s;
}
#detector{
  width: 60vw;
}
#outcome{
  border-left: 1px solid black;
  padding-left: 5vw;
  width: 40vw;
}
ul{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
</style>