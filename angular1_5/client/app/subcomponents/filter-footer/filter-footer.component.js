import template from './filter-footer.html';
import controller from './filter-footer.controller';

let filterFooterComponent = {
  bindings: {
  	todoList: '<',
  	statusMap: '<',
  	statusFilter: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default filterFooterComponent;
