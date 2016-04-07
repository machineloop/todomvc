class TodosMainController {
	constructor($scope) {
		this.$scope = $scope;
		this._editingIndex = -1;
	}

	getFilteredTodos(filter) {
		return this.todoList.filter( this.statusMap[ this.statusFilter ]);
	}

	toggleEdit(event, index){
		this._editingIndex = index;
		setTimeout(() => event.target.parentElement.nextElementSibling.firstElementChild.focus(), 0);
	}

	toggleAllComplete(event){
		let isChecked = event.target.checked;
		this.$scope.$emit('toggle_AllComplete', isChecked );
	}

	toggleStatus(todoIndex) {
		this.$scope.$emit('toggle_Status', todoIndex );
	}

	removeTodo(index){
		this.$scope.$emit('remove_Todo', index );
	}

	updateTodo(event, index) {
		let value = (event.type ==="submit") ? event.target.querySelector('input').value : event.target.value;
		this.$scope.$emit('update_Todo', [value, index]);
		this._editingIndex = -1;
	}
}

TodosMainController.$inject = ['$scope'];

export default TodosMainController;
