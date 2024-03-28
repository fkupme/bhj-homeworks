const moleGame = () => {
	const strikes = document.getElementById('dead');
	const misses = document.getElementById('lost');
	const victoryMessage = document.querySelector('.message-victory');
	const defeatMessage = document.querySelector('.message-defeat');

	const getHole = i => document.getElementById(`hole${i}`)

	for (let i = 1; i <= 9; i++) {
		const hole = getHole(i)
		hole.onclick = () => {
			if (hole.classList.contains('hole_has-mole')) {
				strikes.textContent++;
				if (strikes.textContent >= 10) {
					victoryMessage.classList.add('visible');
					victoryMessage.onclick = () => {
						location.reload();
					}
				}
			} else {
				misses.textContent++;
				if (misses.textContent >= 5) {
					defeatMessage.classList.add('visible');
					defeatMessage.onclick = () => {
						location.reload();
					}
				}
			}
		}
	}
};

moleGame();