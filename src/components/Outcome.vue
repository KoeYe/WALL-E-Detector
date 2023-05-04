<script setup lang="ts">
import { onMounted, onUpdated, watch } from 'vue';
const props = defineProps(['start', 'data']);
</script>

<template :ref="detectorDOM">
 <div id="outcome-container">
    <a-statistic title="User Growth Rate" :value="data" :precision="2" :value-from="0" animation></a-statistic>
 </div>
</template>

<style scoped>
#outcome-container{
    width:90%;
}
</style>