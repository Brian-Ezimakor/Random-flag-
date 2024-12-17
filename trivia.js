const BASE_URL = "https://opentdb.com"

const numQuestions = 10;

const quizSection = document.getElementById("quiz-section")
const quizSelection = document.getElementById("select-quiz")
const quizEnd = document.getElementById("endScreen")
const restart = document.getElementById("restart")
let countdown;
count = 11

let categoryContainer = document.getElementById("categoryHolder");

let score = 0;
let playerName = "";
let chosenCategory = "";

function fetchCategories() {
   return fetch(`${BASE_URL}/api_category.php`)
    .then(res => res.json())
}

function fetchQuestions(num, token, categoryId) {

    if (categoryId) {
        return fetch(`${BASE_URL}/api.php?amount=${num}&token=${token}&category=${categoryId}`)
        .then(res => res.json())
    }
    else {
        return fetch(`${BASE_URL}/api.php?amount=${num}&token=${token}`)
        .then(res => res.json())
    }
}

function fetchToken() {

    return fetch(`${BASE_URL}/api_token.php?command=request`)
    .then(res => res.json())
}

function resetToken(token) {
    return fetch(`${BASE_URL}/api_token.php?command=reset&token=${token}`)
    .then(res => res.json())
}

function selectCategory(categories) {
    let form = document.getElementById("category")
    const selectTag = document.createElement("select")
    const sumbitBtn = document.createElement("button")

    selectTag.id ="categories"

    const defaultOption = document.createElement("option")
    defaultOption.innerHTML = "All Categories"
    defaultOption.value = "";
    defaultOption.selected = "selected";

    selectTag.appendChild(defaultOption);

    categories.forEach((category) => {
        const option = document.createElement("option")
        option.innerHTML = category.name;
        option.value = category.id

    selectTag.appendChild(option);
    })

    sumbitBtn.type = "submit"
    sumbitBtn.value = "Enter"
    sumbitBtn.innerHTML = "Proceed"


    form.appendChild(selectTag)
    form.appendChild(sumbitBtn)

    form.addEventListener("submit", (event)=> {
    event.preventDefault()

    chosenCategory = document.getElementById("categories").value

    startPlay()
    })
}

function startPlay() {
    const token  = localStorage.getItem("token")
    if (!token) {
        fetchToken().then((data) => {
            localStorage.setItem("token", data.token)

            fetchQuestions(numQuestions, data.token, chosenCategory).then((questions) => {
                checkQandA(questions, data.token)
            })
        })
    }
    else {
     /* const token  = localStorage.getItem("token")
      fetchQuestions(numQuestions, token, chosenCategory).then((questions) => {
            checkQandA(questions, token) 
        }) */
        fetchToken().then((data) => {
            localStorage.setItem("token", data.token)

            fetchQuestions(numQuestions, data.token, chosenCategory).then((questions) => {
                checkQandA(questions, data.token)
            })
        })
        
    }
    document.getElementById("select-quiz").classList.add("hide");
    document.getElementById("quiz-section").classList.remove("hide");
    let tempoaryFlag = localStorage.getItem("flags")
    localStorage.setItem("initialFlag", tempoaryFlag)
}

function checkQandA(questions, token){
    if(questions.response_code === 4) {
        resetToken(token).then( () => {
            fetchQuestions(numQuestions, token, chosenCategory).then((resetQuestions) => {
                appendQuestion(resetQuestions.results, 0)
            })
        })
    }
    else {
        appendQuestion(questions.results, 0)
    }
}


function createQuestion(questions, counter) {
    const question = questions[counter]

    const questionNumber = document.getElementById("question-count")
    questionNumber.textContent = `${counter + 1}` + "/" + `${questions.length}`

    const askedQuestion = document.getElementById("heading")
    askedQuestion.innerHTML = question.question


    const answersDiv = document.getElementById("answers");

    const answers = [...question.incorrect_answers]
    const insertIndex = Math.floor(Math.random() * (answers.length + 1))
    answers.splice(insertIndex, 0, question.correct_answer)

    answers.forEach((answer) => {
        const answerOption = document.createElement("p")
        answerOption.innerHTML = answer;
        answerOption.classList.add("option")
        answerOption.addEventListener("click", () => {
            checkAnswer(decode(answer), decode(question.correct_answer), answerOption)
            nextQuestion(questions,counter)
        })
        answersDiv.appendChild(answerOption)
    })
}

function nextQuestion(questions, counter) {

    const questionSection = document.getElementById("quiz-section");
    const answersDiv = document.getElementById("answers");

    const replaceAnswers = answersDiv.innerHTML
    answersDiv.innerHTML = replaceAnswers

    const button = document.getElementById("next-btn")
    button.addEventListener("click", (/*displayNext =*/ () => {
        if(counter < questions.length - 1) {
            appendQuestion(questions, counter + 1)
          //  timerDisplay()
          //  clearInterval(countdown)
          //  count = 11
        }
        else {
            appendplayAgainSection()
            counter = 0;
        }
    })
)

/*
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        let timeLeft = document.getElementById("time-left")
        timeLeft.innerHTML = `${count}s` ;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};*/
}

function newQuiz() {
    document.getElementById("endScreen").classList.add("hide");
    document.getElementById("quiz-section").classList.add("hide");
    document.getElementById("select-quiz").classList.remove("hide");
    score = 0;
    
    const questionNumber = document.getElementById("question-count")
    questionNumber.innerHTML = "";
 
    const askedQuestion = document.getElementById("heading")
    askedQuestion.innerHTML = "";
 
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
}

