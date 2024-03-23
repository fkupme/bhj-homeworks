const moleGame = () => {
	const strikes = document.getElementById('dead');
	const misses = document.getElementById('lost');

	getHole = i => document.getElementById(`hole${i}`)

	for (let i = 1; i < 9; i++) {
		const hole = getHole(i)
		hole.onclick = () => {
			if (hole.classList.contains('hole_has-mole')) {
				strikes.textContent++;
			} else { misses.textContent++; }
		}

	}

};

moleGame();