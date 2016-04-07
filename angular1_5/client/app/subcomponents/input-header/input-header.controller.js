class InputHeaderController {
  constructor($scope) {
    this.$scope = $scope;
  }

  submitNewTodo(event) {
    let newTodoValue: string = event.target[0].value;
    this.$scope.$emit('newtodo', newTodoValue );
    this.clearTodoInput(event.target[0]);
  }
  
  clearTodoInput(target){
    target.value = "";
  }
}

InputHeaderController.$inject = ['$scope'];

export default InputHeaderController;
