import template from './todos-main.html';
import controller from './todos-main.controller';

let todosMainComponent = {
  bindings: {
  	todoList: '<',
  	statusMap: '<',
  	statusFilter: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default todosMainComponent;
