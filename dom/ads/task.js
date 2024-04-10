class Rotator {
	constructor(box) {
		this.box = box;
		this.currentIndex = null;
		this.currentItem = null;
		this.nextItem = null;
		this.elementsArray = Array.from(this.box.querySelectorAll('.rotator__case'));
		this.attributes = null;
		this.rotate();
	}

	getCurrent() {
		this.currentIndex = this.elementsArray.findIndex((item) => {
			return item.classList.contains('rotator__case_active');
		});
		this.currentItem = this.elementsArray[this.currentIndex];
		this.nextItem = this.elementsArray[this.currentIndex + 1];
	}

	getAttributes() {
		this.attributes = [
			this.currentItem.getAttribute('data-speed'),
			this.currentItem.getAttribute('data-color')
		]

	}

	restart() {
		this.currentIndex = 0
	}

	rotate() {
		this.getCurrent();
		this.getAttributes();
		this.currentItem.setAttribute('style', `color: ${this.attributes[1]}`);
		if (this.currentIndex >= 5) {
			this.nextItem = this.elementsArray[0];
		}
		setTimeout(() => {
			this.currentItem.classList.remove('rotator__case_active');
			this.nextItem.classList.add('rotator__case_active');
			this.rotate();
		}, this.attributes[0]);
	}


}

const rot = new Rotator(document.querySelector('.card'));

