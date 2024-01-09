<script setup>
import Item from "@/components/Item.vue";
import { useItemStore } from "@/stores/item.js";
import { defineProps } from 'vue';
import draggable from "vuedraggable";

const props = defineProps({ list: Object });

const store = useItemStore();
const filteredItems = (listId) => store.items.filter(item => item.parentId === listId);

const removeList = () => {
  store.removeList( props.list.id );
};
const handleDrag = (event) => {
  if( event.added )
    store.moveItem( event.added.element.id, props.list.id )
};
</script>

<template>
      <div id="wrapper" >
        <div class="card w-100 custom-card m-2 position-relative">
          <img src="../images/CardHeader_1.png" alt="Background Image for Card" class="img-fluid custom-card-img">
          <div class="card-header d-flex justify-content-between">
            <span class="h3">{{ props.list.title }}</span>
            <div class="col-1 text-end dropdown">
              <svg aria-expanded="false" data-bs-toggle="dropdown" role="button"
                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                   fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
              <ul class="dropdown-menu col-2">
                <li class="list-group-item my-blue p-1 text-center"
                    @click="store.setCurrentListId(props.list.id)"
                    data-bs-toggle="modal" data-bs-target="#addItemModal">
                  Add Item to List
                </li>
                <li class="list-group-item">
                  <span class="text-danger p-1 fw-bold" @click="removeList">Delete</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body d-flex flex-wrap flex-column w-100">
            <div class="list-group list-group-flush flex-grow-1 w-100">
              <draggable class="list-group list-group-flush flex-grow-1 w-100"
                         :list="filteredItems(props.list.id)"
                         item-key="id"
                         group="items"
                         @change="handleDrag">
                <template #item="{ element }">
                  <Item :item="element" />
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </div>

</template>

<style scoped>
.custom-card {
  background-color: #EEEEEE;
  color: black;
  border-bottom: none;
  min-width: 350px;
  max-width: 350px;
}
li { cursor: pointer; }
.custom-card-img { max-height: 170px; max-width: 350px; }
.my-blue{color: #4FC3DC;}

</style>
