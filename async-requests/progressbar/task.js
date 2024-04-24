class ProgressBar{
	constructor(container){
		this.container = document.querySelector(container);
		this.progress = this.container.querySelector('progress');
		this.form = this.container.querySelector('form');
	}

	getFormData(){
		this.form.addEventListener('submit', (e)=>{
			e.preventDefault();
			const data = new FormData(this.form);
			this.sendForm(data);
		});
	}

	sendForm(data){
		
		const xhr = new XMLHttpRequest();
		
		xhr.upload.addEventListener('progress', (e)=>{
				this.changeProgress(e)
		});

		xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload')

		xhr.send(data);
	}

	changeProgress(e) {
		this.progress.value = e.loaded / e.total
	}
}
new ProgressBar('.card').getFormData();