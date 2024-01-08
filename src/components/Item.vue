<script setup>
import { defineProps } from 'vue';
import { useItemStore } from '@/stores/item'; // Adjust the path as necessary

const props = defineProps({
  item: Object,
});

const store = useItemStore();

const toggleCompleted = () => {
  store.toggleCompleted(props.item.id);
};
const toggleDesc = () => {
  store.toggleDesc(props.item.id);
};
const removeItem = () => {
  store.removeItem(props.item.id);
};

const editDescription = (newDesc) => {
  store.editDesc(props.item.id, newDesc);
};
</script>

<template>
  <div class="row w-100 d-flex align-items-start my-2">
    <div class="col-10" :class="{ 'text-decoration-line-through': props.item.completed }">
      <div @click="toggleDesc">
        <div>{{ props.item.title }}</div>
        <div class="px-4 description" :style="{ 'display': props.item.showDesc ? 'block' : 'none' }">
          {{ props.item.description }}
        </div>
      </div>
    </div>
    <div class="content-align-right col-1">
      <input type="checkbox" :checked="props.item.completed" @change="toggleCompleted">
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
