<script setup>
// const props = defineProps(['text'])
defineProps({
    text: String
})
</script>

<template>
    <div class="pill">
        {{ text }}
    </div>
</template>

<style>
.pill {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border-radius: 1rem;
    background-color: #b4b4b4;
    color: #333;
}
</style>