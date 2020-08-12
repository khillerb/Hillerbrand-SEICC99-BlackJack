//WinLogic: Dealer>=Player>=21
//FaceCard = 10, ace= 1 or 11
let hitButton = document.getElementById('hitButton');
let standButton = document.getElementById('standButton');
let restartButton = document.getElementById('restartButton');
const winningMessageControl = document.getElementById('winningMessage');
const winningText = document.querySelector('[winning-text]');
let deck = ['As','2s','3s','4s','5s','6s','7s','8s','9s','10s','Js','Qs','Ks',
				'Ah','2h','3h','4h','5h','6h','7h','8h','9h','10h','Jh','Qh','Kh',
				'Ac','2c','3c','4c','5c','6c','7c','8c','9c','10c','Jc','Qc','Kc',
				'Ad','2d','3d','4d','5d','6d','7d','8d','9d','10d','Jd','Qd','Kd'];
let turn = 0;
let player = [];
let dealer = [];
let tempPerson = [];
let gameOver = false;

const reset = () => {
	player = [];
	dealer = [];
	deck = ['1s','2s','3s','4s','5s','6s','7s','8s','9s','10s','Js','Qs','As',
				'1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','Jh','Qh','Ah',
				'1c','2c','3c','4c','5c','6c','7c','8c','9c','10c','Jc','Qc','Ac',
				'1d','2d','3d','4d','5d','6d','7d','8d','9d','10d','Jd','Qd','Ad'];
	gameOver = false;
	tempPerson = [];
	turn = 0;
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
		gameOver = true;
		console.log("Bust")
	}
}
const pHit = () => {
	player.push(deck.shift())
	if (bustCheck(player)) {

	} else {
		gameOver = true;
		console.log("Bust")
	}
}
const pStand = () => {}
const cardParse = (aElem) => {
	if (aElem.charAt(0) == 'J' || aElem.charAt(0) == 'Q' || aElem.charAt(0) =='K') {
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
	person.forEach(element => cardParse(element));
	tempPerson = tempPerson.reduce(function(accumulator, currentValue){return accumulator+currentValue});
	if (tempPerson > 21) {
		return false
	} 
	else {
		return true
	}

}
const setWinscreen = () => {
	tempPerson = [];
	person.forEach(element => cardParse(element));
	tempPerson = tempPerson.reduce(function(accumulator, currentValue){return accumulator+currentValue});
	if () {
		
	} else {
		winningText.innerText = `${(turn % 2 == 0) ? "X's" : "O's" } wins!`
	}
	winningMessageControl.classList.add('show')
}

hitButton.addEventListener('click', pHit);
standButton.addEventListener('click', pStand);
restartButton.addEventListener('click', deal);
