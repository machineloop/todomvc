import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
	selector: '.footer',
	template: `
		<span class="todo-count">
			<strong>{{ getTodos("active").length }}</strong> items left
		</span>
		<ul class="filters">
			<li *ngFor="#status of getStatuses()">
				<a href="#" (click)="switchFilter($event)" class="{{status?.selected}}">{{ status.status }}</a>
			</li>
		</ul>
		<button class="clear-completed" (click)="clearCompleted()" *ngIf="getTodos('completed').length">Clear completed</button>
	`
})
export class filterFooter {
	@Input('todo-list') todoList;
	@Input('status-map') statusMap;
	@Input('status-filter') statusFilter;
	@Output() switch_filter = new EventEmitter();
	@Output() clear_completed = new EventEmitter();

	getTodos(statusFilter: string) {
		return this.todoList.filter(this.statusMap[statusFilter]);
	}

	getStatuses(){
		return Object.keys(this.statusMap).map((status)=>{
			return (status !== this.statusFilter) ? {status: status} : {status: status, selected: "selected"};
		});
	}

	switchFilter(event){
		let status = event.target.textContent;
		this.switch_filter.emit( status );
	}

	clearCompleted(){
		this.clear_completed.emit('');
	}
}
