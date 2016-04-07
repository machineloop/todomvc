import angular from 'angular';
import uiRouter from 'angular-ui-router';
import inputHeaderComponent from './input-header.component';

let inputHeaderModule = angular.module('header', [
  uiRouter
])

.component('header', inputHeaderComponent);

export default inputHeaderModule;
