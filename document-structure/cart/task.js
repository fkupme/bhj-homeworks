//есть проблема после удаления элемента из корзины добавить его повторно не возможно, хотя обработчик все еще висит

class Card {
	constructor(card) {
		this.card = card;
		this.buttons = Array.from(card.querySelectorAll('.product__quantity-control'));
		this.quantity = card.querySelector('.product__quantity-value');
		this.addToBasket = card.querySelector('.product__add');
		this.changeQuantity();
	}


	changeQuantity() {
		this.buttons.forEach((button, index) => button.addEventListener('click', () => {
			if (!index && this.quantity.textContent < 1) {
				return;
			}
			index ? this.quantity.textContent++ : this.quantity.textContent--;
		}))
	}

	getData() {
		return {
			dataId: this.card.getAttribute('data-id'),
			image: this.card.querySelector('.product__image'),
			quantity: this.quantity.textContent,
			index: Number(this.card.getAttribute('data-id')) - 1,
		}
	}
}

class Shop {
	constructor(products) {
		this.basket = document.querySelector('.cart__products')
		this.basketItems = []

		this.products = document.querySelector(products)
		this.cards = Array.from(this.products.querySelectorAll('.product'))
		this.images = Array.from(this.products.querySelectorAll('.product__image'));

		this.cardsExempls = [];
		this.deleteButtons = [];
		this.positions = [];


		this.createCards();
	}



	createCards() {
		this.cards.forEach(product => this.cardsExempls.push(new Card(product)))
		this.addToBasket();
	}


	addToBasket() {
		let data
		this.cardsExempls.forEach(card => card.addToBasket.addEventListener('click', () => {
			data = card.getData();
			const isInBasket = this.basketItems.find(item => item.getAttribute('data-id') === data.dataId)
			!isInBasket ? this.createBasketItem(data) : this.updateBasketItem(data, isInBasket)
			return;
		}))

	}

	deleteFromBasket() {
		this.deleteButtons.forEach((button, index) => button
			.addEventListener('click', () => {
				this.basketItems[index].remove()
			})
		);
	}

	createBasketItem(data) {
		const box = document.createElement('div');
		box.classList.add('cart__product');
		box.setAttribute('data-id', data.dataId);


		const image = data.image.cloneNode();
		image.classList.add('cart__product-image');


		const quantity = document.createElement('div');
		quantity.textContent = data.quantity
		quantity.classList.add('cart__product-count');

		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add('cart__product-delete');

		box.appendChild(image);
		box.appendChild(quantity);
		box.appendChild(deleteBtn);
		this.basket.appendChild(box);

		this.basketItems = Array.from(this.basket.querySelectorAll('.cart__product'));
		this.deleteButtons = Array.from(document.querySelectorAll('.cart__product-delete'));

		const topLeft = this.getPosition(data.index)
		box.style.position = 'absolute';
		box.style.top = `${topLeft.top - box.offsetHeight}px`;
		box.style.left = `${topLeft.left}`;
		this.animatePosition(box)

		this.deleteFromBasket();
	}
	//я так понял можно было заменять существующий элемент на созданный, но не знаю что лучше

	updateBasketItem(data, item) {
		let quantity = item.querySelector('.cart__product-count')
		quantity.textContent = Number(quantity.textContent) + Number(data.quantity)

		const image = item.querySelector('.product__image').cloneNode();
		const topLeft = this.getPosition(data.index)
		this.products.appendChild(image);
		image.style.position = 'absolute';
		image.style.top = `${topLeft.top}px`;
		image.style.left = `${topLeft.left}`;
		this.animatePosition(image)
	}

	deleteItem(index) {
		this.basketItems[index].remove()
	}

	getPosition(index) {
		return this.images.map(item => {
			const { top, left } = item.getBoundingClientRect()
			return item = { top: top + scrollY, left: left + scrollX }

		})[index]
	}

	animatePosition(item) {
		const getPosition = () => {
			const { top, left } = item.getBoundingClientRect()
			return { top: top + scrollY, left: left + scrollX };
		}
		const posStart = getPosition();
		const stepY = (posStart.top - 136) / 9
		const stepX = (315 - posStart.left) / 9
		const interval = setInterval(() => {

			const pos = getPosition();
			item.style.top = `${pos.top - stepY}px`
			item.style.left = `${pos.left + stepX}px`

			if (pos.top <= 136 || pos.left >= 315) {
				item.removeAttribute('style');
				if (item.tagName === 'img') {
					item.remove
				}
				clearInterval(interval);
			}
		}, 30)
	}


}

new Shop('.products')

