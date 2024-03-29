<script setup>
import List from "@/components/List.vue";
import { onMounted, ref, watch } from "vue";
import { useItemStore } from "@/stores/item.js";

const store = useItemStore();
const newListTitle = ref('');
const addItemModal = ref(null);
let newItemTitle = ref('');
let newItemDescription = ref('');
let newIndex = 0;

const addList = () => {
  store.addList(newListTitle.value);
  newListTitle.value = ''; // Reset the input field after adding
};
const addItem = () => {
  if( store.editId > -1 ) {
    store.editItem( store.editId, newItemTitle.value, newItemDescription.value );
  } else {
    store.addItem( newItemTitle.value, newItemDescription.value );
  }
  store.editId = -1;
  newItemTitle.value = '';
  newItemDescription.value = '';
};
const resetEditMode = () => {
  store.editId = -1;
  newItemTitle.value = '';
  newItemDescription.value = '';
};

const createHeader = () => {
  const words = ["Linkable", "Information", "Sorting", "Toolkit"];
  let currentWordIndex = 0;
  let intervalId;
  let accumulatedLetters = '';

  const updateHeader = () => {
    const accumulatedSpan = document.getElementById('accumulated');
    const dynamicPart = document.getElementById('dynamic-part');
    let currentWord = words[currentWordIndex];
    dynamicPart.textContent = currentWord;

    intervalId = setInterval(() => {
      if (currentWord.length > 1) {
        currentWord = currentWord.slice(0, -1);
        dynamicPart.textContent = " " + currentWord;
      } else {
        clearInterval(intervalId);
        dynamicPart.textContent = ' ';
        accumulatedLetters += currentWord.charAt(0);
        accumulatedSpan.textContent = accumulatedLetters;
        if (currentWordIndex < words.length - 1) {
          currentWordIndex++;
          accumulatedLetters += ' ';
          setTimeout(updateHeader, 100); // Small delay before starting next word
        } else {
          document.getElementById("simp").style.display = "block";
          document.getElementById("ic").style.display = "block";
          document.getElementById("dynamic-part").style.display = "none";
        }
      }
    }, 100);
  };
  updateHeader();
};

onMounted( () => {
  createHeader();
  if (addItemModal.value) {
    addItemModal.value.addEventListener('hidden.bs.modal', resetEditMode);
  }
});
watch(() => store.editId, (newId) => {
  if (newId !== -1) {
    const itemToEdit = store.items.find(item => item.id === newId);
    if (itemToEdit) {
      newItemTitle.value = itemToEdit.title;
      newItemDescription.value = itemToEdit.description;
    }
  } else {
    newItemTitle.value = '';
    newItemDescription.value = '';
  }
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid col-md-10 offset-md-1 justify-content-between">
      <a class="navbar-brand ms-4 h2" href="#">
        <div id="header" class="d-flex">
          <span id="simp" class="subtle">S I M P&nbsp;</span>
          <span title="Linkable Information Sorting Toolkit">
            <span id="accumulated" class="color-class"></span>&nbsp;
          </span>
          <span id="dynamic-part"></span>
          <span id="ic" style="display: none" class="subtle">I C </span>
        </div>
      </a>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a title="Add a new list!" data-bs-toggle="modal" data-bs-target="#addListModal" class="text-black addListLink">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

    <div class="d-flex justify-content-around flex-wrap m-0 w-100">
      <List v-for="list in store.todoList" :key="list.id" :list="list"/>
    </div>

    <div id="floating-button" style="opacity: 0.5; cursor: pointer;"
         class="position-fixed bottom-0 end-0 m-2 bg-warning rounded-circle" >
      <span class="bi bi-plus text-white" style="font-size: 1.5rem;" @click="store.populateDatabase"></span>
    </div>


  <!-- MODAL FOR ADDING ITEMS -->
  <div class="modal fade" id="addItemModal" tabindex="-1" ref="addItemModal"
       aria-labelledby="addItemModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title light-grey" id="addItemModalLabel">Add New Item</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-dark text-white">
          <form @submit.prevent="addItem">
            <div class="mb-3">
              <label for="itemTitle" class="form-label">Title</label>
              <input type="text" class="form-control" id="itemTitle" v-model="newItemTitle" ref="itemTitleInput">
            </div>
            <div class="mb-3">
              <label for="itemDescription" class="form-label">Description</label>
              <textarea class="form-control" id="itemDescription" v-model="newItemDescription"></textarea>
            </div>
            <button type="submit" class="btn border-c p-button w-100" data-bs-dismiss="modal">Add Item</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL -->


  <!-- MODAL FOR ADDING LISTS -->
  <div class="modal fade" id="addListModal" tabindex="-1"
       aria-labelledby="addListModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title light-grey" id="addListModalLabel">Add New List</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-dark text-white">
          <form @submit.prevent="addList">
            <div class="mb-3">
              <label for="itemTitle" class="form-label text-white">Title</label>
              <input type="text" class="form-control box-shadow" id="itemTitle" v-model="newListTitle">
            </div>
            <button type="submit" class="btn border-c p-button w-100" data-bs-dismiss="modal">Add List</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL -->

</template>

<style scoped>
.modal-content, .modal-body { background-color: #343a40 !important; }
.modal-title, .modal-header { background-color: #111 !important; }

@keyframes colorTransition {
  0%, 100% {
    color: #222;
  }
  50% {
    color: white;
  }
}

.subtle {
  animation: colorTransition 32s infinite;
}
.addListLink { cursor: pointer; }

.light-grey{color: grey;}
.p-button{background-color: #4FC3DC;}
.border-c{border-color: grey;}

</style>