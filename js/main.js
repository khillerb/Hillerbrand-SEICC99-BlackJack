//WinLogic: Dealer>=Player>=21
//FaceCard = 10, ace= 1 or 11
let hitButton = document.getElementById('hitButton');
let standButton = document.getElementById('standButton');
let restartButton = document.getElementById('restartButton');
const winningMessageControl = document.getElementById('winningMessage');
const winningText = document.querySelector('[winning-text]');
let tempDealer = [];
let tempPlayer = [];
let tempPerson = [];

let deck = ['As','2s','3s','4s','5s','6s','7s','8s','9s','Ts','Js','Qs','Ks',
				'Ah','2h','3h','4h','5h','6h','7h','8h','9h','Th','Jh','Qh','Kh',
				'Ac','2c','3c','4c','5c','6c','7c','8c','9c','Tc','Jc','Qc','Kc',
				'Ad','2d','3d','4d','5d','6d','7d','8d','9d','Td','Jd','Qd','Kd'];
let player = [];
let dealer = [];
let gameOver = false;

const reset = () => {
	player = [];
	dealer = [];
	deck = ['As','2s','3s','4s','5s','6s','7s','8s','9s','Ts','Js','Qs','Ks',
				'Ah','2h','3h','4h','5h','6h','7h','8h','9h','Th','Jh','Qh','Kh',
				'Ac','2c','3c','4c','5c','6c','7c','8c','9c','Tc','Jc','Qc','Kc',
				'Ad','2d','3d','4d','5d','6d','7d','8d','9d','Td','Jd','Qd','Kd'];
	gameOver = false;
	tempPerson = [];
	tempPlayer = [];
	tempDealer = [];
	turn = 0;
	winningMessageControl.classList.remove('show')
	//add/removeeventlisteners
}

const deal = () => {

	reset()
	shuffle()
	player.push(deck.shift())
	dealer.push(deck.shift())
	player.push(deck.shift())
	dealer.push(deck.shift())
	console.log(player)
	console.log(dealer)
	console.log(deck)
}
const shuffle = () => {
	for (let i = deck.length - 1; i > 0; i--) {
		const roll = Math.floor(Math.random() * i)
		const temp = deck[i]
		deck[i] = deck[roll]
		deck[roll] = temp
	}
	console.log(deck)
}
const dHit = () => {
	dealer.push(deck.shift())
	if (bustCheck(dealer)) {

	} else {
		setWinscreen()
	}
}
const pHit = () => {
	player.push(deck.shift())
	if (bustCheck(player)) {

	} else {
		setWinscreen()
	}
}
const pStand = () => {}
const cardParse = (aElem,tempPerson) => {
	if (aElem.charAt(0) == 'J' || aElem.charAt(0) == 'Q' || aElem.charAt(0) =='K'|| aElem.charAt(0) =='T') {
		aElem = '10'
	}
	if (aElem.charAt(0) == 'A') {
		aElem = '11'
	}
	aElem = aElem.replace(/\D+/g, "");
	aElem = parseInt(aElem)
	tempPerson.push(aElem)
}
const bustCheck = (person) => {
	tempPerson = [];
	person.forEach(element => cardParse(element,tempPerson));
	tempPerson = tempPerson.reduce(function(accumulator, currentValue){return accumulator+currentValue});
	if (tempPerson > 21) {
		return false
	} 
	else {
		return true
	}

}
const setWinscreen = () => {
	player.forEach(element => cardParse(element, tempPlayer));
	tempPlayer = tempPlayer.reduce(function(accumulator, currentValue){return accumulator+currentValue});
	dealer.forEach(element => cardParse(element, tempDealer));
	tempDealer = tempDealer.reduce(function(accumulator, currentValue){return accumulator+currentValue});
	if (!bustCheck(player)) {
		winningText.innerText = 'You bust, Dealer wins!'
	} else if (!bustCheck(dealer)) {
		winningText.innerText = 'Dealer busts, You win!'
	} else if (tempDealer == tempPlayer) {
		winningText.innerText = 'Push/Tie! Restart!'
	} else {
		winningText.innerText = `${(tempDealer > tempPlayer) ? "Dealer" : "Player"} wins!`
	}
	winningMessageControl.classList.add('show')
}

hitButton.addEventListener('click', pHit);
standButton.addEventListener('click', pStand);
restartButton.addEventListener('click', deal);
deal()
