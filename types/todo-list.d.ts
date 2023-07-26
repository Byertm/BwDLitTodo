import { LitElement } from 'lit';
import { Todo } from './todo-item';

export declare class TodoList extends LitElement {
	static styles: import('lit').CSSResult[];

	constructor();

	todos: Todo[];
	input: HTMLInputElement;

	addTodo(e: Event): void;
	toggleTodo(item: Todo): void;
	render(): import('lit-html').TemplateResult<1>;
}

export {};