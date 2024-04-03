
class Dropdown {
	constructor(button, list, listItem) {
		this.button = document.querySelector(button);
		this.list = document.querySelector(list);
		this.listItemArray = Array.from(document.querySelectorAll(listItem));
		this.openMenu();
	}

	openMenu() {
		this.button.addEventListener('click', () => {
			this.list.classList.toggle('dropdown__list_active');
		});

		this.useMenu();
	}

	useMenu() {
		this.listItemArray.forEach(item => item
			.addEventListener('click', (e) => {
				e.preventDefault();
				this.button.textContent = item.textContent
				this.list.classList.remove('dropdown__list_active');
			}))
	}

}

const dropdown = new Dropdown('.dropdown__value', '.dropdown__list', '.dropdown__link')