<script setup>
import { ref, onMounted, computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  valueId: String,
  valueName: String,
  options: Array,
  required: Boolean,
  disabled: Boolean
});

let message = computed(() => {
  return props.options.length === 0
    ? "No options available"
    : "Select an option";
});

let filterOptions = computed(() => {
  return props.options.filter((option) => option.name !== props.valueName);
});
</script>

<template>
  <div class="input-wrapper select-input">
    <label :for="name"
      >{{ label }}<span v-if="required" class="required-field">*</span></label
    >
    <select :name="name" :id="name" :required="required">
      <option value="" disabled :selected="!valueId">{{ message }}</option>
      <option v-if="valueName && valueId" :value="valueId" selected>
        {{ valueName }}
      </option>
      <option
        v-for="(option, index) in filterOptions"
        :key="index"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
