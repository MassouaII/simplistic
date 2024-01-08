import {defineStore} from "pinia";
import {ref} from "vue";

export const useItemStore = defineStore('item', {
    state: () => ({
        todoList: [],
        items: [],
        nextTodoId: 0,
        nextItemId: 0,
        currentList: 0,
        editId: -1,
        newItemTitle: null,
        newItemDescription: null,
    }),
    actions: {
        addList(newListTitle) {
            this.todoList.push({id: this.nextTodoId, title: newListTitle});
            this.nextTodoId++;
        },
        addItem( shortDescription, longDescription) {
            this.items.push({
                id: this.nextItemId,
                parentId: this.currentList,
                title: shortDescription,
                description: longDescription,
                completed: false,
                showDesc: false
            })
            this.nextItemId++;
        },
        editItem( itemId, shortDescription, longDescription ) {
          const todo = this.items.find( x => x.id === itemId );
          if( todo ) {
              todo.title = shortDescription;
              todo.description = longDescription;
          }
        },
        removeList(id) {
            console.log(id);
            console.log(JSON.parse(JSON.stringify(this.todoList)));
            this.todoList = this.todoList.filter(x => x.id !== id);
            console.log(JSON.parse(JSON.stringify(this.todoList)));
        },
        removeItem(id) {
            this.items = this.items.filter(x => x.id !== id);
        },
        toggleCompleted(findId) {
            const todo = this.items.find(x => x.id === findId);
            if (todo) todo.completed = !todo.completed;
        },
        editDesc(id) {
            this.editId = id;
        },
        setCurrentListId(id) {
            this.currentList = id;
        },
        toggleDesc(id) {
            const todo = this.items.find(x => x.id === id);
            if (todo) todo.showDesc = !todo.showDesc;
        },
        moveItem( itemId, listId ) {
            const item = this.items.find(x => x.id === itemId);
            const list = this.todoList.find( x => x.id === listId );
            if( item && list ) item.parentId = list.id;
        }
    }
})