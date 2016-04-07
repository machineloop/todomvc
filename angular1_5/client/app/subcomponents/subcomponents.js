import angular from 'angular';
import inputHeader from './input-header/input-header';
import todosMain from './todos-main/todos-main';
import filterFooter from './filter-footer/filter-footer';
import User from './user/user';

let commonModule = angular.module('app.common', [
  inputHeader.name,
  todosMain.name,
  filterFooter.name,
  User.name
]);

export default commonModule;
