let addNumber = document.querySelector('.number')
addMessage = document.querySelector('.message')
addButton = document.querySelector('.add')
cardNumbers = document.querySelector('.cardNumbers')
cardMessage = document.querySelector('.cardMessage')


addButton.addEventListener('click', (e) => {
	e.preventDefault();
	let cardNumbers = localStorage.getItem("cardNumbers");
	if (cardNumbers === null) {
		cardsList = []
	} else {
		cardsList = JSON.parse(cardNumbers);
	}
	let newList = {
		cardNumbers: addNumber.value,
		cardMessage: addMessage.value,
	}
	cardsList.push(newList),
		addNumber.value = '',
		addMessage.value = ''
	localStorage.setItem('cardNumbers', JSON.stringify(cardsList))
	displayMessage()
})


function deleteTodo(ind) {
	let cardNumbers = localStorage.getItem("cardNumbers");
	cardsList = JSON.parse(cardNumbers);
	cardsList.splice(ind, 1);
	localStorage.setItem("cardNumbers", JSON.stringify(cardsList));
	displayMessage();
}

function displayMessage() {
	let displayMessage = "";
	cardsList.forEach((item, i) => {
		displayMessage += `
	<div class="cardInformationWrapper">
	<label class="item" for='item_${i}'>${item.cardNumbers}</label>
	<label class="item" for='item_${i}'>${item.cardMessage}</label>
	</div>
	<button onclick='deleteTodo(${i})'>Delete</button>
	`;
		cardNumbers.innerHTML = displayMessage;
	})
}


function validateCreditCardNumber(cardNumber) {
	cardNumber = cardNumber.split(' ').join("");
	let regExp = /[0-9]/;
	if (cardNumber.length != 16 || !cardNumber.match(regExp)) {
		addButton.disabled = true;
		return false;

	} else {
		addButton.disabled = false;
		update(cardNumber)

	}
}



function cardType(cardNumber) {
	cardNumber = cardNumber.split(' ').join("");
	let o = {
		electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
		maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
		dankort: /^(5019)\d+$/,
		interpayment: /^(636)\d+$/,
		unionpay: /^(62|88)\d+$/,
		visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
		mastercard: /^5[1-5][0-9]{14}$/,
		amex: /^3[47][0-9]{13}$/,
		diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
		discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
		jcb: /^(?:2131|1800|35\d{3})\d{11}$/
	}
	for (let k in o) {
		if (o[k].test(cardNumber)) {
			return k;
		}
	}
	return null;
}

function update(cardNumber) {
	let img = document.getElementById("img")
	img.src = './img/' + (cardType(cardNumber) || "other") + ".png";
}



let selectElement = document.querySelector('.number');
selectElement.addEventListener('change', (event) => {

	validateCreditCardNumber(event.currentTarget.value)
});
