class HomeController {
	constructor($scope) {
		this.$scope = $scope;

		this.statusMap = {
		  all: () => true,
		  active: (todo) => todo.isCompleted === false,
		  completed: (todo) => todo.isCompleted === true
		}

		this.todoList = [];
		this.filteredTodos = [];
		this.statusFilter = "all";
		this.toggleAllChecked = false;
	}

	$onInit(){
		this.$scope.$on('newtodo', (e, todoText) => this.newTodoInput(todoText));
		this.$scope.$on('toggle_AllComplete', (e, isChecked) => this.toggleAllComplete(isChecked));
		this.$scope.$on('toggle_Status', (e, todoIndex) => this.toggleStatus(todoIndex));
		this.$scope.$on('remove_Todo', (e, todoIndex) => this.removeTodo(todoIndex));
		this.$scope.$on('update_Todo', (e, valueIndex) => this.updateTodo(valueIndex));
		this.$scope.$on('switch_filter', (e, valueIndex) => this.switchFilter(valueIndex));
		this.$scope.$on('clear_completed', (e, valueIndex) => this.clearCompleted());
	}

	newTodoInput(todoText) {
		todoText && this.todoList.push( {value: todoText, isCompleted: false } );
	}

	toggleAllComplete(isChecked){
		this.toggleAllChecked = isChecked;
		this.todoList = this.todoList.map((todo) => (this.toggleAllChecked) ? { value: todo.value, isCompleted: true } : { value: todo.value, isCompleted: false });
	}

	toggleStatus(todoIndex) {
		var todo = this.todoList[ todoIndex ];
		todo.isCompleted = !todo.isCompleted;
		this.todoList[ todoIndex ] = todo;
		this.toggleAllChecked = false;
	}

	removeTodo(index){
		this.todoList = this.todoList.filter((t, i) => index !== i)
	}

	switchFilter(status){
		this.statusFilter = status;
	}

	clearCompleted(){
		this.todoList = this.todoList.filter((todo) => todo.isCompleted !== true);
	}

	updateTodo(valueIndex) {
		var [value, index] = valueIndex;
		var todo = this.todoList[ index ];
		todo.value = value;
		this.todoList[ index ] = todo;
	}
}

HomeController.$inject = ['$scope'];

export default HomeController;
