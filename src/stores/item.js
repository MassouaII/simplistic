import {defineStore} from "pinia";

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
        filteredLists: [],
        nextIndex: 0,
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
            this.todoList = this.todoList.filter(x => x.id !== id);
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
        moveItem( itemId, listId, newIndex ) {
            const item = this.items.find(x => x.id === itemId);
            const list = this.todoList.find( x => x.id === listId );
            if( item && list ) {
                console.log( item, newIndex );
                item.parentId = list.id;
                this.items.splice( this.items.indexOf(item), 1 );
                this.items.splice( newIndex+1, 0, item );
            }
        },
        getFilteredLists( listId ) {
            return this.todoList.filter( x => x.id !== listId );
        },
        populateDatabase() {
            this.currentList = 0;
            this.addList("Work");
            this.addItem("Work on Project Report", "Try not to make the project report as interesting as watching paint dry.");
            this.addItem("Schedule Team Meeting", "Because scheduling meetings is more thrilling than a roller coaster ride.");
            this.addItem("Prepare Presentation Slides", "Create slides that will make your audience fall asleep... from excitement!");
            this.addItem("Send Project Updates", "Because sharing project updates is the highlight of your day.");
            this.addItem("Review and Respond to Emails", "Expect to find a treasure trove of spam and irrelevant messages.");
            this.addItem("Complete Coding Tasks", "Coding tasks - making your computer dreams come true, one bug at a time.");

            this.currentList = 1;
            this.addList("Personal");
            this.addItem("Buy Groceries for the Week", "Because grocery shopping is a mini adventure with your cart as the trusty steed.");
            this.addItem("Pay Monthly Bills", "Like a real-life game of Monopoly, but without the colorful money.");
            this.addItem("Clean the House", "Channel your inner Cinderella, minus the talking mice.");
            this.addItem("Call Plumber for Repairs", "Because plumbing problems always choose the most inconvenient times to surprise you.");
            this.addItem("Plan Family Dinner", "Get ready for culinary experiments and food-related debates.");
            this.addItem("Organize the Closet", "Where you confront the ghosts of fashion trends past.");
            this.addItem("Take out the Trash", "Because someone has to do it, and it's your turn!");

            this.currentList = 2;
            this.addList("Shopping");
            this.addItem("Buy Milk and Eggs", "Don't forget to play 'Spot the Discount' in the dairy aisle.");
            this.addItem("Get New Shoes", "Because your old shoes are secretly plotting against your feet.");
            this.addItem("Purchase Snacks", "For those moments when you're feeling snack-tacular.");
            this.addItem("Order Cleaning Supplies", "Because a clean home is just a few clicks away.");
            this.addItem("Pick up Laundry", "A journey to recover your clothes from the land of lost socks.");
            this.addItem("Check for Discounts Online", "Where your mouse is the magic wand for savings.");

            this.currentList = 3;
            this.addList("Home");
            this.addItem("Fix Leaking Faucet", "A drama featuring the dripping star of your kitchen.");
            this.addItem("Mow the Lawn", "Witness the epic battle between man and unruly grass.");
            this.addItem("Paint the Living Room", "Turn your living room into a canvas of color and creativity.");
            this.addItem("Install New Light Fixtures", "Because even light fixtures deserve an upgrade.");
            this.addItem("Organize the Garage", "Discover forgotten treasures, or at least locate your missing tools.");

            this.currentList = 4;
            this.addList("Fitness");
            this.addItem("Go for a 30-minute Run", "For those who believe running is the ultimate test of human willpower.");
            this.addItem("Do 20 Push-ups", "A journey to 20 push-ups and beyond... or at least an attempt.");
            this.addItem("Yoga and Meditation for 15 minutes", "Find your inner zen and attempt not to fall asleep.");
            this.addItem("Plan Next Week's Workout Routine", "Because planning workouts is the most athletic thing you can do right now.");

            this.currentList = 5;
            this.addList("Movies");
            this.addItem("Watch 'The Matrix' Movie", "Experience a world where reality is way less confusing than the plot.");
            this.addItem("Catch Up on 'Breaking Bad' Series", "Join Walter White on his quest to become the world's worst role model.");
            this.addItem("Find New Movie Recommendations", "Navigate the vast ocean of film choices with the help of your remote.");
            this.addItem("Make Popcorn and Snacks", "Because every movie night deserves an Oscar-worthy snack spread.");
        },
    }
})