const words = ["What..?", "Who..?", "How..?", "And more"]

let wordIndex = 0
let charIndex = 0

let addingChars = true;
let shouldWait = false;

let currentWord =  words[wordIndex]

 const updateCurrWord = () => {
     wordIndex++

     if (wordIndex === words.length) wordIndex = 0

     currentWord = words[wordIndex]
 }

function addChar() {
    let currChar = currentWord[charIndex]

    let char = document.createElement('span')

    char.classList.add("char")
    char.innerText = currChar


    document.querySelector(".typed").appendChild(char)

    charIndex++

    if (charIndex == currentWord.length) {
        charIndex--
        addingChars = false
        shouldWait = true
    }
}

const removeChar = () => {
    const char = document.querySelector(".typed").lastElementChild

    document.querySelector(".typed").removeChild(char)

    charIndex--

    if (charIndex < 0){
        charIndex++
        addingChars = true
        updateCurrWord()
    }
}

const runTypewriter = () => {
    const operation = addingChars  ? addChar : removeChar

    operation()

    let timeout = addingChars ? 200 : 100

    if (shouldWait){
        timeout = 1000
        shouldWait = false
    }

    setTimeout(runTypewriter, timeout)
}

setTimeout(runTypewriter, 1500)


// Hamburger menu

function menu() {
    document.querySelector('body').classList.toggle("activeSlide") 
    document.querySelector('body').classList.toggle("activeMenu") 
    document.querySelector('body').classList.toggle("activeMenu1") 
}
