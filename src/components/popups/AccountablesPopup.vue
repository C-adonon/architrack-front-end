<script setup>
import { ref, onMounted, computed, onBeforeUpdate } from "vue";
import userService from "../../services/userService";
import applicationService from "./../../services/applicationService.js";

const props = defineProps({
  selectedAccountables: Array,
});

let emit = defineEmits(["sendAccountables"]);
let newAccountableList = ref([]);
let allUsers = ref([]);
let checked = ref(false);

onMounted(async () => {
  try {
    allUsers.value = await userService.getAllUsers();
  } catch (error) {
    console.error(error);
  }
});

let filteredUser = computed(() => {
  return allUsers.value.filter(
    (user) => !props.selectedAccountables.includes(user.id)
  );
});

function updateNewAccountableList(id) {
  if (newAccountableList.value.includes(id)) {
    newAccountableList.value = newAccountableList.value.filter(
      (value) => value != id
    );
  } else {
    newAccountableList.value = [...newAccountableList.value, id];
  }
}

function addNewAccountables() {
  newAccountableList.value = [
    ...props.selectedAccountables,
    ...newAccountableList.value,
  ];
  emit("sendAccountables", newAccountableList.value);
  document.getElementById("modal-accountables").close();
}

function closePopup() {
  document.getElementById("modal-accountables").close();
}
</script>

<template>
  <dialog id="modal-accountables" class="popup">
    <div class="popup-content">
      <div class="popup-header">
        <h2>Add new ccountables</h2>
        <span id="close" class="close-popup" @click="closePopup">X</span>
      </div>
      <div class="popup-body">
        <button class="btn" @click="addNewAccountables">Send</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUser"
              :key="user.id"
              @click="updateNewAccountableList(user.id)"
            >
              <td class="info">
                <input
                  type="checkbox"
                  :name="user.id"
                  :id="user.id"
                  :value="user.id"
                  :checked="checked"
                />
                <span>
                  <div>{{ user.firstname }} {{ user.lastname }}</div>
                  <div>{{ user.department.name }}</div>
                </span>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </dialog>
</template>


<style scoped>
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td.info {
  display: flex;
  gap: 5%;
}

th {
  background-color: lightgray;
  color: #333;
  padding: 1rem 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th:first-child {
  border-top-left-radius: 0.5rem;
}

th:last-child {
  border-top-right-radius: 0.5rem;
}

td {
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f9f9f9;
}

tbody {
  border-left: solid 1px #ddd;
  border-right: solid 1px #ddd;
}

.add-accountable {
  margin-top: 1rem;
}

dialog {
  width: 50%;
  height: 70%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.close-popup {
  cursor: pointer;
}
</style>