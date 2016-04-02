import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({
	selector: '.main',
	template: `
		<input class="toggle-all" type="checkbox" (click)="toggleAllComplete($event)" [checked]="toggleAllChecked">
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			<li *ngFor="#todo of filterTodos(); #i = index" [class.completed]="todo.isCompleted">
				<div class="view">
					<input class="toggle" type="checkbox" [checked]="todo.isCompleted" (click)="toggleStatus(i)">
					<label>{{ todo.value }}</label>
					<button class="destroy" (click)="removeTodo(i)"></button>
				</div>
			</li>
		</ul>
	`
})
export class todosMain {
	@Input('todo-list') todoList;
	@Input('status-map') statusMap;
	@Input('status-filter') statusFilter;
	@Output() toggle_AllComplete = new EventEmitter();
	@Output() toggle_Status = new EventEmitter();
	@Output() remove_Todo = new EventEmitter();

	toggleAllComplete(event){
		let toggleAllChecked: boolean = event.target.checked;
		this.toggle_AllComplete.emit( toggleAllChecked );
	}

	filterTodos() {
		return this.todoList.filter( this.statusMap[ this.statusFilter ] );
	}

	toggleStatus(todoIndex) {
		this.toggle_Status.emit( todoIndex );
	}

	removeTodo(index){
		this.remove_Todo.emit( index );
	}
}