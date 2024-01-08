<script setup>
import { defineProps } from 'vue';
import { useItemStore } from '@/stores/item'; // Adjust the path as necessary

defineProps({
  item: Object,
});

const store = useItemStore();

const toggleCompleted = () => {
  store.toggleCompleted(item.id);
};

const removeItem = () => {
  store.removeItem(item.id);
};

const editDescription = (newDesc) => {
  store.editDesc(item.id, newDesc);
};
</script>

<template>
  <div class="row w-100 d-flex align-items-start my-2">
    <div class="col-10" :class="{ 'text-decoration-line-through': item.completed }">
      <div>{{ item.title }}</div>
      <div class="px-4 description">
        {{ item.description }}
      </div>
    </div>
    <div class="content-align-right col-1">
      <input type="checkbox" v-model="item.completed" @change="toggleCompleted">
    </div>
    <div class="col-1 text-end dropstart">
      <i class="bi bi-three-dots-vertical" data-bs-toggle="dropdown"></i>
      <ul class="dropdown-menu col-2">
        <li class="list-group-item" style="background-color: #FFDDDD" @click="removeItem">
          <span class="text-danger p-1 fw-bold">Delete</span>
        </li>
        <li class="list-group-item cursor-pointer p-1">Move to Group</li>
        <li class="list-group-item cursor-pointer p-1" @click="editDescription('New Description')">Edit Description</li>
      </ul>
    </div>
  </div>
</template>