function appendQuestion(questions, counter) {

   const questionNumber = document.getElementById("question-count")
   questionNumber.innerHTML = "";

   const askedQuestion = document.getElementById("heading")
   askedQuestion.innerHTML = "";

   const answersDiv = document.getElementById("answers");
   answersDiv.innerHTML = "";

//    let timeLeft = document.getElementById("time-left")
//    timeLeft.innerHTML = "";

  createQuestion(questions, counter)
  //  const askedQuestions = createQuestion(question, counter)
  //  quizSection.appendChild(askedQuestions)
}

function decode(encodedHTML) {
    const initialTag = document.createElement("div")
    initialTag.innerHTML = encodedHTML;
    return initialTag.innerHTML
}

function checkAnswer(answer, correctAnswer, answerList) {
    const answerItems = [...document.getElementsByTagName("p")]

    answerItems.forEach((p) => {
        if(answer !== correctAnswer && p.innerHTML === correctAnswer) {
            p.classList.add("correct");
        }
    })

    if(answer === correctAnswer) {
        answerList.classList.add("correct")
        score++;
        // let pass = Audio
        // pass.apply
    }
    else {
        answerList.classList.add("incorrect")  
    }

    /*
    clearInterval(countdown);
    answerItems.forEach((element) => {
        element.disabled = true;
    });*/
}

function appendplayAgainSection() {

    document.getElementById("endScreen").classList.remove("hide");
    document.getElementById("quiz-section").classList.add("hide");

    const scores = document.getElementById("user-score")
    scores.innerHTML = "Your score is " + score + " out of " + numQuestions;

    const encourage = document.getElementById("encourage");
    const img = document.getElementById("image"); 
     if (score == 0 || score == 1) {
        encourage.innerHTML = "Oops! Try again.\u{1FAE4}"
        img.src = "Question.png"
     }
     else if (score == 2 || score == 3 ) {
        encourage.innerHTML = "Hmmm! You can do better than this.\u{1F914}"
        img.src = "Innovation.png"
     }
     else if (score == 4 || score == 5) {
        encourage.innerHTML = "Progress! You are making progress."
        img.src = "Load.png"
     }
     else if (score == 6 || score == 7) {
        encourage.innerHTML = "Hurray! Keep going.\u{1F44F}"
        img.src = "Moving.png"
     }
     else if (score == 8) {
        encourage.innerHTML = "Great! You are going higher.\u{1F44D}"
        img.src = "Motivation.png"
     }
     else if (score == 9) {
        encourage.innerHTML = "Bravo! That's the spirit.\u{1FAE7}"
        img.src = "Career.png"
     }
     else {
        encourage.innerHTML = "Excellent! You are a real MVP.\u{1F4AF}"
        img.src = "Handshakes.png"
     }

     if (localStorage.getItem("totalScore")) {
        let newValue = localStorage.getItem("totalScore") 
        let test = newValue * 1;
        let scoreSaver = score + test  
        localStorage.setItem("totalScore", scoreSaver)
        // let showScore = localStorage.getItem("totalScore")
        // document.getElementById("teller").innerHTML = showScore
        }
        else {
        let newValue = 3;
        let scoreSaver = score + newValue
        localStorage.setItem("totalScore", scoreSaver)
        // let showScore = localStorage.getItem("totalScore")
        // document.getElementById("teller").innerHTML = showScore
        }

        let points = localStorage.getItem("totalScore")

        if (points <= 19) {
            let value = 0;
            localStorage.setItem("flags", value)
        }
        else if (points >= 20 && points < 39) {
            let value = 1;
            localStorage.setItem("flags", value)
        }
        else if (points >= 40 && points < 59) {
            let value = 2;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 60 && points < 79) {
            let value = 3;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 80 && points < 99) {
            let value = 4;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 100 && points < 119) {
            let value = 5;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 120 && points < 139) {
            let value = 6;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 140 && points < 159) {
            let value = 7;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 160 && points < 179) {
            let value = 8;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 180 && points < 199) {
            let value = 9;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 200 && points < 219) {
            let value = 10;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 220 && points < 239) {
            let value = 11;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 240 && points < 259) {
            let value = 12;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 260 && points < 279) {
            let value = 13;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points >= 280 && points < 299) {
            let value = 14;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }
        else if (points == 300) {
            let value = 15;
            localStorage.removeItem("flags")
            localStorage.setItem("flags", value)
        }

        let initialFlag = localStorage.getItem("initialFlag")
        let finialFlag = localStorage.getItem("flags")
        if(initialFlag == finialFlag || finialFlag == 0) {
            document.querySelector(".flagAchievment").style.display = "none";
        }
        else if(initialFlag !== finialFlag) {
            document.querySelector(".flagAchievment").style.display = "block";
        }

    const restart = document.getElementById("restart")
    restart.addEventListener("click",  playAgain)
}

document.addEventListener("click", e => {
    if (e.target.matches(".xFlag")) {
    document.querySelector(".flagAchievment").style.display = "none";
    localStorage.removeItem("initialFlag")
}
})    

function playAgain() {
    const quizEnd = document.getElementById("endScreen")
    quizEnd.classList.add("hide");

    const scores = document.getElementById("user-score")
    scores.innerHTML = "";

    const questionNumber = document.getElementById("question-count")
    questionNumber.innerHTML = "";
 
    const askedQuestion = document.getElementById("heading")
    askedQuestion.innerHTML = "";
 
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    const encourage = document.getElementById("encourage"); 
    encourage.innerHTML = ""

    score = 0;

    startPlay()
}

fetchCategories().then((categories) => selectCategory((categories.trivia_categories)))