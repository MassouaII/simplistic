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
const editDesc = () => {
  store.editDesc(props.item.id);
};
const moveItem = (listId) => {
  let index = 0;
  for( let x = store.items.length -1; x >= 0; x-- ) {
    if( store.items[x].parentId === listId ) {
      index = x;
      break;
    }
  }
  store.moveItem( props.item.id, listId, index );
};
const parent = props.item.parentId;
</script>

<template>
  <div class="row w-100 d-flex align-items-start my-2">
    <div class="col-10" :class="{ 'text-decoration-line-through': props.item.completed }">
      <div @click="toggleDesc" class="addListLink">
        <div>{{ props.item.title }}</div>
        <div class="px-4 description" :style="{ 'display': props.item.showDesc ? 'block' : 'none' }">
          {{ props.item.description }}
        </div>
      </div>
    </div>
    <div class="content-align-right col-1">
      <input type="checkbox" :checked="props.item.completed" @change="toggleCompleted" >

    </div>
    <div class="col-1 text-end addListLink">
      <i class="bi bi-three-dots-vertical" data-bs-toggle="dropdown"></i>
      <ul class="dropdown-menu col-2">
        <li class="list-group-item" style="background-color: #FFDDDD" @click="removeItem">
          <span class="text-danger p-1 fw-bold addListLink">Delete</span>
        </li>

        <li v-if="store.getFilteredLists( parent ).length" class="list-group-item addListLink p-1 justify-content-between my-blue">
          Move to List
          <div v-for="list in store.getFilteredLists( parent )" :key="list.id"
                 @click="moveItem(list.id)" class="fst-italic text-end">
              {{ list.title }}
          </div>
        </li>
        <li class="list-group-item addListLink p-1 my-blue" data-bs-toggle="modal" data-bs-target="#addItemModal" @click="editDesc">
          Edit Description
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.addListLink { cursor: pointer; }

.my-blue{color: #4FC3DC;}

</style>