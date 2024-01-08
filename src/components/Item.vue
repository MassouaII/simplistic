<script>

</script>


<template>
  <div class="row w-100 d-flex align-items-start my-2">
    <div class="col-10" :class="{ 'text-decoration-line-through': 1 }">
      <div>Item</div>
      <div class="px-4 description" >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet commodi dignissimos dolores dolorum eius excepturi hic impedit odio possimus ut. Blanditiis consequuntur esse et quidem repellat repellendus repudiandae, temporibus voluptatum!
      </div>
    </div>
    <div class="content-align-right col-1">
      <input type="checkbox" >
    </div>
    <div class="col-1 text-end dropstart">
      <i class="bi bi-three-dots-vertical"></i>
      <ul class="dropdown-menu col-2">
        <li class="list-group-item" style="background-color: #FFDDDD"><span  class="text-danger p-1 fw-bold">Delete</span></li>
        <li class="list-group-item cursor-pointer p-1" >Move to Group </li>
        <li  class="list-group-item cursor-pointer p-1">Edit Description</li>
      </ul>
    </div>
  </div>
</template>