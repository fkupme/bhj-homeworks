const cookieClicker = () =>{
	const cookie = document.getElementById('cookie');
	const counter = document.getElementById('clicker__counter');

	cookie.onclick = () =>{
		counter.textContent ++;
		cookie.setAttribute('width', '230px')
		setTimeout(() =>{
			cookie.setAttribute('width', '200px')
		}, 100);
		
	}
}
cookieClicker();
