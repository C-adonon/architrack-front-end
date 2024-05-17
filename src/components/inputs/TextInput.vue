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
    required: Boolean,
    disabled: Boolean
})

// Required input

onMounted(() => {
})

</script>

<template>
    <div class="input-wrapper text-input">
        <label class="label" :for="name">{{ label }}<span v-if="required" class="required-field">*</span></label>
        <input type="text" :name="name" :id="name" :placeholder="`Please enter the ` + name" :value="value"
            :required="required" :disabled="disabled">
    </div>
</template>

<style scoped>
label,
input {
    display: block;
}

/* .text-input {
    width: 100%;
    margin-bottom: 1rem;
} */

/* .text-input input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
} */
</style>