import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterFooterComponent from './filter-footer.component';

let filterFooterModule = angular.module('footer', [
  uiRouter
])

.component('footer', filterFooterComponent);

export default filterFooterModule;
