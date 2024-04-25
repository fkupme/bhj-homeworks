class FormAuth {
	constructor(container) {
		this.container = document.querySelector(container);

		this.formBox = this.container.querySelector('.signin')
		this.form = this.container.querySelector('form');

		this.welcome = this.container.querySelector('.welcome');
		this.userID = this.welcome.querySelector('span')

		this.processingData();
	};

	processingData() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.serverConnecting(new FormData(this.form));
			this.form.reset();
		});
	};

	serverConnecting(data) {
		const xhr = new XMLHttpRequest();

		try {
			xhr.addEventListener('readystatechange', () => {
				if (xhr.readyState === xhr.DONE) {
					this.processingResponse(JSON.parse(xhr.responseText));
				}
			});
		} catch (error) {
			null;
		}

		xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth')
		xhr.send(data);
	};

	processingResponse(response) {
		if (response.success === true) {
			this.createUserPage(response.user_id);

			if (!this.exitButton) {
				this.createExitButton();
			}


		} else {
			alert('Неверные логин/пароль')
		}
	};

	createUserPage(id) {
		this.formBox.classList.remove('signin_active')
		this.userID.textContent = id;
		this.welcome.classList.add('welcome_active')
	}

	createExitButton() {
		this.exitButton = document.createElement('button')
		this.exitButton.textContent = 'Выйти'

		this.exitButton.classList.add('btn', 'exit-btn')

		this.exitButton.style.display = 'block';
		this.exitButton.style.marginInline = 'auto';
		this.exitButton.style.marginTop = '13px';

		this.welcome.appendChild(this.exitButton)

		this.exitButton.addEventListener('click', (e) => {
			e.preventDefault
			window.sessionStorage.clear();

			this.formBox.classList.add('signin_active')
			this.userID.textContent = ''
			this.welcome.classList.remove('welcome_active')
		});
	};

}

new FormAuth('.card')