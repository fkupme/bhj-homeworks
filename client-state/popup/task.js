class Popup {
	constructor(element) {
		this.element = document.getElementById(element);
		this.close = this.element.querySelector('.modal__close');
		this.connecting();
	};
	connecting() {
		document.addEventListener('scroll', () => {
			this.openPopup()
		}, { once: true });

		this.close.addEventListener('click', () => {
			this.closePopup();
		});
	};

	openPopup() {
		if (!this.getCookie('value')) {
			this.element.classList.add('modal_active');
		};
	};

	closePopup() {
		this.element.classList.remove('modal_active');
		this.addCookie('value', 'wasOpend');
	}

	addCookie(name, value) {
		document.cookie = name + '=' + encodeURIComponent(value);
	}

	getCookie(name) {
		try {
			return document.cookie.split('; ')
				.find(item => item.startsWith(name + '='))
				.substring(name.length + 1);
		} catch (error) {
			return null;
		}

	}
}
const popup = new Popup('subscribe-modal')