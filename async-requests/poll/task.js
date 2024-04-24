class Poll {
	constructor(box) {
		this.poll = document.querySelector(box);
		this.pollTitle = this.poll.querySelector('.poll__title');
		this.pollAnswers = this.poll.querySelector('.poll__answers');
		this.getData();
	}

	getData() {
		const xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", () => {
			if (xhr.readyState === xhr.DONE) {
				this.createPoll(JSON.parse(xhr.responseText));
			}
		})

		xhr.open("GET",
			'https://students.netoservices.ru/nestjs-backend/poll');

		xhr.send();
	}

	// не очень понял, как отправлять на сервер результат, 
	// чтобы он обновлялся. голоса в ответе не меняются при голосовнии
	createResult(data) {
		document.body.innerHTML = "";

		const allVotes = data.stat.reduce((acc, val) => {
			return acc + Number(val.votes)
		}, 0)

		const result = document.createElement('div');
		result.style.margin = "10px 0 0 10px";
		const next = document.createElement('button');
		next.setAttribute('type', 'button');
		next.textContent = 'Дальше'
		next.addEventListener('click', () => {
			location.reload();
		});

		document.body.appendChild(result);
		data.stat.forEach(item => {
			const title = document.createElement('div')
			title.style.marginBottom = "10px";
			const percentage = document.createElement('span')
			title.textContent = item.answer
			percentage.textContent = ': ' + parseInt((item.votes / allVotes) * 100) + '%';
			percentage.style.fontWeight = 'bold';
			title.appendChild(percentage)
			result.appendChild(title)
		});
		result.appendChild(next);
	}

	createPoll(data) {
		this.pollTitle.textContent = data.data.title
		data.data.answers.forEach((item, index) => {
			const temp = document.createElement('button');
			temp.style.marginRight = '5px';
			temp.classList.add('poll__answer');
			temp.textContent = item;
			this.pollAnswers.appendChild(temp);
			temp.addEventListener('click', () => {
				alert('Ваш голос засчитан')
				const xhr = new XMLHttpRequest();
				xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.addEventListener("readystatechange", () => {
					if (xhr.readyState === xhr.DONE) {
						this.createResult(JSON.parse(xhr.responseText));
					}
				})
				xhr.send(`vote=${data.id}&answer=${index}`);
			});
		});
	}

}
const poll = new Poll('.poll');