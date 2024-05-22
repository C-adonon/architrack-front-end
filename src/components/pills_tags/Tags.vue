<script setup>
import { reactive, computed } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  closable: Boolean,
  color: String,
});

const tagStyle = computed(() => {
  return {
    backgroundColor: `${props.color}80`, 
    borderColor: props.color || "#333",
    borderWidth: "1px",
    borderStyle: "solid",
  };
});
</script>

<template>
  <div v-if="text && color" class="tag" :style="tagStyle">
    {{ text }}
    <span v-if="closable" class="close-tag">X</span>
  </div>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 0.5em 1em;
  margin: 0.5em;
  background-color: #b4b4b4;
  border: solid 1px #5a5a5a;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 1rem;
}

.tag .close-tag {
  color: #333;
}
</style>