class Redactor {
	constructor(container) {
		this.container = document.querySelector(container);
		this.field = this.container.querySelector('textarea');

		this.buttons = {};
		this.connecting();
	};

	connecting() {
		this.field.addEventListener('keydown', () => {
			this.saveText(this.field.value)
		});

		this.createButtons();

		this.buttons.continue.addEventListener('click', () => {
			this.continueEditing();
		});

		this.buttons.clear.addEventListener('click', () => {
			this.clearField();
		});
	};

	saveText(text) {
		window.localStorage.text = text;
	};

	continueEditing() {
		this.field.value = window.localStorage.text;
	};

	clearField() {
		window.localStorage.text = '';
		this.field.value = '';
	};

	createButtons() {
		this.buttons.continue = document.createElement('button');
		this.buttons.clear = document.createElement('button');
		this.buttons.continue.textContent = 'Продолжить редактирование';
		this.buttons.clear.textContent = 'Очистить поле';

		Object.values(this.buttons).forEach(button => {
			this.container.appendChild(button);
			button.setAttribute('type', 'button');
			button.style.marginRight = '10px';
			button.style.padding = '5px 10px';
		});

	};
}
const r = new Redactor('.card');
document.addEventListener('change', () => {
	console.log(window.localStorage.text)
});