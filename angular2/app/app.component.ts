import {Component, EventEmitter, Output} from 'angular2/core';
import {inputHeader} from './input-header/input-header.component';
import {todosMain} from './todos-main/todos-main.component';
import {filterFooter} from './filter-footer/filter-footer.component'

@Component({
	selector: '.todoapp',
	templateUrl: 'app/app.component.html',
	styles: [`
		li a {
			text-transform: capitalize;
		}
	`],
	directives: [inputHeader, todosMain, filterFooter],
	providers: []
})
export class AppComponent {
	todoAppTitle: string = 'todos';
	todoInputPlaceholder: string = 'What needs to be done?';
	
	statusMap = {
		all: () => true,
		active: (todo) => todo.isCompleted === false,
		completed: (todo) => todo.isCompleted === true
	}

	todoList = [];
	statusFilter = "all";
	toggleAllChecked = false;

	newTodoInput(todoText) {
		todoText && this.todoList.push( {value: todoText, isCompleted: false } );
	}

	toggleAllComplete(isChecked: boolean){
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