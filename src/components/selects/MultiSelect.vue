<script setup>
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  values: Array,
  options: Array,
  required: Boolean,
  disabled: Boolean,
});

let message = computed(() => {
  return props.options.length === 0
    ? "No options available"
    : "Select option(s)";
});

// let filterOptions = computed(() => {
//   return props.options.filter((option) => option.id !== props.values.forEach((val) => val.id));
// });

// let filterOptions = computed(() => {
//   return props.values.forEach((val) => {
//     props.options.filter((option) => option.id !== val.id);
//   });
// });

// const valuesId = ref(props.values.map((val) => val.id));
// const filterOptions = computed(() =>
//   props.options.filter((option) => !valuesId.value.includes(option.id))
// );

// const selectedValues = ref([]);

// const emit = defineEmits(["newValues"]);
// const updateValues = () => {
//   emit("newValues", selectedValues.value);
// };

const emit = defineEmits(["newValues"]);
const internalValues = ref(props.values.map((val) => val.id));
// const internalValues = ref([...props.values]);
const isOpen = ref(false);

console.log("internal values 1" + internalValues.value);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const updateValues = () => {
  emit("newValues", (internalValues.value).values());
};

const selectedLabels = computed(() => {
  return props.options
    .filter((option) => internalValues.value.includes(option.id))
    .map((option) => option.name);
});

watch(
  () => props.values,
  (newValues) => {
    // internalValues.value = newValues.map((val) => val.id);
     internalValues.value = [...newValues];
  }
);

console.log("internal values" + internalValues.value);
console.log(typeof internalValues.value);
</script>

<template>
  <div class="multi-select">
    <label :for="name">{{ label }}</label>
    <div class="dropdown" @click="toggleDropdown">
      <span class="selected-values">
        {{ selectedLabels.join(", ") || message }}
      </span>
      <div class="dropdown-menu" v-if="isOpen" @click.stop>
        <div v-for="option in options" :key="option.id" class="dropdown-item">
          <input
            type="checkbox"
            class="dropdown-checkbox"
            :name="name"
            :id="option.id"
            :value="option.id"
            v-model="internalValues"
            @change="updateValues"
          />
          <label :for="name">{{ option.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.multi-select {
  position: relative;
  width: 100%;
  font-size: 1rem;
}

.dropdown {
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
}

input,
label {
  width: unset;
  margin: unset;
}

.selected-values {
  font-size: 1rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
}

.dropdown-item {
  padding: 0.5rem;
}

.dropdown-item:hover {
  background-color: #ff9898;
}

.dropdown-checkbox {
  margin-right: 0.5rem;
}
</style>
