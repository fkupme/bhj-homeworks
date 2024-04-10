class BookReader {
	constructor(container) {
		this.container = document.getElementById(container);

		this.text = this.container.querySelector('.book__content')
		this.bookControls = Array.from(this.container.querySelectorAll('.book__control'));

		this.fontSizeButtons = Array.from(this.bookControls[0].querySelectorAll('a'));
		this.textColorButtons = Array.from(this.bookControls[1].querySelectorAll('a'));
		this.backgroundColorButtons = Array.from(this.bookControls[2].querySelectorAll('a'));

		this.start();
	}

	start() {
		document.addEventListener('DOMContentLoaded', () => {
			this.setFontSize();
			this.setTextColor();
			this.setBackgroundColor();
			[this.fontSizeButtons, this.textColorButtons, this.backgroundColorButtons]
				.forEach(buttons => buttons
					.forEach(button => button.addEventListener('click', (e) =>
						e.preventDefault()
					)))
			this.getCurrents()
		});
	}

	getCurrents(style) {
		switch (style) {
			case 'fontSize':
				this.currentFontSize = this.fontSizeButtons.find(button => button.classList.contains('font-size_active'));
				break;
			case 'textColor':
				this.currentTextColor = this.textColorButtons.find(button => button.classList.contains('color_active'));
				break;
			case 'backgroundColor':
				this.currentBackgroundColor = this.backgroundColorButtons.find(button => button.classList.contains('color_active'));
				break;

			default:
				this.currentFontSize = this.fontSizeButtons.find(button => button.classList.contains('font-size_active'));
				this.currentTextColor = this.textColorButtons.find(button => button.classList.contains('color_active'));
				this.currentBackgroundColor = this.backgroundColorButtons.find(button => button.classList.contains('color_active'));
				break;
		}
	}

	setFontSize() {
		this.fontSizeButtons.forEach(item => item
			.addEventListener('click', () => {
				const size = item.getAttribute('data-size');

				this.currentFontSize.classList.remove('font-size_active');

				switch (size) {
					case 'small':
						item.classList.add('font-size_active');
						this.text.classList.add('book_fs-small')
						this.text.classList.remove('book_fs-big')
						break;

					case 'normal':
						item.classList.add('font-size_active');
						this.text.classList.remove('book_fs-small')
						this.text.classList.remove('book_fs-big')
						break;

					case 'big':
						item.classList.add('font-size_active');
						this.text.classList.remove('book_fs-small')
						this.text.classList.add('book_fs-big');
						break;

				}
				this.getCurrents('fontSize');
			}))
	}

	setTextColor() {
		this.textColorButtons.forEach(item => item
			.addEventListener('click', () => {
				const color = item.getAttribute('data-text-color');

				this.currentTextColor.classList.remove('color_active');

				switch (color) {
					case 'black':
						item.classList.add('color_active');
						this.text.classList.add('book_color-black');
						this.text.classList.remove('book_color-gray')
						this.text.classList.remove('book_color-whitesmoke')
						break;

					case 'gray':
						item.classList.add('color_active');
						this.text.classList.add('book_color-gray');
						this.text.classList.remove('book_color-whitesmoke');
						this.text.classList.remove('book_color-black');
						break;

					case 'whitesmoke':
						item.classList.add('color_active');
						this.text.classList.add('book_color-whitesmoke');
						this.text.classList.remove('book_color-black');
						this.text.classList.remove('book_color-gray')
						break;

				}
				this.getCurrents('textColor');
			}))
	}

	setBackgroundColor() {
		this.backgroundColorButtons.forEach(item => item
			.addEventListener('click', () => {
				const color = item.getAttribute('data-bg-color');

				this.currentBackgroundColor.classList.remove('color_active');

				switch (color) {
					case 'black':
						item.classList.add('color_active');
						this.text.classList.add('book_bg-black');
						this.text.classList.remove('book_bg-white');
						this.text.classList.remove('book_bg-gray');
						break;

					case 'gray':
						item.classList.add('color_active');
						this.text.classList.add('book_color-gray');
						this.text.classList.remove('book_bg-white');
						this.text.classList.remove('book_bg-black');
						break;

					case 'white':
						item.classList.add('color_active');
						this.text.classList.add('book_bg-white');
						this.text.classList.remove('book_bg-gray');
						this.text.classList.remove('book_bg-black');
						break;

				}
				this.getCurrents('backgroundColor');
			}))
	}

}

new BookReader('book');