const PLAYER_X = 'x'
const PLAYER_O = 'circle'
const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const nameBoard = document.getElementById('playersNames')
const nameButton = document.getElementById('startGame')
const name1Input = document.getElementById('name1')
const name2Input = document.getElementById('name2')
const warningParagraph = document.getElementsByClassName('warningParagraph')

var name1, name2;

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winMessageText')
let turn = false // false = x ; true = o

//startGame()

nameButton.addEventListener('click', () => {

	if(name1Input.value.match(/^\s*$/g)){
		warningParagraph[0].classList.remove('hidden')
		warningParagraph[0].classList.add('show')
	} else if(name2Input.value.match(/^\s*$/g)){
		warningParagraph[0].classList.remove('show')
		warningParagraph[0].classList.add('hidden')

		warningParagraph[1].classList.remove('hidden')
		warningParagraph[1].classList.add('show')
	} else {
		warningParagraph[1].classList.remove('show')
		warningParagraph[1].classList.add('hidden')

		name1 = name1Input.value
		name2 = name2Input.value

		nameBoard.classList.remove('show')
		boardElement.classList.remove('hidden')
		restartButton.classList.remove('hidden')
		nameBoard.classList.add('hidden')
		boardElement.classList.add('show')
		restartButton.classList.add('show')

		startGame()
	}

})

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
        winningMessageTextElement.innerText = `${turn ? name2 : name1} gagne ! 🎉`
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
		winningMessageTextElement.innerText = `Au tour de  ${"\" "+ name2 + " \""}`
	} else {
		boardElement.classList.add(PLAYER_X)
		winningMessageTextElement.innerText = `Au tour de ${"\" "+ name1 + " \""}`
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