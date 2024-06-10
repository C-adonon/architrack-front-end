<script setup>
import { ref, onMounted, computed } from "vue";
import AccountablesPopup from "./../popups/AccountablesPopup.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  author: Object,
  accountables: Array,
  required: Boolean,
  disabled: Boolean,
});

let authorRole = computed(() => {
  return props.author.role.toLowerCase();
});

let emit = defineEmits(["updatedAccountables"]);
let updatedAccountableList = ref([]);

function removeAccountable(id) {
  console.log("Remove accountable");
  updatedAccountableList.value = props.accountables.filter((acc) => acc != id);
  console.log(updatedAccountableList.value);
}

function showPopup() {
  document.getElementById("modal-accountables").showModal();
}

let currentAccountablesIdList = computed(() => {
  return props.accountables.map((acc) => acc.user.id);
});

function handleAddNewAccountables(accountables) {
  // console.log("handleAddNewAccountables: ", accountables);
  updatedAccountableList.value = accountables;
  // console.log("updatedAccountableList: ", {
  //   accountable: updatedAccountableList.value,
  // });
  emit("updatedAccountables", { accountables: updatedAccountableList.value });
}
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="author">
          <td>
            <div class="">
              {{ author.firstname }} - {{ author.lastname }} (author)
            </div>
            <div>{{ author.department.name }}</div>
          </td>
          <td>{{ author.email }}</td>
          <td>
            <span class="role">{{ authorRole }} </span>
          </td>
          <td></td>
        </tr>
        <tr
          v-for="(accountable, index) in accountables"
          :key="index"
          class="user"
        >
          <td>
            <div class="">
              {{ accountable.user.firstname }} - {{ accountable.user.lastname }}
            </div>
            <div>{{ accountable.user.department.name }}</div>
          </td>
          <td>{{ accountable.user.email }}</td>
          <td>
            <span class="role">{{ accountable.user.role.toLowerCase() }}</span>
          </td>
          <td>
            <button
              class="btn-table-action"
              @click="removeAccountable(accountable.user.id)"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="add-accountable">
      <button class="btn" @click="showPopup">Add accountables</button>
      <AccountablesPopup
        :selectedAccountables="currentAccountablesIdList"
        @sendAccountables="handleAddNewAccountables"
      />
    </div>
  </div>
</template>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
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

.role {
  text-transform: capitalize;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.25rem 0.35rem;
  text-align: center;
  background-color: #f2f2f2;
}

tr.author {
  background-color: #f2f2f2;
}
</style>