<script setup>
import { ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: Array,
  values: Array,
  required: Boolean,
  disabled: Boolean,
});

let valuesId = ref(props.values?.map((val) => val.id) || []);
let newValues = ref([]);
let emit = defineEmits(["newValues"]);

function updateValues(id) {
  if (newValues.value.includes(id)) {
    newValues.value = newValues.value.filter((value) => value != id);
  } else {
    newValues.value = [...newValues.value, id];
  }
  emit("newValues", { [props.name]: [...valuesId.value, ...newValues.value] });
}
</script>

<template>
  <div class="input-wrapper checkbox-input">
    <label class="checkbox-group-label">{{ label }}</label>
    <div class="checkbox-group">
      <div v-for="(option, index) in options" :key="index">
        <input
          type="checkbox"
          :name="option.name"
          :id="option.id"
          :value="option.id"
          :checked="valuesId.indexOf(option.id) != -1"
          :required="required"
          :disabled="disabled"
          @change="updateValues(option.id)"
        />
        <label :for="option.name">{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>


<style scoped>
input[type="checkbox"] {
  width: fit-content;
  margin: 0 0.5rem 0 0;
  
}

.checkbox-group {
  margin-top: 0.5rem;
}
</style>