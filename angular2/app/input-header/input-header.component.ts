import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
	selector: 'header',
	template: `
		<h1>{{ title }}</h1>
		<form (submit)="submitNewTodo($event)">
		<input class="new-todo"
			   placeholder="{{ todoInputPlaceholder }}"
			   autofocus
			   >
		<input type="submit" name="update" hidefocus="true" tabindex="-1"/>
	`
})
export class inputHeader {
	@Input('title') title;
	@Input('input-placeholder') todoInputPlaceholder;
	@Output() newtodo = new EventEmitter();

	submitNewTodo(event) {
		let newTodoValue: string = event.target[0].value;
		this.newtodo.emit( newTodoValue );
		this.clearTodoInput(event.target[0]);
	}
	clearTodoInput(target){
		target.value = "";
	}
}