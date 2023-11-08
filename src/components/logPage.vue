<template>
    <div class="message" v-for="(item, index) in props.messages" :key="index">
        <div>{{ item.ts }}: {{ item.data }}</div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    messages: Array,
})

</script>
  
<style scoped>
.message {
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px;
}
</style>
  