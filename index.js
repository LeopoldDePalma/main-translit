const formInput = document.querySelector('.form-input');
const formSendButton = document.querySelector('.form-send-button');
const clearButtonAll = document.querySelector('.clear-button');
const output = document.querySelector('.output');
let wordCount = 0;

formInput.onkeypress = function (enter) {
	if (enter.key === 'Enter') {
		enter.preventDefault();
		formSendButton.click();
	}
};

function addNewWord() {
	const newWord = formInput.value.trim().replace(/\s+/g, ' ');
	if (!newWord) {
		return alert('Введите слово!');
	}

	const newWordElement = document.createElement('div');
	const uniqueId = generateUniqueId();
	newWordElement.className = 'rusWord';

	if (newWord.length > 7) {
		newWordElement.innerText = newWord.slice(0, 7) + '...';
		const tooltip = document.createElement('div');
		tooltip.className = 'tooltip';
		tooltip.id = uniqueId;
		tooltip.innerText = newWord;
		tooltip.style.display = 'none';

		newWordElement.addEventListener('mouseenter', () => {
			tooltip.style.display = 'block';
		});
		newWordElement.addEventListener('mouseleave', () => {
			tooltip.style.display = 'none';
		});

		newWordElement.appendChild(tooltip);
	} else {
		newWordElement.innerText = newWord;
	}
	wordCount++;
	const newIndexElement = document.createElement('span');
	newIndexElement.className = 'index';
	newIndexElement.innerText = wordCount;
	newWordElement.prepend(newIndexElement);
	output.appendChild(newWordElement);
	formInput.value = '';

	const secondNewWord = translit(newWord);
	addSecondNewWord(newWordElement, secondNewWord, uniqueId);
}

function generateUniqueId() {
	const timestamp = Date.now();
	const randomPart = Math.floor(Math.random() * 10000);
	const randomPartTwo = Math.floor(Math.random() * 10000);
	return timestamp + randomPart + randomPartTwo;
}

formSendButton.addEventListener('click', addNewWord);

function addSecondNewWord(newWordElement, secondNewWord, uniqueId) {
	const secondNewWordElement = document.createElement('div');
	secondNewWordElement.className = 'translitWord';

	if (secondNewWord.length > 7) {
		secondNewWordElement.innerText = secondNewWord.slice(0, 7) + '...';
		const secondTooltip = document.createElement('div');
		secondTooltip.className = 'tooltip';
		secondTooltip.id = uniqueId;
		secondTooltip.innerText = secondNewWord;
		secondTooltip.style.display = 'none';

		secondNewWordElement.addEventListener('mouseenter', () => {
			secondTooltip.style.display = 'block';
		});
		secondNewWordElement.addEventListener('mouseleave', () => {
			secondTooltip.style.display = 'none';
		});

		secondNewWordElement.appendChild(secondTooltip);
	} else {
		secondNewWordElement.innerText = secondNewWord;
	}
	const clearButtonElement = document.createElement('button');
	clearButtonElement.className = 'clear-button-element';
	clearButtonElement.type = 'button';
	secondNewWordElement.appendChild(clearButtonElement);
	output.appendChild(secondNewWordElement);

	clearButtonElement.addEventListener('click', () => {
		newWordElement.remove();
		secondNewWordElement.remove();
		updateIndexes();
		wordCount--;
	});
}

function updateIndexes() {
	const rusWords = document.querySelectorAll('.rusWord');
	rusWords.forEach((wordElement, index) => {
		const indexElement = wordElement.querySelector('.index');
		indexElement.innerText = index + 1;
	});
}

function translit(value) {
	const converter = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'c',
		ч: 'ch',
		ш: 'sh',
		щ: 'sch',
		ь: '',
		ы: 'y',
		ъ: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',

		А: 'A',
		Б: 'B',
		В: 'V',
		Г: 'G',
		Д: 'D',
		Е: 'E',
		Ё: 'E',
		Ж: 'Zh',
		З: 'Z',
		И: 'I',
		Й: 'Y',
		К: 'K',
		Л: 'L',
		М: 'M',
		Н: 'N',
		О: 'O',
		П: 'P',
		Р: 'R',
		С: 'S',
		Т: 'T',
		У: 'U',
		Ф: 'F',
		Х: 'H',
		Ц: 'C',
		Ч: 'Ch',
		Ш: 'Sh',
		Щ: 'Sch',
		Ь: '',
		Ы: 'Y',
		Ъ: '',
		Э: 'E',
		Ю: 'Yu',
		Я: 'Ya',
	};
	return [...value].map(char => converter[char] || char).join('');
}

function clearOutput() {
	const rusWords = document.querySelectorAll('.rusWord');
	const translitWords = document.querySelectorAll('.translitWord');
	rusWords.forEach(newWord => newWord.remove());
	translitWords.forEach(secondNewWord => secondNewWord.remove());
	wordCount = 0;
}

clearButtonAll.addEventListener('click', clearOutput);
