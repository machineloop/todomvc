import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({
	selector: '.main',
	template: `
		<input class="toggle-all" type="checkbox" (click)="toggleAllComplete($event)" [checked]="toggleAllChecked">
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			<li *ngFor="#todo of todoList; #i = index" [class.completed]="todo.isCompleted" [class.editing]="_editingIndex === i">
				<div class="view">
					<input class="toggle" type="checkbox" [checked]="todo.isCompleted" (click)="toggleStatus(i)">
					<label (dblclick)="toggleEdit($event, i)">{{ todo.value }}</label>
					<button class="destroy" (click)="removeTodo(i)"></button>
				</div>
				<form (submit)="updateTodo($event, i)">
					<input *ngIf="_editingIndex === i" type="text" class="edit" value="{{ todo.value }}" (blur)="updateTodo($event, i)">
					<input *ngIf="_editingIndex === i" type="submit" name="update" hidefocus="true" tabindex="-1"/>
				</form>
			</li>
		</ul>
	`
})
export class todosMain {
	@Input('todo-list') todoList;
	@Output() toggle_AllComplete = new EventEmitter();
	@Output() toggle_Status = new EventEmitter();
	@Output() remove_Todo = new EventEmitter();
	@Output() update_Todo = new EventEmitter();

	_editingIndex = -1;

	toggleEdit(event, index){
		this._editingIndex = index;
		setTimeout(() => event.target.parentElement.nextElementSibling.firstElementChild.focus(), 0);
	}

	toggleAllComplete(event){
		let toggleAllChecked: boolean = event.target.checked;
		this.toggle_AllComplete.emit( toggleAllChecked );
	}

	toggleStatus(todoIndex) {
		this.toggle_Status.emit( todoIndex );
	}

	removeTodo(index){
		this.remove_Todo.emit( index );
	}

	updateTodo(event, index) {
		let value = (event.type ==="submit") ? event.target.querySelector('input').value : event.target.value;
		this.update_Todo.emit([value, index]);
		this._editingIndex = -1;
	}
}
