<script setup>
import Item from "@/components/Item.vue";
</script>

<template>
  <div class="home row">
    <div class="col-12">
      <div id="wrapper" class="d-flex justify-content-around flex-wrap m-2 w-100">
        <div class="card w-100 custom-card m-2 position-relative">
          <img src="../images/CardHeader_1.png" alt="Background Image for Card" class="img-fluid custom-card-img">
          <div class="card-header d-flex justify-content-between">
            <span class="h3">List Name</span>
            <div class="col-1 text-end dropdown">
              <svg aria-expanded="false" data-bs-toggle="dropdown"
                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                   fill="currentColor" class="bi bi-three-dots dropdown-toggle" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
              <ul class="dropdown-menu dropdown-menu-end col-2">
                <li class="list-group-item text-primary p-1"
                    data-bs-toggle="modal" data-bs-target="#addItemModal">
                  Add Item to List
                </li>
                <li class="list-group-item">
                  <span class="text-danger p-1 fw-bold">Delete</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body d-flex flex-wrap flex-column w-100">
            <div class="list-group list-group-flush flex-grow-1 w-100">
              <Item key="1" item="Item" groupTitle="List"/> <!-- Change to v-for -->
            </div>
          </div>
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
</style>
