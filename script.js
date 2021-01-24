const words = [
  'employee',
  'guitar',
  'canada',
  'control',
  'tree',
  'england',
  'banana',
  'artist',
  'orange',
  'water',
  'microwave',
  'version',
  'steam',
  'adventure',
  'robin',
  'taxi',
  'state',
  'library',
  'koala',
  'remedy'
];

const alphabet = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

let alphabetCopy = [...alphabet];

const target = document.getElementById('target');
const guesses = document.getElementById('guesses');
const result = document.getElementById('result');
const head = document.getElementById('head');
const body = document.getElementById('body');
const arm1 = document.getElementById('arm1');
const arm2 = document.getElementById('arm2');
const leg1 = document.getElementById('leg1');
const leg2 = document.getElementById('leg2');

let isPlaying = false;
let word;
let lives;
let score;
let winner = false;

function randomWord(input) {
    let i = Math.floor(Math.random() * input.length);
    return words[i];
}

function gameOn() {
    isPlaying = !isPlaying;
}

function isLetter(input) {
    let out = false;
    for (let i = 0; i < alphabetCopy.length; i++) {
        if (alphabetCopy[i] === input) {
            out = true;
            alphabetCopy[i] = "done";
        }
    }
    return out;
}

function start() {
    if (!isPlaying){
        lives = 6;
        score = 0;
        winner = false;
        word = randomWord(words);
        target.innerHTML = '';
        result.innerHTML = '';
        guesses.innerHTML = lives;
        for (let i = 0; i < word.length; i++) {
            target.insertAdjacentHTML('beforeend', "<tspan id=\""+i+"\">_</tspan>");
        }
        console.log(word);
        isPlaying = true;
        head.style.stroke = "none";
        body.style.stroke = "none";
        arm1.style.stroke = "none";
        arm2.style.stroke = "none";
        leg1.style.stroke = "none";
        leg2.style.stroke = "none";
        alphabetCopy = [...alphabet];
        let letter;
        for (let i = 0; i < alphabet.length; i++) {
            letter = document.getElementById(alphabet[i]).style.fill="white";
        }
    } else {
        console.log("game has already started");
    }
}

function update(input) {
    let current;
    let isMatch;
    let letter;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === input) {
            current = document.getElementById(i);
            current.innerHTML = word[i];
            isMatch = true;
            letter = document.getElementById(word[i]).style.fill="green";
        }
    }
    if (!isMatch && isLetter(input)) {
        isMatch = false;
        letter = document.getElementById(input).style.fill="red";
    }
    if (isMatch === false) {
        lives--;
    }
    guesses.innerHTML = lives;
    if (lives === 5) {
        head.style.stroke = "#21d8d6";
    }
    if (lives === 4) {
        body.style.stroke = "#21d8d6";
    }
    if (lives === 3) {
        arm1.style.stroke = "#21d8d6";
    }
    if (lives === 2) {
        arm2.style.stroke = "#21d8d6";
    }
    if (lives === 1) {
        leg1.style.stroke = "#21d8d6";
    }
    if (lives === 0) {
        leg2.style.stroke = "#21d8d6";
        end();
    }
    if (!isRemaining()){
        winner = true;
        end();
    }
}

function isRemaining() {
    let counter = word.length;
    let out = true;
    for (let i = 0; i < word.length; i++) {
        if (document.getElementById(i).innerHTML !== "_") {
            counter--;
        }
    }
    if (counter === 0) {
        out = false;
    }
    return out;
}

function end() {
    if (isPlaying) {
        let current;
        for (let i = 0; i < word.length; i++) {
            if (document.getElementById(i).innerHTML === "_") {
                current = document.getElementById(i);
                current.innerHTML = "<tspan class=\"missed\">"+word[i]+"</tspan>";
            }
        }
        if (winner) {
            console.log("you win");
            result.innerHTML = "YOU WON";
        }
        if (!winner) {
            console.log("you lose");
            result.innerHTML = "YOU LOST";
        }
        isPlaying = false;
    } else {
        console.log("game is over");
    }
}

document.onkeydown = function(event) {
    if (isPlaying) {
        update(event.key);
    }
}
