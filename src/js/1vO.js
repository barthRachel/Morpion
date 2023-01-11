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

	if(turn === false){	
		cell.classList.add(currentClass)
	}

	if (check(currentClass)) { //une classe gagne
		endGame(false)

	} else if (isDraw()) { //match nul
		endGame(true)

	} else { //changement de tour
		turn = !turn
		if(turn === true){
			iaPlay()
			console.log(turn)
			turn = !turn
		} else {
			setBoardHoverClass()
			console.log(turn)
		}
	}
}

// Fonction pour voir quelles cellules sont vides
function isEmpty(){
	const emptyCells = []
	const plainCells = []
	cellElements.forEach(cell => {
		if(cell.classList.contains('x') || cell.classList.contains('circle')){
			plainCells.push(cell)
		} else {
			emptyCells.push(cell)
		}
	})
	console.log(emptyCells)
	return emptyCells
}

// Fonction coup de l'ordinateur
function iaPlay(){
	const emptyCells = isEmpty()
	const random = Math.floor((Math.random() * (emptyCells.length-1)))

	const play = emptyCells[random].classList.add(PLAYER_O)
	console.log(emptyCells[random])
	console.log(random)
	return play
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

// Au survol d'une cellule vide affiche X
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X)
	boardElement.classList.remove(PLAYER_O)
	if (turn) {
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