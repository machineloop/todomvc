import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todosMainComponent from './todos-main.component';

let todosMainModule = angular.module('section', [
  uiRouter
])

.component('section', todosMainComponent);

export default todosMainModule;
