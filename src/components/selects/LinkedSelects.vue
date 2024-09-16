<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    
})

const categories = ref(['Fruits', 'Vegetables']);
const items = ref({
  Fruits: ['Apple', 'Banana', 'Orange'],
  Vegetables: ['Carrot', 'Broccoli', 'Spinach']
});

const selectedCategory = ref(categories.value[0]);
const selectedItem = ref(null);

const filteredItems = computed(() => {
  const selectedItems = items.value[selectedCategory.value] || [];
  return selectedItems.sort();
});
</script>

<template>
  <div>
    <label for=""></label>
    <select v-model="selectedCategory">
      <option v-for="category in categories" :key="category" :value="category" name>
        {{ category }}
      </option>
    </select>

    <select v-model="selectedItem">
      <option v-for="item in filteredItems" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>