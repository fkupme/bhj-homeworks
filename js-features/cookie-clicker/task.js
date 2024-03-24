const cookieClicker = () =>{
	const cookie = document.getElementById('cookie');
	const counter = document.getElementById('clicker__counter');
	const speed = document.getElementById('clicker__speed');
	let previous = 0
	let current = 0
	cookie.onclick = () =>{
		counter.textContent ++;
		cookie.setAttribute('width', '230px')

		previous = current
		current = new Date().getTime();
		if (current !== previous){
			speed.textContent = (1000 / (current - previous)).toFixed(2)
		}
		
		setTimeout(() =>{
			cookie.setAttribute('width', '200px')
		}, 100);
		
	}
}
cookieClicker();
