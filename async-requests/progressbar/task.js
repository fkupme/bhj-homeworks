class ProgressBar{
	constructor(container){
		this.container = document.querySelector(container);
		this.progress = this.container.querySelector('progress');
		this.form = this.container.querySelector('form');
		this.sendForm();
	}

	sendForm(){
		this.form.addEventListener('submit', ()=>{
			data = new FormData(this.form);
			console.log(data);
			const xhr = new XMLHttpRequest();
		
		xhr.addEventListener('progress', (e)=>{
			console.log(e.type, e.loaded)
		});

		xhr.addEventListener('load', (e)=>{
			console.log(e.type, e.loaded)
		});
		xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload')

		xhr.send(data);
		});
		
	}
}
new ProgressBar('.card');