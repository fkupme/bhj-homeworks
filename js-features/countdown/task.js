const timerStart = () => {
	const timer = document.getElementById('timer');
	let seconds = '59'
	const interval = setInterval(() => {
		seconds--;
		timer.textContent = `00:00:${seconds}`;
		if(seconds == '00'){
			clearInterval(interval);
			alert('Вы победили в конкурсе!');
			location.assign("https://pro-dachnikov.com/uploads/posts/2021-10/1634446386_2-p-kubok-ognya-garri-potter-kubka-foto-2.jpg");
		}
	}, 1000)
}
timerStart();