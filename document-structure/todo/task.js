//по ощущениям перемудрил

class Planer {
	constructor(container) {
		this.container = document.getElementById(container);

		this.form = this.container.querySelector('.tasks__control');
		this.input = this.form.querySelector('.tasks__input');
		this.button = this.form.querySelector('.tasks__add');

		this.list = this.container.querySelector('.tasks__list');

		this.getData();
		this.getTasksFromStorage();
		this.deleteTask();
	}

	getData() {
		let index = 0
		window.localStorage.length ? index = window.localStorage.length : index = 0
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();

			const data = this.input.value
			if (!data) {
				return
			}

			let task = this.createTask(data, index);
			index++;
			this.addToStorage(index, data);

			this.list.appendChild(task);
			this.deleteTask();
			this.form.reset();
		})
	}


	createTask(data, index) {
		const task = document.createElement('div')
		task.classList.add('task');
		task.setAttribute('index', `${index}`)

		const taskValue = document.createElement('div')
		taskValue.classList.add('task__title');
		taskValue.textContent = data;

		const taskButton = document.createElement('a')
		taskButton.classList.add('task__remove');
		taskButton.href = '#';
		taskButton.innerHTML = '&times;';
		taskButton.setAttribute('index', `${index}`)
		taskButton.addEventListener('click', (e) => e.preventDefault());

		task.appendChild(taskValue);
		task.appendChild(taskButton);
		return task;

	}


	addToStorage(index, task) {
		window.localStorage.setItem(`${index}`, `${task}`);
	}

	getTasksFromStorage() {
		const storage = window.localStorage
		for (const [key, value] of Object.entries(storage)) {
			this.list.appendChild(this.createTask(value, key));
		}
	}

	deleteTask() {
		const buttons = Array.from(document.querySelectorAll('.task__remove'))
		const tasks = Array.from(document.querySelectorAll('.task'))
		buttons.forEach(button => {
			button.addEventListener('click', () => {

				const index = button.getAttribute('index')
				window.localStorage
					.removeItem(`${index}`);

				tasks.find(task => task
					.getAttribute('index') === index).remove();
			})
		})
	}
}

const plan = new Planer('tasks')