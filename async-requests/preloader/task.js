class Preloader{
	constructor(card){
		this.card = document.querySelector(card);
		this.exchangeRateContainer = this.card.querySelector('div');
		this.loadImage = this.card.querySelector('img');
		this.dataArray = window.localStorage.dataArray
		
		this.connector();
	}

	connector(){

		let isCashe = false;
		if(this.dataArray){
			isCashe = true;
			JSON.parse(this.dataArray).forEach(item => {
			this.createPair(item)})
			this.previusValuesArray = Array.from(this.exchangeRateContainer.querySelectorAll('.item__value'))
			this.loadImage.classList.remove('loader_active');
		}
		
		const xhr = new XMLHttpRequest();

		xhr.addEventListener('readystatechange',()=>{
			if(xhr.readyState === xhr.DONE){
				let data = JSON.parse(xhr.responseText)
				const dataArray = [];
				let index = 0
				for (const valutePair of Object.entries(data.response.Valute)) {
					isCashe? this.updatePair(valutePair, index): this.createPair(valutePair);
						dataArray.push(valutePair);
					index++;

				}
				window.localStorage.setItem('dataArray', JSON.stringify(dataArray));
				this.loadImage.classList.remove('loader_active');
			}
			
		});

		xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses')
		xhr.send();
	}

	createPair(data){
		const item = document.createElement('div');
		item.classList.add('item')
		this.exchangeRateContainer.appendChild(item)
		item.style.display = 'flex';
		item.style.rowGap = '5px';

		const itemCode = document.createElement('div');
		itemCode.classList.add('item__code');
		itemCode.textContent = data[0]
		itemCode.style.fontWeight = 'bold'
		itemCode.setAttribute('title', `${data[1].Name}`);
		item.appendChild(itemCode);

		const itemValue = document.createElement('div');
		itemValue.classList.add('item__value')
		itemValue.textContent = data[1].Value
		item.appendChild(itemValue)

		const itemCurrency = document.createElement('div');
		itemCurrency.classList.add('item__currency');
		itemCurrency.textContent = 'руб.';
		item.appendChild(itemCurrency);

	}

	updatePair(data, index) {
		this.previusValuesArray[index].textContent = data[1].Value;
	}
}
new Preloader('.card');