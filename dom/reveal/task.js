const func = () => {
	const revealElements = Array.from(document.querySelectorAll('.reveal'));
	console.log(revealElements)
	document.addEventListener('scroll', () => {
			revealElements.forEach(item => {
				let top = item.getBoundingClientRect().top
				let bottom = item.getBoundingClientRect().bottom
				
				if (bottom > 0 || top < window.innerHeight) {
					item.classList.add('reveal_active');
				}

				if (top > window.innerHeight || bottom < 0) {
					item.classList.remove('reveal_active');
				}
			}
		)
	})
}
func();