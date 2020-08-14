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
const slotone = document.getElementById('slot1');
const slottwo = document.getElementById('slot2');
const slotthree = document.getElementById('slot3');
const slotfour = document.getElementById('slot4');
const slotnine = document.getElementById('slot9');
const sloteight = document.getElementById('slot8');
const slotsix = document.getElementById('slot6');
const slotseven = document.getElementById('slot7');
const cardClasses = document.querySelectorAll('.card')
const winningMessageControl = document.getElementById('winningMessage');
const startingMessageControl = document.getElementById('startingMessage');
const winningText = document.querySelector('[winning-text]');
const playDirective = document.querySelector('[play-directive]')
const betData = document.querySelector('[bet-data]');
let tempDealer = [];
let tempPlayer = [];
let tempPerson = [];
let bet = 0;
let bank = 2500;
let deck = ['Sa','S2','S3','S4','S5','S6','S7','S8','S9','St','Sj','Sq','Sk',
				'Ha','H2','H3','H4','H5','H6','H7','H8','H9','Ht','Hj','Hq','Hk',
				'Ca','C2','C3','C4','C5','C6','C7','C8','C9','Ct','Cj','Cq','Ck',
				'Da','D2','D3','D4','D5','D6','D7','D8','D9','Dt','Dj','Dq','Dk'];
let player = [];
let dealer = [];
let gameOver = false;



const reset = () => {
	bet = 0
	betData.innerText = `Bank: ${'$' + bank},Bet: ${'$' + bet}`
	betl.addEventListener('click', betO)
	betlO.addEventListener('click', betT)
	betlOO.addEventListener('click', betOH)
	betSOO.addEventListener('click', betFH)
	enterBet.addEventListener('click', betEnter)
	deck = ['Sa','S2','S3','S4','S5','S6','S7','S8','S9','St','Sj','Sq','Sk',
				'Ha','H2','H3','H4','H5','H6','H7','H8','H9','Ht','Hj','Hq','Hk',
				'Ca','C2','C3','C4','C5','C6','C7','C8','C9','Ct','Cj','Cq','Ck',
				'Da','D2','D3','D4','D5','D6','D7','D8','D9','Dt','Dj','Dq','Dk']
	deck.forEach(card => {
		slotone.classList.remove(card)
		slottwo.classList.remove(card)
		slotthree.classList.remove(card)
		slotfour.classList.remove(card)
		slotsix.classList.remove(card)
		slotseven.classList.remove(card)
		sloteight.classList.remove(card)
		slotnine.classList.remove(card)
	})
	startingMessageControl.classList.remove('show')
	winningMessageControl.classList.remove('show')
	player = []
	dealer = []
	gameOver = false;
	wipeTemp()
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
	enterBet.removeEventListener('click', betEnter)
	hitButton.addEventListener('click', pHit); 
	standButton.addEventListener('click', pStand);
	playDirective.innerText = 'Please choose whether you would like to hit or stand! '
	deal()
	cardRender()
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
	cardRender()
	if (bustCheck(player)) {

	} else {
		setWinscreen()
	}
}

const pStand = () => {
	hitButton.removeEventListener('click', pHit); 
	standButton.removeEventListener('click', pStand);
	wipeTemp()
	for (tempDealer = make(dealer,tempDealer); tempDealer <= 16; dHit()) {
		console.log('dHit')
		cardRender()
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
	} else if (!bustCheck(dealer)) {
		let betDub = betDouble(bet)
		winningText.innerText = `Dealer busts, You win ${'$'+ betDub}!`
		bank += betDub
	} else if (tempDealer == tempPlayer) {
		winningText.innerText = 'Push. Bet returned'
		bank += bet
	} else {
		
		if (tempDealer > tempPlayer) {
			winningText.innerText = `Dealer Wins! You lose ${'$' + bet}`
		} else {
			let betDub = betDouble(bet)
			bank += betDub
			winningText.innerText = `You win ${'$'+ betDub}!`
		}
	}
	gameOver = true
	cardRender(gameOver)
	winningMessageControl.classList.add('show')
}
const make = (role,temp) => {
	role.forEach(element => cardParse(element,temp));
	return temp.reduce(function(accumulator, currentValue){return accumulator+currentValue})
}
const cardParse = (arrElem,temp) => {
	if (arrElem.charAt(1) == 'j' || arrElem.charAt(1) == 'q' || arrElem.charAt(1) =='k'|| arrElem.charAt(1) =='t') {
		arrElem = '10'
	}
	if (arrElem.charAt(1) == 'a') {
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
const cardRender = (gameOver) => {
	for (let i in player) {
		if (i == 0) {
			slotone.classList.add(player[0])
		} else if (i == 1) {
			slottwo.classList.add(player[1])
			slotone.style.marginRight = "-150px";
		} else if (i == 2) {
			slotthree.classList.add(player[2])
			slottwo.style.marginRight = "-150px";
		} else if (i == 3) {
			slotfour.classList.add(player[3])
			slotthree.style.marginRight = "-150px";
		} else {
			console.log('noMatch', i, player[0], player[1])
		}
	}
	
	for (let d in dealer) {
		if (d == 0) {
			slotsix.classList.add('back')
		} else if (d == 1) {
			slotseven.classList.add(dealer[1])
		} else if (d == 2) {
			sloteight.classList.add(dealer[2])
			slotseven.style.marginRight = "-150px";
		} else if (d == 3) {
			slotnine.classList.add(dealer[3])
			sloteight.style.marginRight = "-150px";
		} else {
			console.log('noMatch', d, dealer[0], dealer[1])
		}
		if (gameOver) {
			slotsix.classList.remove('back')
			slotsix.classList.add(dealer[0])
			slotsix.style.marginRight = "-150px";
		}
	}
}
const betDouble = (b) => {
	return 2 * b
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

/* Icebox:
rename function or two
add comments
add multiple Ace value
setTimeout for dhit()
Double/Split functions

*/
