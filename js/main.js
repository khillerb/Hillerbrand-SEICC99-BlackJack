//WinLogic: Dealer>=Player>=21
//FaceCard = 10, ace= 1 or 11
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const betl = document.getElementById("betl");
const betlO = document.getElementById("betlO");
const betlOO = document.getElementById("betlOO");
const betSOO = document.getElementById("betSOO");
const enterBet = document.getElementById("enterBet");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");

const winningMessageControl = document.getElementById('winningMessage');
const startingMessageControl = document.getElementById('startingMessage');
const winningText = document.querySelector('[winning-text]');
const betData = document.querySelector('[bet-data]');
let tempDealer = [];
let tempPlayer = [];
let tempPerson = [];
let bet = 0;
let bank = 2500;
let deck = ['As','2s','3s','4s','5s','6s','7s','8s','9s','Ts','Js','Qs','Ks',
				'Ah','2h','3h','4h','5h','6h','7h','8h','9h','Th','Jh','Qh','Kh',
				'Ac','2c','3c','4c','5c','6c','7c','8c','9c','Tc','Jc','Qc','Kc',
				'Ad','2d','3d','4d','5d','6d','7d','8d','9d','Td','Jd','Qd','Kd'];
let player = [];
let dealer = [];
let gameOver = false;


const reset = () => {
	startingMessageControl.classList.remove('show')
	winningMessageControl.classList.remove('show')
	player = []
	dealer = []
	deck = ['As','2s','3s','4s','5s','6s','7s','8s','9s','Ts','Js','Qs','Ks',
				'Ah','2h','3h','4h','5h','6h','7h','8h','9h','Th','Jh','Qh','Kh',
				'Ac','2c','3c','4c','5c','6c','7c','8c','9c','Tc','Jc','Qc','Kc',
				'Ad','2d','3d','4d','5d','6d','7d','8d','9d','Td','Jd','Qd','Kd']
	gameOver = false;
	tempPerson = [];
	tempPlayer = [];
	tempDealer = [];
	bet = 0;
	shuffle()	
}

const betO = () => {
	if ((bank-1) >= 0) {
		bet += 1
		bank -= 1
		betData.innerText = `Bank: ${'$' + bank},Bet: ${'$' + bet}`
	}
	else {
		alert("Not enough in the bank!")
	}

}
const betT = () => {
	if ((bank-10) >= 0) {
		bet += 10
		bank -= 10
		betData.innerText = `Bank: ${'$' + bank},Bet: ${'$' + bet}`
	}
	else {
		alert("Not enough in the bank!")
	}

}
const betOH = () => {
	if ((bank-100) >= 0) {
		bet += 100
		bank -= 100
		betData.innerText = `Bank: ${'$' + bank},Bet: ${'$' + bet}`
	} else {
		alert("Not enough in the bank!")
	}
} 
const betFH = () => {
	if ((bank-500) >= 0) {
		bet += 500
		bank -= 500
		betData.innerText = `Bank: ${'$' + bank},Bet: ${'$' + bet}`
	} else {
		alert("Not enough in the bank!")
	}
} 
const betEnter = () => {
	betData.innerText = `Bank: ${'$' + bank},Bet: ${'$' + bet}`
	betl.removeEventListener('click', betO)
	betlO.removeEventListener('click', betT)
	betlOO.removeEventListener('click', betOH)
	betSOO.removeEventListener('click', betFH)
	deal()
}

const deal = () => {
	player.push(deck.shift())
	dealer.push(deck.shift())
	player.push(deck.shift())
	dealer.push(deck.shift())
	console.log(player)
	console.log(dealer)
	console.log(deck)
	tempDealer = make(dealer,tempDealer)
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

const pStand = () => {
	wipeTemp()
	for (tempDealer = make(dealer,tempDealer); tempDealer <= 16; dHit()) {
		console.log('dHit')
	}
	setWinscreen()
	
}

const bustCheck = (role) => {
	tempPerson = [];
	tempPerson = make(role, tempPerson)
	if (tempPerson > 21) {
		return false
	} 
	else {
		return true
	}

}
const setWinscreen = () => {
	wipeTemp()
	tempPlayer = make(player,tempPlayer)
	tempDealer = make(dealer,tempDealer)
	if (!bustCheck(player)) {
		winningText.innerText = `You bust and lose ${'$' + bet}, Dealer wins!`
		bet = 0
	} else if (!bustCheck(dealer)) {
		winningText.innerText = `Dealer busts, You win ${'$'+ 2*bet}!`
		bank += 2*bet
	} else if (tempDealer == tempPlayer) {
		winningText.innerText = 'Push. Bet returned'
		bank += bet
	} else {
		winningText.innerText = `${(tempDealer > tempPlayer) ? `Dealer Wins! You lose ${'$' + bet}` : `You win ${'$'+ 2*bet}!`}`
		if (tempDealer > tempPlayer){
			bet = 0
		} else {
			bank += 2*bet
		}
	}
	winningMessageControl.classList.add('show')
}
const make = (role,temp) => {
	role.forEach(element => cardParse(element,temp));
	return temp.reduce(function(accumulator, currentValue){return accumulator+currentValue})
}
const cardParse = (arrElem,temp) => {
	if (arrElem.charAt(0) == 'J' || arrElem.charAt(0) == 'Q' || arrElem.charAt(0) =='K'|| arrElem.charAt(0) =='T') {
		arrElem = '10'
	}
	if (arrElem.charAt(0) == 'A') {
		arrElem = '11'
	}
	arrElem = arrElem.replace(/\D+/g, "");
	arrElem = parseInt(arrElem)
	temp.push(arrElem)
}
const wipeTemp = () => {
	tempPerson = [];
	tempDealer = [];
	tempPlayer = [];
}

hitButton.addEventListener('click', pHit); 
standButton.addEventListener('click', pStand);
restartButton.addEventListener('click', reset);
startButton.addEventListener('click', reset);
betl.addEventListener('click', betO);
betlO.addEventListener('click', betT);
betlOO.addEventListener('click', betOH);
betSOO.addEventListener('click', betFH);
enterBet.addEventListener('click', betEnter);



