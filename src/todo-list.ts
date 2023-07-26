import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TailwindElement } from './shared/tailwind.element';

// Creating a todo type to enforce structure
type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

import style from './todo-list.scss?inline';

@customElement('todo-list')
export class TodoList extends TailwindElement(style) {
	static myStyles = [
		css`
			:host {
				display: block;
				max-width: 960px;
				margin: 0 auto;
			}

			h2 {
				margin: 0;
			}

			ul {
				list-style-type: none;
				margin: 0;
				padding: 0;
			}

			.completed {
				text-decoration-line: line-through;
			}
		`
	];

	constructor() {
		super();

		const localTodos = window.localStorage.getItem('todos');
		if (localTodos) this.todos = JSON.parse(localTodos);
	}

	@property({ type: Array })
	todos = new Array<Todo>();

	@query('#newItem')
	input!: HTMLInputElement;

	// Add todo to the list and update localstorage & tell lit to update
	addTodo(e: Event) {
		e.preventDefault();

		this.todos.push({ id: this.todos.length + 1, text: this.input.value, completed: false });
		window.localStorage.setItem('todos', JSON.stringify(this.todos));
		this.input.value = '';

		this.requestUpdate();
	}

	doneTodo(pTodo: Todo) {
		pTodo.completed = !pTodo.completed;
		window.localStorage.setItem('todos', JSON.stringify(this.todos));

		this.requestUpdate();
	}

	removeTodo(pTodo: Todo) {
		const todos = this.todos.filter((todo) => todo.id !== pTodo.id);
		this.todos = todos;
		window.localStorage.setItem('todos', JSON.stringify(this.todos));

		this.requestUpdate();
	}

	// Toggle the todo item state and update local storage & tell lit to update
	// Takes in a param of todo item
	toggleTodo(item: Todo) {
		item.completed = !item.completed;
		window.localStorage.setItem('todos', JSON.stringify(this.todos));

		this.requestUpdate();
	}

	render() {
		const todos = html`
			<div>
				${this.todos.map(
					(todo) =>
						html`
							<div class="flex mb-4 items-center">
								<label class="w-full ${todo.completed ? 'line-through text-green' : 'text-grey-darkest'}">
									<input type="checkbox" ?checked=${todo.completed} @click=${() => this.toggleTodo(todo)} />
									<span>${todo.text}</span>
								</label>

								<button
									@click=${() => this.doneTodo(todo)}
									class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
									Done
								</button>

								<button @click=${() => this.removeTodo(todo)} class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
									Remove
								</button>
							</div>
						`
				)}
			</div>
		`;

		const noTodosMessage = `Looks like you're all caught up.`;
		const todosOrMessage = this.todos.length ? todos : noTodosMessage;

		return html`
			<h1 class="text-3xl font-bold text-center">Todo List Project!</h1>

			<div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
				<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
					<div class="mb-4">
						<h1 class="text-grey-darkest">Todo List</h1>

						<form @submit=${this.addTodo} class="flex mt-4">
							<input id="newItem" placeholder="New todo" aria-label="New todo" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" />
							<button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
						</form>
					</div>

					${todosOrMessage}
				</div>
			</div>
		`;
	}
}