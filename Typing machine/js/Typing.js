const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const mistakeTag = document.querySelector('.mistake span');
const timeTag = document.querySelector('.time span b');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const Tryagain = document.querySelector('button');
let charIndex = mistakes = 0;
let timer, maxtime = 60, timeLeft = maxtime;
let isTyping = false;

function RandomParagraphs() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => inputField.focus())
    typingText.addEventListener("click", () => inputField.focus())
}

const initTyping = () => {
    const characters = typingText.querySelectorAll('span');
    const typedCharacter = inputField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0 ){
    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }

    if (typedCharacter == null) {
        charIndex--;
        if (characters[charIndex].classList.contains('Incorrect')) {
            mistakes--;
        }
        characters[charIndex].classList.remove('correct', 'Incorrect');
    } else {
        if (characters[charIndex].innerText === typedCharacter) {
            characters[charIndex].classList.add('correct');
        } else {
            mistakes++;
            characters[charIndex].classList.add('Incorrect');
        }
        characters[charIndex].classList.remove('active');
        charIndex++;// charIndex = charIndex + 1;
        characters[charIndex].classList.add('active');

    }
    mistakeTag.innerText = mistakes;
    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxtime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? "0" : wpm;
    cpmTag.innerHTML = charIndex - mistakes;
    wpmTag.innerHTML = wpm;
}else{
    inputField.value = "";
clearInterval(timer);
}
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    RandomParagraphs();
    timeLeft = maxtime;
    charIndex = mistakes = isTyping = 0;
    cpmTag.innerHTML = 0;
    wpmTag.innerHTML = 0;
    mistakeTag.innerText = mistakes;
    timeTag.innerHTML = timeLeft;
    inputField.value = "";
    clearInterval(timer);
}

RandomParagraphs();
inputField.addEventListener("input", initTyping);
Tryagain.addEventListener("click", resetGame);