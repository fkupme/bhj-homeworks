// не очень понял есть ли смысл сочетать классы с обычным функциями
// подключение <link rel="stylesheet" href="../../assets/css/style.css"> ломает работу моей прораммы не очень понял почему

class Hint {
	constructor(item, position) {
		this.item = item;
		this.position = position;
		this.createHint();
	}

	createHint() {
		const hint = document.createElement("div");
		hint.textContent = this.item.getAttribute('title');
		hint.classList.add('tooltip');
		this.hint = hint;

		this.item.parentNode.insertBefore(hint, this.item);


		this.setHintPosition(hint, this.position);
	}

	setHintPosition(hint, position) {
		const { left, top, height } = this.item.getBoundingClientRect()
		hint.style.position = 'absolute';

		hint.style.left = parseInt(left) + scrollX + 'px';
		switch (position) {
			case 'top':
				// как лучше было бы получить hint.style.top
				hint.style.top = parseInt(top) + scrollY - parseInt(height) - 10 + 'px';
				break;

			default:
				hint.style.top = parseInt(top) + scrollY + parseInt(height) + 'px';
				break;
		}
	}

	doVisible() {
		this.hint.classList.toggle('tooltip_active');
	}

	doInvisible() {
		this.hint.classList.remove('tooltip_active');
	}
}

const addHints = (position) => {
	const items = Array.from(document.querySelectorAll('.has-tooltip'))
	const hints = [];
	items.forEach((item, index) => {
		hints.push(new Hint(item, position))
		item.addEventListener('click', (e) => {
			e.preventDefault();

			hints[index].doVisible();

			hints.forEach((hint, i) => {
				if (i !== index) {
					hint.doInvisible();
				}
			});
		})
	});
	console.log(items, hints)
}
addHints();