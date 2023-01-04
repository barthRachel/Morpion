const PLAYER_X = 'x'
const PLAYER_O = 'circle'
const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winMessageText')
let turn = false // false = x ; true = o

startGame()

restartButton.addEventListener('click', () => {
	startGame();
})

// Lancement du jeu
function startGame() {
	turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X)
		cell.classList.remove(PLAYER_O)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
}

// Listener lié aux cellules du plateau
function handleCellClick(e) {
	const cell = e.target
	const currentClass = turn ? PLAYER_O : PLAYER_X
	cell.classList.add(currentClass)
	if (check(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		turn = !turn
		setBoardHoverClass()
	}
}

// Fin du jeu => Message qui s'affiche en fonction de si match nul ou non
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Match nul ! 🔃";
    } else {
        winningMessageTextElement.innerText = `${turn ? "O" : "X"} gagne ! 🎉`
		cellElements.forEach(cell => {
			cell.removeEventListener('click', handleCellClick)
			boardElement.classList.remove(PLAYER_X)
			boardElement.classList.remove(PLAYER_O)
		})
    }
}

// Détermine si match nul ou non
function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O)
	})
}

// Au survol d'une cellule vide affiche X ou O en fonction du tour en cours
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X)
	boardElement.classList.remove(PLAYER_O)
	if (turn) {
		boardElement.classList.add(PLAYER_O)
		winningMessageTextElement.innerText = "Au tour de O"
	} else {
		boardElement.classList.add(PLAYER_X)
		winningMessageTextElement.innerText = "Au tour de X"
	}
}

// Vérifie s'il y a victoire
function check(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}