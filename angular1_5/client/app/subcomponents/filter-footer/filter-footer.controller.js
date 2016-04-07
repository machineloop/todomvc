class FilterFooterController {
	constructor($scope) {
		this.$scope = $scope;
		this._statuses = this.getStatuses();
	}

	getTodos(statusFilter) {
		return this.todoList.filter(this.statusMap[statusFilter]);
	}

	getStatuses(statusFilter){
		let filter = statusFilter || this.statusFilter;
		return Object.keys(this.statusMap).map((status)=>{
			return (status !== filter) ? {status: status} : {status: status, selected: "selected"};
		});
	}

	switchFilter(event){
		let status = event.target.textContent;
		this.$scope.$emit('switch_filter', status );
		this._statuses = this.getStatuses( status );
	}

	clearCompleted(){
		this.$scope.$emit('clear_completed');
	}
}

FilterFooterController.$inject = ['$scope'];

export default FilterFooterController;
