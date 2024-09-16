<script setup>
// import Tags from '../pills_tags/Tags.vue';
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
})

const searchText = ref('');
const selectedOptions = ref([]);
const options = ref(props.options);

const filteredOptions = computed(() => {
    // const searchRegex = new RegExp(searchText.value.trim(), 'i');
    // return options.value.filter(option => searchRegex.test(option.label)).sort((a, b) => a.label.localeCompare(b.label));
});
</script>


<template>
    <div class="input-wrapper search-select">
        <label :for="name">{{ label }}</label>
        <div class="dropdown">
            <input type="text" :name="name" v-model="searchText" @input="filterOptions"
                placeholder="Search options..." />
            <div class="options">
                <div v-for="option in filteredOptions" :key="option.value">
                    <label>
                        <input type="checkbox" :value="option.value" v-model="selectedOptions" />
                        {{ option.label }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.dropdown {
    position: relative;
}

.options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    max-height: 200px;
    overflow-y: auto;
}

.options div {
    padding: 5px;
    cursor: pointer;
}

.options div:hover {
    background-color: #f0f0f0;
}
</style>