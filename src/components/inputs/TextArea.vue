<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    value: String,
})
</script>

<template>
    <div class="text-area">
        <label :for="name">{{ label }}</label>
        <textarea :id="name" :name="name" rows="5" :value="value"></textarea>
    </div>
</template>

<style scoped>
.text-area textarea {
    width: 100%;
    border-radius: 0.25rem;
}
</style>