import {defineStore} from "pinia";

export const useItemStore = defineStore('item', {
    state: () => ({
        todoList: [],
        items: [],
        nextTodoId: 0,
        nextItemId: 0
    }),
    actions: {
        addList(newListTitle) {
            this.todoList.push({id: this.nextTodoId, title: newListTitle});
            this.nextTodoId++;
        },
        addItem(listId, shortDescription, longDescription) {
            this.items.push({
                id: this.nextItemId,
                parentId: listId,
                title: shortDescription,
                description: longDescription,
                completed: false,
            })
            this.nextItemId++;
        },
        removeList(id) {
            this.todoList = this.todoList.filter(x => x.id !== id);
        },
        removeItem(id) {
            this.items = this.items.filter(x => x.id !== id);
        },
        toggleCompleted(findId) {
            const todo = this.items.find(x => x.id === findId);
            if (todo) todo.completed = !todo.completed;
        },
        editDesc(id, desc) {
            const todo = this.items.find(x => x.id === id);
            if (todo) todo.longDescription = desc;
        }
    }
})